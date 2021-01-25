import { API, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import { listEventss } from '../graphql/queries';
import { deleteEvents } from '../graphql/mutations'
import './BookingList.css'
import { onCreateEvents, onDeleteEvents } from '../graphql/subscriptions';
import tachyons from 'tachyons';


function BookingList({ updateTimeSlots, userId, userName }) {
  const [bookingList, setBookingList] = useState([]);
  const adminId = "a2cda53a-aa2b-49b0-a442-4e1bd7668150"

  useEffect(() => {
    const getTimeSlots = async () => {
      const result = await API.graphql(graphqlOperation(listEventss,
        userId !== adminId
          ? {
            filter: {
              userId: {
                eq: userId
              }
            }
          } : ""
      )); try {
        const result2 = result.data.listEventss.items;
        setBookingList(result2)
        // console.log(result2)
      } catch (error) {
        console.log(error)
        setBookingList(bookingList)
      }
    }
    getTimeSlots();
  }, [bookingList])

  const handleDeleteEvent = async eventId => {
    const input = {
      id: eventId
    }
    await API.graphql(graphqlOperation(deleteEvents, { input }))
    updateTimeSlots();
  }


  // update after create booking
  useEffect(() => {
    const createEventListener = API.graphql(graphqlOperation(onCreateEvents))
      .subscribe({
        next: eventData => {
          const newEvent = eventData.value.data.onCreateEvents
          const prevEvent = bookingList.filter(booking => booking.id !== bookingList.id)
          const updatedEvents = [newEvent, ...prevEvent]
          setBookingList(updatedEvents)
        }
      })
    return () => {
      //clean up subscription
      createEventListener.unsubscribe()
    }
  })


  // update after delete booking
  useEffect(() => {
    const deleteEventListener = API.graphql(graphqlOperation(onDeleteEvents)).subscribe({
      next: eventData => {
        const deletedBooking = eventData.value.data.onDeleteEvents
        const updatedBookings = bookingList.filter(booking => booking.id !== deletedBooking.id)
        setBookingList(updatedBookings)
      }
    });
    return () => {
      //clean up subscription
      deleteEventListener.unsubscribe()
    }
  })


  return (
    <div>
      <h2>Your Bookings:</h2>
      <div className="pa3">
        <div className="overflow-auto">
          <table className="f5 w-100 mw8 center" cellSpacing="0">
            <thead>
              <tr className="stripe-dark">
                <th className="fw6 tl pa3 bg-white">Title</th>
                <th className="fw6 tl pa3 bg-white">Date</th>
                <th className="fw6 tl pa3 bg-white">Details</th>
                <th className="fw6 tl pa3 bg-white">Timeslot</th>
              </tr>
            </thead>
            <tbody className="lh-copy">
              {bookingList.map((booking, idx) => {
                return (
                  <tr className="stripe-dark" key={booking.id + userId}  >
                    <td className="pa3">{booking.title}</td>
                    <td className="pa3">{booking.date}</td>
                    <td className="pa3">{booking.resourceId.locationName}{", "}{booking.resourceId.resourceType}{", "}{booking.resourceId.name}</td>
                    <td className="pa3">{booking.timeslot}</td>

                    <td className="pa3 dim dib red" onClick={() => handleDeleteEvent(booking.id)} >
                      Delete Booking
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>


  )
}

export default BookingList

import { API, graphqlOperation, Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import { listEventss } from '../graphql/queries';
import { deleteEvents } from '../graphql/mutations'
import './BookingList.css'
import { onCreateEvents, onDeleteEvents } from '../graphql/subscriptions';
import Calendar from './Calendar'


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
      ));
      const result2 = result.data.listEventss.items;
      setBookingList(result2)
      // console.log(result2)
    }
    getTimeSlots();
  }, [bookingList, userId])

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
    bookingList.map((booking, idx) => {
      return (
        <div className="rowStyle" key={booking.id + userId} >
          <p> {"Title: "}{booking.title}</p>
          <p> {"Date: "}{booking.date}</p>
          <p> {"Timeslot: "}{booking.timeslot}</p>
          <p> {"Location: "} {booking.resourceId.locationName} </p>
          <p> {"Resource Type: "} {booking.resourceId.resourceType} </p>
          <p> {"Resource: "} {booking.resourceId.name} </p>
          <p> {"Created by: "}{booking.userId} {" @ "} {booking.createdAt} </p>
          <button className="btn btn-medium" onClick={() => handleDeleteEvent(booking.id)} >
            Delete Booking
          </button>
        </div>

      )
    })
  )
}

export default BookingList

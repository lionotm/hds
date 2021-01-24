import { API, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import { listEventss } from '../graphql/queries';
import { deleteEvents } from '../graphql/mutations'
import './BookingList.css'
import { onCreateEvents, onDeleteEvents } from '../graphql/subscriptions';

function BookingList({ updateTimeSlots }) {

  const id = "admin" // for admin to see all bookings

  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    const getTimeSlots = async () => {
      const result = await API.graphql(graphqlOperation(listEventss,
        id !== "admin"
          ? {
            filter: {
              userId: {
                eq: "test"
              }
            }
          } : ""
      ));
      const result2 = result.data.listEventss.items;
      setBookingList(result2)
      // console.log(result2)
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
    bookingList.map((booking, idx) => {
      return (
        <div className="rowStyle" key={booking.id} >
          <p> {"Title: "}{booking.title}</p>
          <p> {"Date: "}{booking.date}</p>
          <p> {"Timeslot: "}{booking.timeslot}</p>
          <p> {"Location: "} {booking.resourceId.locationName} </p>
          <p> {"Resource Type: "} {booking.resourceId.resourceType} </p>
          <p> {"Resource: "} {booking.resourceId.name} </p>
          <p> {"Created by: "}{booking.userId} {" @ "} {booking.createdAt} </p>
          <button onClick={() => handleDeleteEvent(booking.id)} > Delete Booking </button>
        </div>
      )
    })
  )
}

export default BookingList

import React, { useEffect, useState } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createEvents } from '../graphql/mutations';

import Resource from './Resource'
import Calendar from './Calendar'
import Timeslots from './Timeslots';
import { listEventss, listResourcess } from '../graphql/queries';
import BookingList from './BookingList';

const timeslots = [
  {
    id: 0,
    value: "9am-10am"
  },
  {
    id: 1,
    value: "10am-11am"
  },
  {
    id: 2,
    value: "11am-12pm"
  },
  {
    id: 3,
    value: "12pm-1pm"
  },
  {
    id: 4,
    value: "1pm-2pm"
  },
  {
    id: 5,
    value: "2pm-3pm"
  }, {
    id: 6,
    value: "3pm-4pm"
  }, {
    id: 7,
    value: "4pm-5pm"
  },
]


function Booking() {
  const [locations, setLocations] = useState("");
  const [resourceTypes, setResourceTypes] = useState("");
  const [resource, setResource] = useState("");
  const [resourceId, setResourceId] = useState("");

  const [purpose, setPurpose] = useState("");

  const [date, setDate] = useState("");
  const [bookingTimeSlots, setBookingTimeSlots] = useState([]);
  const [bookedTimeSlotsId, setBookedTimeSlotsId] = useState([]);

  //console.log("resourceid", resourceId)
  //console.log("bookedtimeslotId", bookedTimeSlotsId)
  //console.log("bookingTimeSlots", bookingTimeSlots)


  // RESOURCES 
  // get id of resource
  useEffect(() => {
    const getResourceType = async () => {
      const result = await API.graphql(graphqlOperation(listResourcess, {
        filter: {
          locationName: {
            contains: locations
          },
          resourceType: {
            contains: resourceTypes
          },
          name: {
            contains: resource
          }
        }
      }));
      const result2 = result.data.listResourcess.items;
      setResourceId(result2.map(a => a.id))
      //console.log("resourceid", String(resourceId))
      //console.log(bookingTimeSlots)
    }
    getResourceType();

  }, [locations, resourceTypes, resource])


  const handleChangePurpose = e => {
    setPurpose(e.target.value)
  }

  const handleAddBooking = async e => {
    e.preventDefault()

    // submit individual bookings based on the no. of timeslot
    await bookingTimeSlots.map(slot => {
      const input = {
        userId: "test",
        title: "123",
        timeslot: slot,
        timeslotId: timeslots.filter(timeObj => slot.includes(timeObj.value)).map(timeslot => timeslot.id)[0],
        date: date,
        eventsResourceIdId: String(resourceId)
      }
      API.graphql(graphqlOperation(createEvents, { input }))
    })
    setBookingTimeSlots([])
  }

  // update timeslots after state changes
  useEffect(() => {
    updateTimeSlots();
  }, [resourceId, date, bookingTimeSlots])

  const updateTimeSlots = async () => {
    const result = await API.graphql(graphqlOperation(listEventss, {
      filter: {
        eventsResourceIdId: {
          eq: String(resourceId)
        },
        date: {
          eq: date
        }
      }
    }));
    const result2 = result.data.listEventss.items;
    setBookedTimeSlotsId(result2.map(slot => slot.timeslotId))
  }


  return (
    <div>

      <Resource
        locations={locations}
        setLocations={setLocations}
        resourceTypes={resourceTypes}
        setResourceTypes={setResourceTypes}
        setResource={setResource}
      />
      <Calendar
        setDate={setDate}
      />
      <Timeslots
        resourceId={resourceId}
        date={date}
        setBookingTimeSlots={setBookingTimeSlots}
        bookedTimeSlotsId={bookedTimeSlotsId}
      />

      <form className="add-post" onSubmit={handleAddBooking}>
        <input
          style={{ font: '19px' }}
          type="text"
          placeholder="Purpose of Booking"
          name="Purpose"
          required
          value={purpose}
          onChange={handleChangePurpose}
        />
        <input
          type="submit"
          className="btn"
          value="Book Resource"
          style={{ fontSize: '15px' }}
        />
      </form>

      <BookingList
        updateTimeSlots={updateTimeSlots}
      />

    </div>
  )
}

export default Booking

import React, { useEffect, useState } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createEvents } from '../graphql/mutations';

import Resource from './Resource'
import Calendar from './Calendar'
import Timeslots from './Timeslots';
import { listResourcess } from '../graphql/queries';




function Booking() {
  const [locations, setLocations] = useState("");
  const [resourceTypes, setResourceTypes] = useState("");
  const [resource, setResource] = useState("");
  const [resourceId, setResourceId] = useState("");

  const [purpose, setPurpose] = useState("");

  const [date, setDate] = useState("");
  const [bookingTimeSlots, setBookingTimeSlots] = useState([])

  console.log(bookingTimeSlots)


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
      //console.log("id", String(resourceId))
    }
    getResourceType();

  }, [locations, resourceTypes, resource])


  const handleChangePurpose = e => {
    setPurpose(e.target.value)
  }

  const handleAddBooking = async e => {
    e.preventDefault()

    // submit individual books based on the no. of timeslot
    await bookingTimeSlots.map(slot => {
      const input = {
        userId: "NKW",
        title: "123",
        timeslot: slot,
        date: date,
        eventsResourceIdId: String(resourceId)
      }
      API.graphql(graphqlOperation(createEvents, { input }))
    })
  }

  return (
    <div>

      <Resource
        locations={locations}
        setLocations={setLocations}
        resourceTypes={resourceTypes}
        setResourceTypes={setResourceTypes}
        resource={resource}
        setResource={setResource}
      />
      <Calendar
        setDate={setDate}
      />
      <Timeslots
        resourceId={resourceId}
        date={date}
        setBookingTimeSlots={setBookingTimeSlots}
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


    </div>
  )
}

export default Booking

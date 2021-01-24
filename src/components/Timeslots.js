import React, { useState, useEffect } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './Timeslots.css'
import { onCreateEvents } from '../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { listEventss } from '../graphql/queries';


const slots = [
  "9am-10am",
  "10am-11am",
  "11am-12pm",
  "12pm-1pm",
  "1pm-2pm",
  "2pm-3pm",
  "3pm-4pm",
  "4pm-5pm",
]


function Timeslots({ setBookingTimeSlots, resourceId, date }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const handleToggleChange = (e, value) => {
    setTimeSlots(value)
    setBookingTimeSlots(value)
  }

  // Get current booked timeslots
  useEffect(() => {
    const getTimeSlots = async () => {
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
      setBookedTimeSlots(result2.map(slot => slot.timeslot))
      //console.log("booked", bookedTimeSlots)
      //console.log("slots", slots)
      //console.log("id", result2)


      setAvailableTimeSlots(slots.filter(timeslot =>
        !bookedTimeSlots.includes(timeslot)
      ));
      // console.log("avail", availableTimeSlots)
    }
    getTimeSlots();

  }, [date, resourceId])




  // Subscriptions
  useEffect(() => {
    const createEventListener = API.graphql(graphqlOperation(onCreateEvents))
      .subscribe({
        next: eventData => {
          const test = eventData.value.data.onCreateEvents
          console.log(eventData) //returning NULL
        }
      })
    return () => {
      //clean up subscription
      createEventListener.unsubscribe()
    }
  })



  return (
    <div>
      <h1>Step 3:</h1>
      <p>Pick a Timeslot</p>
      <ToggleButtonGroup value={timeSlots} onChange={handleToggleChange} size="small">
        {availableTimeSlots.map((slot, idx) => {
          return (
            <ToggleButton value={slot} key={idx}>
              <ScheduleIcon />
              <p> {slot} </p>
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </div>
  );
}

export default Timeslots
import React, { useState, useEffect } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './Timeslots.css'
import { onCreateEvents } from '../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { listEventss } from '../graphql/queries';


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


function Timeslots({ setBookingTimeSlots, bookedTimeSlotsId, handleAddBooking }) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  //console.log("selected timeslot", selectedTimeSlots)

  const handleTimeSlots = (event, values) => {
    setSelectedTimeSlots(values);
    setBookingTimeSlots(values)

    //get keys of the timeslots from object
    //let keys = timeslots.filter(x => values.includes(x.value)).map(timeslot => timeslot.id)
    //console.log(keys);
    //console.log(values);
  };

  // Shows available timings left
  useEffect(() => {

    setAvailableTimeSlots(timeslots.filter(x => !bookedTimeSlotsId.includes(x.id)))

  }, [bookedTimeSlotsId, handleAddBooking, selectedTimeSlots])

  // Subscriptions when create event
  useEffect(() => {
    const createEventListener = API.graphql(graphqlOperation(onCreateEvents))
      .subscribe({
        next: eventData => {
          setSelectedTimeSlots([]);

          //const newEvent = eventData.value.data.onCreateEvents
          //const newEventTimeId = [newEvent.timeslotId]
          //console.log(newEventTimeId)
          //console.log(availableTimeSlots)
        }
      })
    return () => {
      //clean up subscription
      createEventListener.unsubscribe()
    }
  })

  return (
    <div>
      <h2>Step 3: Pick a timeslot</h2>
      <div>
        <ToggleButtonGroup value={selectedTimeSlots} onChange={handleTimeSlots}>

          {availableTimeSlots.map((slot, idx) => {
            return (
              <ToggleButton
                value={slot.value}
                key={slot.id}
              >
                <ScheduleIcon />
                <p> {slot.value} </p>
              </ToggleButton>
            )
          })}

        </ToggleButtonGroup>
      </div>


    </div>
  );
}

export default Timeslots






import React, { useState, useEffect } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './Timeslots.css'
import { onCreateEvents } from '../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { listEventss } from '../graphql/queries';


import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";


//const slots = [
//  "9am-10am",
//  "10am-11am",
//  "11am-12pm",
//  "12pm-1pm",
//  "1pm-2pm",
//  "2pm-3pm",
//  "3pm-4pm",
//  "4pm-5pm"
//]

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
    value: "12pm-11pm"
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



function Timeslots({ setBookingTimeSlots, resourceId, date, handleAddBooking }) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);


  const handleTimeSlots = (event, values) => {
    setSelectedTimeSlots(values);
    setBookingTimeSlots(values)

    //get keys of the timeslots from object
    //let keys = timeslots.filter(x => values.includes(x.value)).map(timeslot => timeslot.id)
    //console.log(keys);
    //console.log(values);
  };


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
      //console.log("result", result)
      // console.log("id", result2)
      // console.log("booked", bookedTimeSlots)
      // console.log("date", date)
      // console.log("slots", slots)

      //setAvailableTimeSlots(slots.filter(timeslot =>
      //  !bookedTimeSlots.includes(timeslot)
      //));
      // console.log("avail", availableTimeSlots)
    }
    getTimeSlots();

  }, [date, resourceId, handleAddBooking])




  // Subscriptions
  //useEffect(() => {
  //  const createEventListener = API.graphql(graphqlOperation(onCreateEvents))
  //    .subscribe({
  //      next: eventData => {
  //        const test = eventData.value.data.onCreateEvents
  //        console.log(eventData) //returning NULL
  //      }
  //    })
  //  return () => {
  //    //clean up subscription
  //    createEventListener.unsubscribe()
  //  }
  //})



  return (
    <div>
      <h1>Step 3:</h1>
      <p>Pick a Timeslot</p>

      <div>
        <ToggleButtonGroup value={selectedTimeSlots} onChange={handleTimeSlots}>

          {timeslots.map((slot, idx) => {
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
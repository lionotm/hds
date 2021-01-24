import React, { useState, useEffect } from 'react'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import './Calendar.css'

function PickDate({ setDate }) {
  const [selectedDay, setSelectedDay] = useState("");

  const handleDisabledSelect = disabledDay => {
    console.log('Tried selecting a disabled day', disabledDay);
  };

  // pass date to Booking.js
  useEffect(() => {
    let dd = selectedDay.day
    let mm = selectedDay
      ? selectedDay.month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      : 0
    let yyyy = selectedDay.year
    setDate(`${yyyy}-${mm}-${dd} `)
  })

  // get today's date
  const today = new Date();
  let dd = Number(today.getDate());
  let mm = Number(today.getMonth() + 1);
  let yyyy = Number(today.getFullYear());

  // block out days before today
  const minimumDate = {
    year: yyyy,
    month: mm,
    day: dd
  };

  // for admin to disable
  const disabledDays = [
    {
      year: 2021,
      month: 1,
      day: 20,
    }
  ];


  return (
    <>
      <h2>Step 2: Pick a date</h2>
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        //inputPlaceholder="Please select a day"
        minimumDate={minimumDate}
        disabledDays={disabledDays} // here we pass them
        onDisabledDayError={handleDisabledSelect} // handle error
        shouldHighlightWeekends
        calendarClassName="responsive-calendar"
      />
    </>
  );
};

export default PickDate

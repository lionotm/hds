import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createResources } from '../graphql/mutations';
import './Resource.css';
import './Booking.css'

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';



function Admin() {

  const [locationName, setLocation] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [resourceName, setResource] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  //useEffect(() => {
  //  Auth.currentUserInfo()
  //    .then(user => {
  //      setPostOwnerUsername(user.username)
  //      setPostOwnerId(user.attributes.sub)
  //    })
  //})


  const handleChangeLocation = e => {
    setLocation(e.target.value)
  }

  const handleChangeResourceType = e => {
    setResourceType(e.target.value)
  }

  const handleChangeResource = e => {
    setResource(e.target.value)
  }

  const handleAddResource = async e => {
    e.preventDefault()

    const input = {
      name: resourceName,
      resourceType: resourceType,
      locationName: locationName
    }

    await API.graphql(graphqlOperation(createResources, { input }))

    setLocation("")
    setResourceType("")
    setResource("")
  }


  const handleDisableDates = async e => {
    e.preventDefault()

    //const input = {
    //  day: ,
    //  month: ,
    //  year:
    //}

  }

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
    <div>
      <div className="cards__container">
        <div clasName="cards__wrapper">
          <h2> Create a Resource:</h2>

          <form className="form-inline" onSubmit={handleAddResource}>
            <label for="text">Location:   </label>
            <input
              style={{ width: '20%' }}
              type="text"
              placeholder="Location"
              name="Location"
              required
              value={locationName}
              onChange={handleChangeLocation}
            />

            <label for="text">Resource Type: </label>
            <input
              style={{ width: '20%' }}
              type="text"
              placeholder="Resource Type"
              name="Resource Type"
              required
              value={resourceType}
              onChange={handleChangeResourceType}
            />
            <label for="text">Resource: </label>
            <input
              style={{ width: '20%' }}
              type="text"
              placeholder="Resource"
              name="Resource"
              required
              value={resourceName}
              onChange={handleChangeResource}
            />
            <input
              type="submit"
              className="btn"
              value="Create Resource"
              style={{ fontSize: '15px' }}
            />
          </form>
          <h2> Block out a full day: </h2>
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            minimumDate={minimumDate}
            disabledDays={disabledDays} // here we pass them
            shouldHighlightWeekends
            calendarClassName="responsive-calendar"
          />
          <button className='btn btn--medium'
            style={{ marginTop: "2%", marginLeft: "3%" }}
          >
            Block a day
          </button>
        </div>
      </div>

    </div >
  )
}

export default Admin

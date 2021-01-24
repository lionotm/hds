import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createResources } from '../graphql/mutations';
import './Resource.css';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';

function AdminCreateResource() {

  const [locationName, setLocation] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [resourceName, setResource] = useState("");

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

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

  console.log(selectedDayRange)

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

      <form className="add-resource" onSubmit={handleAddResource}>
        <input
          style={{ font: '10px' }}
          type="text"
          placeholder="Location"
          name="Location"
          required
          value={locationName}
          onChange={handleChangeLocation}
        />
        <input
          style={{ font: '10px' }}
          type="text"
          placeholder="Resource Type"
          name="Resource Type"
          required
          value={resourceType}
          onChange={handleChangeResourceType}
        />
        <input
          style={{ font: '10px' }}
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

      <Calendar
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        //inputPlaceholder="Please select a day"
        minimumDate={minimumDate}
        disabledDays={disabledDays} // here we pass them
        shouldHighlightWeekends
        calendarClassName="responsive-calendar"
      />

      <button>
        Disable Date(s)
      </button>
    </div>
  )
}

export default AdminCreateResource

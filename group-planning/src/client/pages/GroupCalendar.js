import React from 'react'
import Navbar from '../components/Navbar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from "moment"
import calendarevents from './calendarevents'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const GroupCalendar = () => {
  const events = [
    { title: 'Event 1', 
    start: '2024-03-01T12:30:00', 
    end: '2024-03-04T12:30:00'},

  ]

  return (
    <div>
      <Navbar />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText} </b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default GroupCalendar
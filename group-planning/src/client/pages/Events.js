import React, {useState, useEffect} from 'react'
import Event from "../components/Event.js"
import Navbar from "../components/Navbar.js"

const Events = () => {
  const [events, setEvents] = useState([
    {
      title: "Test Event",
      start: "2021-12-01T00:00:00Z",
      end: "2021-12-01T00:00:00Z",
      summary: "Test Event"
    },
    {
      title: "Test Event 2",
      start: "2021-12-01T00:00:00Z",
      end: "2021-12-01T00:00:00Z",
      summary: "Test Event"
    },
    {
      title: "Test Event 3",
      start: "2021-12-01T00:00:00Z",
      end: "2021-12-01T00:00:00Z",
      summary: "Test Event"
    }
  ]);

  return (
    <div>
      <Navbar />
      {events.map((event, index) => (
        <Event
          key = {index}
          title = {event.title}
          start = {event.start}
          end = {event.end}
          summary = {event.summary}
        />
      ))}
    </div>
  )
}

export default Events
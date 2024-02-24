import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
        <img className="navbar--logo" src="./images/logo.webp"></img>
        <Link className="navbar--link" to="/groupcalendar">Calendar</Link>
        <Link className="navbar--link" to="/groups">Group</Link>
        <Link className="navbar--link" to="/events">Events</Link>
    </nav>
  )
}

export default Navbar
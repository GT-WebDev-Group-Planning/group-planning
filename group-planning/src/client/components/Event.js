import React from 'react'

const Event = ({ title, start, end, summary }) => {
  return (
    <div className = "event">
        <h2>{title}</h2>
        <h4>{start} - {end}</h4>
        <p>{summary}</p>
    </div>
  )
}

export default Event
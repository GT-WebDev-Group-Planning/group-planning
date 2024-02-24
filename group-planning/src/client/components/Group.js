import React from 'react'
import { Link } from 'react-router-dom'

const Group = ({ name, code, description }) => {
  return (
    <div className = "group">
        <h1>{name}</h1>
        <h2>{code}</h2>
        <p>{description}</p>
        <button id = "group--button">
            <Link to={`/group-page?code=${code}`}>Go to group page</Link>
        </button>
    </div>
  )
}

export default Group
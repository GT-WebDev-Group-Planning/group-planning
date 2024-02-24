import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/global.css';

function CalendarSelect() {
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/calendars', { withCredentials: true })
            .then(response => {
                setCalendars(response.data);
            })
            .catch(error => {
                console.error('Error fetching calendar data:', error);
            });
    }, []);

    return (
        <div className="CalendarSelectWindow">
            <div id="windowHeader">
                <h1 className="CalendarSelectHeader">Select Calendars to Import:</h1>
            </div>
            <div className="CalendarsList">
            {calendars.map((calendar) => {
                return (
                    <div className="CalendarListItem">
                      {calendar.summary}
                      <a id="link" href={calendar}>Choose</a>
                    </div>
                  );
            })}
            </div>
    </div>
    );
}

export default CalendarSelect;
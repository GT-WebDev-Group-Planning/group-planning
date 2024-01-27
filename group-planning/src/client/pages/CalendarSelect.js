import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Calendar Selection</h1>
            <ul>
                {calendars.map(calendar => (
                    <li key={calendar.id}>{calendar.summary}</li>
                ))}
            </ul>
        </div>
    );
}

export default CalendarSelect;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import CalendarSelect from './pages/CalendarSelect'
import Events from './pages/Events'
import GroupCalendar from './pages/GroupCalendar'
import Groups from './pages/Groups'
import { SnackbarProvider } from 'notistack';
function App() {
    return(
        <SnackbarProvider>
            <Router>
                <Routes>
                    <Route path="" element={<Login/>} />
                    <Route path="/calendarselect" element={<CalendarSelect />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/groupcalendar" element={<GroupCalendar />} />
                    <Route path="/groups" element={<Groups />} />
                </Routes>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
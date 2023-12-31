import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar/Calendar';
import Evite from './pages/Evite/Evite';
import Group from './pages/Group/Group';
import JoinGroup from './pages/join_group/JoinGroup';
import Login from './pages/LogIn';
import CalendarSelect from './pages/CalendarSelect/CalendarSelect';
import Event from './pages/Event/Event';
import Test from './pages/Test';
import GroupPage from './pages/Group/GroupPage';
import CreateGroup from './pages/join_group/CreateGroup';
import { SnackbarProvider } from 'notistack';
import React, { useState } from 'react';

function App() {
  const [userEmail, setUserEmail] = useState("user@example.com");
  const handleEmailChange = (newEmail) => {
    setUserEmail(newEmail);
  };
    return (
    <SnackbarProvider>
    <Router>
      <Routes>
        <Route path="" element={<Test userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/calendar" element={<Calendar userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/evite" element={<Evite userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/group" element={<Group userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/joingroup" element={<JoinGroup userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/creategroup" element={<CreateGroup userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/login" element={<Login userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/calendarselect" element={<CalendarSelect userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/events" element={<Event userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/test" element={<Test userEmail={userEmail} handleEmailChange={handleEmailChange} />} />
        <Route path="/group-page" element={<GroupPage />} />
      </Routes>
    </Router>
    </SnackbarProvider>
    );
  }
  
  export default App;
  
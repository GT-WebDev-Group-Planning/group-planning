import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/Login'
import { SnackbarProvider } from 'notistack';
function App() {
    return(
        <SnackbarProvider>
            <Router>
                <Routes>
                    <Route path="" element={<LogIn/>} />
                </Routes>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
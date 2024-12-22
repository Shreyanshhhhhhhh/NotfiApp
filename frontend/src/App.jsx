// filepath: /C:/Users/DELL/Programming/Projects/NotificationApp/frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CreateNotification from './components/Notifications/CreateNotification';
import NotificationList from './components/Notifications/NotificationList';
import NotificationDetail from './components/Notifications/NotificationDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create-notification" element={<CreateNotification />} />
                <Route path="/notifications" element={<NotificationList />} />
                <Route path="/notifications/:id" element={<NotificationDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
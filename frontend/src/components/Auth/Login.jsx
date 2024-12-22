// filepath: frontend/src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
                username,
                password
            });
            // Handle successful login
            console.log(response.data);
            // Store the tokens in localStorage or cookies
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            // Redirect to the notifications page
            navigate('/notifications');
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
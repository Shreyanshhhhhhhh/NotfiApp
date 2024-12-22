// filepath: frontend/src/components/Auth/Signup.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/signup/', {
                username,
                email,
                password
            });
            // Handle successful signup
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.username) {
                    setError(`Username error: ${errorData.username.join(', ')}`);
                } else if (errorData.email) {
                    setError(`Email error: ${errorData.email.join(', ')}`);
                } else if (errorData.password) {
                    setError(`Password error: ${errorData.password.join(', ')}`);
                } else {
                    setError('Error signing up');
                }
            } else {
                setError('Error signing up');
            }
        }
    };

    return (
        <div>
            <Typography variant="h4">Signup</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Signup
                </Button>
            </form>
        </div>
    );
};

export default Signup;
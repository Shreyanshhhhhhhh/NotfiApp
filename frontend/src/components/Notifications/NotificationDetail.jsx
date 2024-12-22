// filepath: /c:/Users/DELL/Programming/Projects/NotificationApp/frontend/src/components/Notifications/NotificationDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NotificationDetail = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await axios.get(`http://127.0.0.1:8000/api/notifications/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                console.log('Notification data:', response.data); // Log the response data
                setNotification(response.data);
            } catch (error) {
                console.error('Error fetching notification:', error);
            }
        };
        fetchNotification();
    }, [id]);

    const handleBack = () => {
        navigate('/notifications');
    };

    if (!notification) {
        return <p>Loading...</p>;
    }

    const renderFile = (fileUrl) => {
        const fileExtension = fileUrl.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return <img src={`${fileUrl}`} alt={notification.title} style={{ width: '100%', height: 'auto' }} />;
        } else if (fileExtension === 'pdf') {
            return <a href={`${fileUrl}`} target="_blank" rel="noopener noreferrer">View PDF</a>;
        } else {
            return <p>Unsupported file type</p>;
        }
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ maxWidth: '600px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                {notification.files && renderFile(notification.files)}
                <h2>{notification.title}</h2>
                <p>{notification.message}</p>
                <p><small>Created at: {new Date(notification.created_at).toLocaleString()}</small></p>
            </div>
            <button
                onClick={handleBack}
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Back to Notifications
            </button>
        </div>
    );
};

export default NotificationDetail;
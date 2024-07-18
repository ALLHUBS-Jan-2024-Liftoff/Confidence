import React from 'react';
import AuthService from '../services/AuthService';

const Logout = () => {

    const handleLogout = async () => {
        const loggedOut = await AuthService.logout();
        if (loggedOut) {
            // Optionally, you can redirect the user or show a message
            alert('Logout successful');
        } else {
            alert('Failed to logout. Please try again.');
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
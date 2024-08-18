import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Messages.css';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/contact')
            .then(response => {
                debugger;
                console.log(response.data);
                setMessages(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the messages!', error);
            });
    }, []);

    return (
        <div className="messages-container">
            <h1>Messages from Users</h1>
            <table className="messages-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message.id}>
                            <td>{message.name}</td>
                            <td>{message.email}</td>
                            <td>{message.subject}</td>
                            <td>{message.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Messages;

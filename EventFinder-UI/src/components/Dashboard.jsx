import React from 'react';
import { useAuth } from '../auth/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="header">
      Dashboard
      </header>
      <p>Welcome to your dashboard, {user.username}!</p>
      <div className="dashboard">
          <aside className="sidebar">
            <ul>
              <li>All</li>
              <li>Upcoming Events</li>
              <li>Past Events</li>
              <li>Event Submissions</li>
            </ul>
          </aside>
          <main className="content">
            <table className="event-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Description</th>
                  <th>Event Category</th>
                  <th>Event Date</th>
                  <th>Event Time</th>
                  <th>Event Location</th>
                  <th>Event Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </main>
        </div>
        <footer className="footer">
          Confidence
        </footer>
    </div>
  );
};

export default Dashboard;
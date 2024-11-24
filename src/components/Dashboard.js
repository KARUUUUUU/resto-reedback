import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import '../css_files/Dashboard.css';

function Dashboard() {
  const [email, setEmail] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email); // Retrieve and set the email of the logged-in user
    }
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = '/login'; // Redirect to login page after logout
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Dashboard</h1> {/* Dashboard Title */}
        <p className="dashboard-description">Hello! {email}</p> {/* Greeting with Email */}
        <div className="dashboard-links">
          <a href="/feedback-form" className="dashboard-link">
            Submit Feedback
          </a>
          <a href="/feedback-list" className="dashboard-link">
            View Feedback
          </a>
        </div>
        <div className="logout-btn-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
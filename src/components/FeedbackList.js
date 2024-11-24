// src/components/FeedbackList.js
import React, { useEffect, useState } from 'react';
import '../css_files/FeedbackList.css';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch feedback from the backend
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-feedback');
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }

        const data = await response.json();
        setFeedbacks(data); // Set the feedback data to state
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Failed to fetch feedback');
      }
    };

    fetchFeedback();
  }, []); // Run fetch only once when the component mounts

  return (
    <div className="feedback-list-container">
      <h2 className="feedback-list-title">Feedback Notifications</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p className="no-feedback-message">No feedback available.</p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div className="notification-card" key={index}>
              <h3 className="notification-name">{feedback.name}</h3>
              <p className="notification-message">{feedback.feedback}</p>
              <p className="notification-rating">Rating: {feedback.rating}/5</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackList;

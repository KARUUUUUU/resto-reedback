// src/components/FeedbackForm.js
import React, { useState } from 'react';
import '../css_files/FeedbackForm.css';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!name.trim() || !feedback.trim() || !rating) {
      setError('Please fill out all fields.');
      return;
    }

    // Ensure rating is within 1-5
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }

    setError(''); // Clear previous errors

    const feedbackData = { name, feedback, rating };

    try {
      setIsSubmitting(true); // Set loading state

      const response = await fetch('http://localhost:5000/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message || 'Feedback submitted successfully!');

      // Reset form fields
      setName('');
      setFeedback('');
      setRating('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-box">
        <h2 className="feedback-title">Submit Feedback</h2>
        {error && <p className="feedback-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="feedback-input"
          />

          {/* Feedback input */}
          <textarea
            placeholder="Your Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="feedback-textarea"
          />

          {/* Rating input */}
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="feedback-input"
          />

          {/* Submit button */}
          <button type="submit" className="feedback-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
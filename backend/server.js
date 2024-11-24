// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./firebase'); // Firebase connection
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from a .env file

const app = express();

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(express.json()); // Parse JSON requests

const PORT = process.env.PORT || 5000;
console.log(`Server is running on port ${PORT}`);

// POST route to handle feedback submission
app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, feedback, rating } = req.body;

    // Validate the data
    if (!name || !feedback || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert the feedback into Firebase Firestore
    const feedbackRef = db.collection('feedbacks');
    await feedbackRef.add({
      name,
      feedback,
      rating,
      timestamp: new Date(),
    });

    // Respond with a success message
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET route to retrieve feedback
app.get('/get-feedback', async (req, res) => {
  try {
    const feedbackRef = db.collection('feedbacks');
    const snapshot = await feedbackRef.get();
    
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No feedback found' });
    }

    const feedbacks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(feedbacks); // Respond with feedback data in JSON format
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Failed to fetch feedback' });
  }
});

// Start the server and log the port it's running on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


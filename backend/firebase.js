// backend/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./customer-feedback-fb3b2-firebase-adminsdk-wnwvf-c15b4a9282.json'); // Path to your Firebase Admin SDK JSON file

// Initialize Firebase Admin SDK with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

module.exports = db;

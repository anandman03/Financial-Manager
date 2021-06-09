const firebase = require("firebase");
const dotenv = require("dotenv");

dotenv.config();

const {
  FIREBASE_APP_API_KEY,
  FIREBASE_APP_AUTH_DOMAIN,
  FIREBASE_APP_DATABASE_URL,
  FIREBASE_APP_PROJECT_ID,
  FIREBASE_APP_STORAGE_BUCKET,
  FIREBASE_APP_MESSAGING_SENDER_ID,
  FIREBASE_APP_APP_ID
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_APP_API_KEY,
  authDomain: FIREBASE_APP_AUTH_DOMAIN,
  databaseURL: FIREBASE_APP_DATABASE_URL,
  projectId: FIREBASE_APP_PROJECT_ID,
  storageBucket: FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
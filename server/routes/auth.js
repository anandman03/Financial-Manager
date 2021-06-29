const express = require("express");
const router = express.Router();

const firebase = require("../firebase.js");
const auth = firebase.auth();

router.get('/signin', async (request, response) => {
  const { email, password } = request.query;

  await auth.signInWithEmailAndPassword(email, password)
  .then(() => response.json({ message: "Success" }))
  .catch(error => response.json({ message: "Error" }));
});

router.post('/signup', async (request, response) => {
  const { email, password } = request.query;

  await auth.createUserWithEmailAndPassword(email, password)
  .then(() => response.json({ message: "Success" }))
  .catch(error => response.json({ message: "Error" }));
});

module.exports = router;

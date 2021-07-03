const express = require("express");
const router = express.Router();

const firebase = require("../firebase.js");
const auth = firebase.auth();

router.get('/signin', async (request, response) => {
  const { email, password } = request.query;

  await auth.signInWithEmailAndPassword(email, password)
  .then(() => {
    return response.status(200).json({
      status: "success", 
      message: "success" 
    });
  })
  .catch(error => {
    return response.status(400).json({
      status: "error",
      message: error.message
    });
  });
});

router.post('/signup', async (request, response) => {
  const { email, password } = request.query;

  await auth.createUserWithEmailAndPassword(email, password)
  .then(() => {
    return response.status(200).json({
      status: "success", 
      message: "success" 
    });
  })
  .catch(error => {
    return response.status(400).json({
      status: "error",
      message: error.message
    });
  });
});

router.get('/logout', async (request, response) => {
  await auth.signOut()
  .then(() => response.status(200).redirect('/'))
  .catch(error => response.status(200).redirect('/'))
});

module.exports = router;

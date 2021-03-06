const router = require("express").Router;
const firebase = require("../firebase.js");

function authMiddleware(request, response, next) {
  if(firebase.auth().currentUser) {
    next();
  }
  else {
    response.redirect("/");
  }
}

module.exports = authMiddleware;

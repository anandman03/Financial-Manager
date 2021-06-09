const express = require("express");
const router = express.Router();

const firebase = require("../firebase.js");
const auth = firebase.auth();
const db = firebase.firestore();

const authMiddleware = require("../middleware/authStatus.js");


const getID = () => Math.floor(1e8 + Math.random() * 9e8);

const getDate = () => {
  let date = new Date();
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

router.get('/expense-tracker/all', authMiddleware, async (request, response) => {
  let transactions = [];
  const docRef = db.collection('transaction-history').doc(auth.currentUser.uid);
  await docRef.get().then(doc => {
    if(doc.exists) {
      transactions = doc.data().transactions;
    }
  })
  .catch(error => console.log("Error Occured"));

  if(transactions === undefined) {
    transactions = [];
  }
  response.json({ transactions: transactions });
});

router.put('/expense-tracker/update', authMiddleware, async (request, response) => {
  let transactions = [];
  const docRef = db.collection('transaction-history').doc(auth.currentUser.uid);
  await docRef.get().then(doc => {
    if(doc.exists) {
      transactions = doc.data().transactions;
    }
  })
  .catch(error =>  console.log("Error Occured"));

  if(transactions === undefined) {
    transactions = [];
  }

  transactions.unshift({
    ID: getID(),
    date : getDate(),
    type: request.query.type,
    amount : Number(request.query.amount),
    description : request.query.description
  });

  await docRef.update({ transactions: transactions })
  .then(res => response.json({ message: "Success" }))
  .catch(error => response.json({ message: "Error" }));
});

router.delete('/expense-tracker/delete', authMiddleware, async (request, response) => {
  let transactions = [];
  const docRef = db.collection('transaction-history').doc(auth.currentUser.uid);
  await docRef.get().then(doc => {
    if(doc.exists) {
      transactions = doc.data().transactions;
    }
  })
  .catch(error =>  console.log("Error Occured"));

  for(let index = 0 ; index < transactions.length ; ++index) {
    if(transactions[index].ID === Number(request.query.ID)) {
      transactions.splice(index, 1);
      break;
    }
  }
  await docRef.update({ transactions: transactions })
  .then(res => response.json({ message: "Success" }))
  .catch(error => response.json({ message: "Error" }));
});

module.exports = router;
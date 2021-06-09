import React from 'react';

export default function Header(props) {
  const totalIncome = props.transactions
                      .filter(transaction => transaction.type === "income")
                      .reduce((sum, transaction) => { return sum = sum + transaction.amount }, 0);

  const totalExpense = props.transactions
                      .filter(transaction => transaction.type === "expense")
                      .reduce((sum, transaction) => { return sum = sum + transaction.amount }, 0);

  return (
    <header>
      <h4>Your Balance</h4>
      <h1 className="balance">₹{Number.parseFloat(totalIncome - totalExpense).toFixed(2)}</h1>
      <div className="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p className="money plus">+ ₹{totalIncome}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p className="money minus">- ₹{totalExpense}</p>
        </div>
      </div>
    </header>
  )
};
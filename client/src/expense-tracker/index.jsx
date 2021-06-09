import React from 'react';
import PanelComponent from './panel.jsx';
import FormComponent from './form.jsx';
import HistoryComponent from './history.jsx';
import ChartComponent from './analytics.jsx';

import './style.css';

function ExpenseTrackerComponent(props) {
  const [update, setUpdate] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  
  React.useEffect(() => {
    fetch("/app/expense-tracker/all", { method: "GET" })
    .then(response => response.json())
    .then(result => setTransactions(result.transactions))
    .catch(error => props.history.push("/"));

    setUpdate(false);
  }, [update, props.history]);

  return (
    <div className="home">
      <PanelComponent 
        transactions={transactions}
      />
      <h2>Add Transaction</h2>
      <FormComponent
        setUpdate={setUpdate}
      />
      <HistoryComponent 
        setUpdate={setUpdate}
        transactions={transactions}
      />
      <ChartComponent
        transactions={transactions} 
      />
    </div>
  );
};

export default ExpenseTrackerComponent;
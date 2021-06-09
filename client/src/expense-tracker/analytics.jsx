import React from 'react';
import { Chart } from 'react-google-charts';

export default function Analytics(props) {
  const { transactions } = props;

  const [year, setYear] = React.useState('');

  React.useEffect(() => {
      setYear(new Date().getFullYear());
  }, []);

  function loadMonthlyData() {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let income = [], expense = [];
    for(let index = 0 ; index <= 12 ; ++index) {
      income[index] = expense[index] = 0;
    }
    
    for(let index = 0 ; index < transactions.length ; ++index) {
      let date = transactions[index].date.split('/');
      if(String(date[2]) === String(year)) {
        if(transactions[index].type === "income") {
            income[date[1]] += transactions[index].amount;
        }
        else {
            expense[date[1]] += transactions[index].amount;
        }
      }
    }

    const collect = [['Month', 'Income', 'Expense']];
    for(let index = 1 ; index <= 12 ; ++index) {
        collect.push([month[index-1], income[index], expense[index]]);
    }
    return collect;
  }

  function loadYearlyData() {
    const currentYear = new Date().getFullYear();
    let income = [], expense = [];
    income[currentYear] = 0;
    expense[currentYear] = 0;

    for(let index = 0 ; index < transactions.length ; ++index) {
      let year = transactions[index].date.split('/')[2];
      if(transactions[index].type === "income") {
        income[year] += transactions[index].amount;
      }
      else {
        expense[year] += transactions[index].amount;
      }
    }
    let data = [['Year', 'Income', 'Expenses'], ['0', 0, 0]];
    for(let year = 0 ; year <= currentYear ; ++year) {
      if(income[year] > 0 || expense[year] > 0) {
        data.push([String(year), income[year], expense[year]]);
      }
    }
    return data;
  }

  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <div>
        <Chart
          width={'100%'}
          height={'350px'}
          margin
          chartType="ColumnChart"
          className="chart"
          loader={<div>Loading Chart</div>}
          data={loadMonthlyData()}
          options={{
            title: `Monthly Performance ${year}`,
            vAxis: { title: 'Dollars' },
            hAxis: { title: 'Month' }
          }}
        />
      </div>
      <div>
        <Chart
          width={'100%'}
          height={'350px'}
          chartType="AreaChart"
          className="chart"
          loader={<div>Loading Chart</div>}
          data={loadYearlyData()}
          options={{
            title: 'Your Performance',
            hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            chartArea: { width: '60%', height: '80%' },
          }}
        />
      </div>
    </div>
  );
};
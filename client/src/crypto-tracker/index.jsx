import Button from '@material-ui/core/Button';
import React from 'react';
import PanelComponent from './panel.jsx';

import './style.css';

export default function App() {
  // Declaring coins & search as new state variables.
  const [coins, setCoins] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [makeAPIcall, setAPIFetchStatus] = React.useState(false);

  // To fetch data from API. Every time this component renaders useEffect is called.
  // This is called only once when page and when refresh button is clicked.
  React.useEffect(() => {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response =>  response.json())
      .then(res => setCoins(res)) //Updating coins state variable.
      .catch(error => alert('Error Occured'));
    setAPIFetchStatus(false)
  }, [makeAPIcall]);

  // For handling change event on search box.
  const handleChange = event => {
    const searchText = String(event.target.value).toLowerCase();
    setSearch(searchText);
  };

  /* 
    We are using filtering method instead of updating state of coins state variable.
    If we change state variable then for next query we again have to fetch all results
    and then display. Filtering query reduces overhead due to API network calls.
  */

  // For filtering coins based on Query.
  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search));

  return (
    <div className="coin-app">
      
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}></input>
        </form>
        <Button className="coin-button" variant="outlined" size="large" color="primary" onClick={() => setAPIFetchStatus(true)}>
          Refresh
        </Button>
      </div>
      <PanelComponent
        coinList={filteredCoins}
      />
    </div>
  );
};
import React, { useEffect, useState } from 'react';


function CoinList({currency}) {
  const [coinList, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => response.json())
      .then(data => {
        setList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, [currency]);

  return (
    <div>
      <h1>Cryptocurrency List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ol className="coin-list">
          {coinList.map(coin => (
            <li key={coin.id}>
              <img src={coin.image} alt={coin.name} className="coin-image"/>
              <span className="coin-name">{coin.name}</span>
              <span className="coin-price">{coin.current_price} {currency}</span>
              <span className="coin-ticker">{coin.symbol}</span>
             
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default CoinList;

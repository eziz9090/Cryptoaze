import './App.css';
import React from 'react'
import { SingleCoin, TrendingCoins } from '.././src/config.js/API';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from './config.js/Carousel';
import Button from '@mui/material/Button';
import ShowInfo from './config.js/ShowInfo'
import CoinList from './config.js/CoinList';


function App() {
  const [trending, setTrending] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [InfoVisible, setInfoVisible] = useState(false);
  const [ListVisible, setListVisibility] = useState(false);
  const [coin, setSingleCoin] = useState("btc")



 



  const InfoVisibility = () =>{
    setInfoVisible(!InfoVisible)
    setListVisibility(false) 
    
    
  };
  const ListVisibility = () =>{
    setListVisibility(!ListVisible) 
    setInfoVisible(false) 
  };
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(coin));
    setSingleCoin(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [coin]);
 
 
  

  return (
    <div className="App">
         <select value={currency} onChange={handleChange} className="coin-currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
         </select>
  
      
      <Carousel>
        {trending.map((coin) => {


          return (

              <div key={coin.id} className="carousel-item">
                <img src={coin.image} alt={coin.name} />
                <p className='carousel-name'>{coin.name}</p>
                <p className='carousel-price'>{coin.current_price.toFixed(2)} {currency}</p>
                
                
              </div>
              
           
            
          );
        })}
      </Carousel>
      

      <div className="navigation-list">
      
       
        <Button className="nav-button" onClick={ListVisibility}>TOP 100</Button>
        <Button className="nav-button" onClick={InfoVisibility} >info</Button>
          {ListVisible && <CoinList currency={currency}/>}
          {InfoVisible && <ShowInfo/>}
          
     
       
       
       
      
     
      </div>
      
    </div>
  );
}

export default App;

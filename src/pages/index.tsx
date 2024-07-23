// pages/index.tsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchStockPrices } from '../store/stockSlice';
import styles from '../styles/Home.module.css'; // Import the CSS module

interface StockPrice {
  _id: string;
  symbol: string;
  price: number;
  volume: number; // Add volume field
  timestamp: string;
}

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const prices = useSelector((state: RootState) => state.stock.prices as StockPrice[]);

  const handleFetchPrices = () => {
    dispatch(fetchStockPrices(symbol));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stock Price Tracker</h1>
      <div style={{ marginBottom: '20px', paddingLeft: '200px'}}>Select coins from this 'BTC', 'ETH', 'USDT', 'SOL', 'USDC'</div>
      <div className={styles.inputContainer}>
        <input 
          type="text" 
          value={symbol} 
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol" 
          className={styles.input}
        />
        <button onClick={handleFetchPrices} className={styles.button}>Fetch Prices</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price: StockPrice) => (
            <tr key={price._id}>
              <td>{price.symbol}</td> {/* Add symbol column */}
              <td>{price.price}</td>
              <td>{price.volume}</td> {/* Add volume column */}
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

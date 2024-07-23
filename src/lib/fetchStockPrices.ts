// lib/fetchStockPrices.ts
import axios from 'axios';
import connectToDatabase from './mongodb';
import StockPrice from '../models/StockPrice';
import { exit } from 'process';

const STOCK_SYMBOLS = ['BTC', 'ETH', 'USDT', 'SOL', 'USDC'];

async function fetchStockPrices() {
  await connectToDatabase();
  const url = "https://api.livecoinwatch.com/coins/single"
  const headers = {
    "x-api-key": "5cb4b58d-126b-4cca-8fe4-becab09510b3",
    "content-type": "application/json"
  }

  for (const symbol of STOCK_SYMBOLS) {
    const body = {
      "currency": "INR",
      "code": symbol,
      "meta": false
    }
    const response = await axios({
      method: 'POST',
      url,
      data: body,
      headers
    })

    const { rate: price, volume } = response.data
    

    const stockPrice = new StockPrice({ symbol, price, volume });
    await stockPrice.save();
  }
}

export default fetchStockPrices;

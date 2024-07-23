// lib/startStockPriceService.ts
import fetchStockPrices from './fetchStockPrices';

function startStockPriceService() {
  fetchStockPrices();
  setInterval(fetchStockPrices, 5000);
}

export default startStockPriceService;

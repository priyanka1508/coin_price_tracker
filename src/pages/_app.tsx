// pages/_app.tsx
import { Provider } from 'react-redux';
import store from '../store';
import type { AppProps } from 'next/app';
import startStockPriceService from '../lib/startStockPriceService';

if (typeof window === 'undefined') {
  startStockPriceService();
}

export default function App({ Component, pageProps }: AppProps) {
  //startStockPriceService();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

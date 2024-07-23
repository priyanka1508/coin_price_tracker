// store/stockSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStockPrices = createAsyncThunk(
  'stock/fetchStockPrices',
  async (symbol: string) => {
    const response = await axios.get(`/api/stock/${symbol}`);
    return response.data;
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    prices: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prices = action.payload;
      })
      .addCase(fetchStockPrices.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default stockSlice.reducer;

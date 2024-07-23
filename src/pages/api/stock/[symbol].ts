// pages/api/stock/[symbol].ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/mongodb';
import StockPrice from '../../../models/StockPrice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { symbol },
  } = req;

  await connectToDatabase();

  const prices = await StockPrice.find({ symbol })
    .sort({ date: -1 })
    .limit(5)
    .exec();

  res.json(prices);
}

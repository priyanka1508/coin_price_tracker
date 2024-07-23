// models/StockPrice.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the schema for stock prices
const StockPriceSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create an interface representing a document in MongoDB
interface IStockPrice extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}

// Use an interface for the model to provide type safety
interface IStockPriceModel extends Model<IStockPrice> {}

// Check if the model already exists before defining it
const StockPrice: IStockPriceModel = mongoose.models?.StockPrice || mongoose.model<IStockPrice>('StockPrice', StockPriceSchema);

export default StockPrice;





// const StockPriceSchema = new mongoose.Schema({
//   symbol: String,
//   price: Number,
//   volume: Number,
//   date: { type: Date, default: Date.now },
// });

// const StockPrice = mongoose.model('StockPrice', StockPriceSchema);

// export default StockPrice;

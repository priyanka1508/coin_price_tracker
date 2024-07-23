// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fomofactory:root@cluster0.es0pv.mongodb.net/';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare a global property for caching the connection
declare global {
  var mongoose: MongooseCache;
}

// Initialize the global cache
global.mongoose = global.mongoose || { conn: null, promise: null };

let cached: MongooseCache = global.mongoose;

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "coin_prices",
      user: "fomofactory",
      pass: "root",
      autoIndex: true
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    })
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;

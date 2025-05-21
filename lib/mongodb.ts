import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  w: 'majority',
  maxIdleTimeMS: 30000,
};

declare global {
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error: Accessing global variable for MongoDB client promise in development
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    // @ts-expect-error: Setting global variable for MongoDB client promise in development
    global._mongoClientPromise = client.connect()
      .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
      });
  }
  // @ts-expect-error: Using global variable for MongoDB client promise in development
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    });
}

export default clientPromise;

// src/lib/mongodb.ts - PRODUCTION READY
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let cachedCollections: { stats: any; companies: any } | null = null;

if (!uri) {
  throw new Error('MONGODB_URI not set in .env.local');
}

// Global client promise for connection pooling
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Development: recreate client on each connect
  clientPromise = new Promise((resolve) => {
    client = new MongoClient(uri);
    resolve(client);
  });
} else {
  // Production: reuse single client
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
}

export async function getCollection() {
  if (cachedCollections) return cachedCollections;
  
  const client = await clientPromise;
  const db = client.db('Shiksha');
  
  cachedCollections = {
    data: db.collection("data"),
    login: db.collection("login"),
  };
  
  console.log('✅ MongoDB collections ready');
  return cachedCollections;
}


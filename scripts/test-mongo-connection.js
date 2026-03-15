/**
 * Test MongoDB connection using DATABASE_URL from .env
 * Run: node scripts/test-mongo-connection.js
 */
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DATABASE_URL;
if (!uri || uri.includes('<db_password>') || uri.includes('REPLACE_WITH_YOUR_PASSWORD')) {
  console.error('Set DATABASE_URL in .env with your real MongoDB password (replace the placeholder).');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error('Connection failed:', err.message);
  process.exit(1);
});

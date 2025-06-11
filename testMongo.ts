import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://haroonlappy:haroonasim1@truecrime.xnblwlk.mongodb.net/?retryWrites=true&w=majority&appName=truecrime';

async function test() {
  try {
    console.log('Connecting...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected to MongoDB!');
    await client.close();
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
}

test();

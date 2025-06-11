import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('truecrime');
  const collection = db.collection('blogs');
  

  if (req.method === 'GET') {
    try {
      const blogs = await collection.find().sort({ createdAt: -1 }).toArray();
      return res.status(200).json(blogs); // ✅ return plain array
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      const result = await collection.insertOne({
        title,
        content,
        createdAt: new Date(),
      });
      return res.status(201).json({ message: 'Blog added', id: result.insertedId });
    } catch (error) {
      console.error('POST error:', error);
      return res.status(500).json({ error: 'Failed to add blog' });
    }
  }
  

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

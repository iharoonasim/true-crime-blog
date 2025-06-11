import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const client = await clientPromise;
  const db = client.db('truecrime');
  const collection = db.collection('blogs');

  try {
    if (req.method === 'DELETE') {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      return res.status(200).json({ message: 'Deleted successfully' });
    }

    if (req.method === 'PATCH') {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Missing title or content' });
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, content, updatedAt: new Date() } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Update failed' });
      }

      return res.status(200).json({ message: 'Updated successfully' });
    }

    res.setHeader('Allow', ['DELETE', 'PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

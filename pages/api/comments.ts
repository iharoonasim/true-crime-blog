import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('truecrime');

  if (req.method === 'GET') {
    const { blogId } = req.query;
    if (typeof blogId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid blogId' });
    }
    const comments = await db
      .collection('comments')
      .find({ blogId: new ObjectId(blogId) })
      .sort({ createdAt: -1 })
      .toArray();
    return res.status(200).json(comments.map(c => ({
      _id: c._id.toString(),
      blogId: c.blogId.toString(),
      name: c.name,
      text: c.text,
      createdAt: c.createdAt,
    })));
  }

  if (req.method === 'POST') {
    const { blogId, name, text } = req.body;
    console.log('Incoming blogId:', blogId);
    if (!blogId || !name || !text) {
      return res.status(400).json({ error: 'blogId, name and text are required' });
    }
    const newComment = {
      blogId: new ObjectId(blogId),
      name,
      text,
      createdAt: new Date(),
    };
    const result = await db.collection('comments').insertOne(newComment);
    return res.status(201).json({
      _id: result.insertedId.toString(),
      blogId,
      name,
      text,
      createdAt: newComment.createdAt,
    });
  }

  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('truecrime');
  const collection = db.collection('episodes');

  if (req.method === 'POST') {
    const { title, description, link } = req.body;
    if (!title || !description || !link) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newEpisode = {
      title,
      description,
      link,
      thumbnail: `https://img.youtube.com/vi/${extractVideoId(link)}/hqdefault.jpg`,
      createdAt: new Date()
    };

    try {
      const result = await collection.insertOne(newEpisode);
      res.status(201).json({ message: 'Episode added', id: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add episode' });
    }
  } else if (req.method === 'GET') {
    const episodes = await collection.find().sort({ createdAt: -1 }).toArray();
    res.json(episodes);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function extractVideoId(url: string): string {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}

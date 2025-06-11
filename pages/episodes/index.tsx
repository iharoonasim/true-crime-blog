import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Episode {
  _id: string;
  id: number;
  title: string;
  thumbnail?: string;
}

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const res = await fetch('/api/episodes');
        const data = await res.json();
        setEpisodes(data);
      } catch (err) {
        console.error('Failed to fetch episodes:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

  return (
    <>
      <Head>
        <title>Episodes | True Crime - Harry</title>
      </Head>

      <section style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>All Episodes</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            {episodes.map((ep) => (
              <Link
                href={`/episodes/${ep.id}`}
                key={ep._id}
                style={{
                  textDecoration: 'none',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: '0.3s',
                  backgroundColor: '#fff',
                }}
              >
                <div style={{ padding: '1rem' }}>
                  {ep.thumbnail && (
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  )}
                  <h3 style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#111' }}>{ep.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

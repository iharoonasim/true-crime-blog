import { useRouter } from 'next/router';
import Head from 'next/head';
import episodes from '@/data/episodes';

export default function EpisodePage() {
  const router = useRouter();
  const { id } = router.query;

  const episode = episodes.find((ep) => ep.id === Number(id)); // important: convert id to Number

  if (!episode) return <p style={{ textAlign: 'center', padding: '3rem' }}>Episode not found.</p>;

  return (
    <>
      <Head>
        <title>{episode.title} | True Crime - Harry</title>
        <meta name="description" content={episode.description} />
      </Head>

      <section className="section" style={{ textAlign: 'center' }}>
        <h1>{episode.title}</h1>

        {/* Show thumbnail if available */}
        {episode.thumbnail && (
          <img
            src={episode.thumbnail}
            alt={episode.title}
            style={{ maxWidth: '100%', borderRadius: '10px', margin: '1rem 0' }}
          />
        )}
        

        {/* Show embedded video */}
        {episode.videoUrl && (
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <iframe
              width="100%"
              height="315"
              src={episode.videoUrl}
              title={episode.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        

        <p style={{ maxWidth: '700px', margin: '2rem auto', fontSize: '1.1rem' }}>
          {episode.description}
        </p>

        <a href="/" className="cta" style={{ display: 'inline-block', marginTop: '2rem' }}>
          ← Back to Home
        </a>
      </section>
    </>
  );
}

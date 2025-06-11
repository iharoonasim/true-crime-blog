import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import episodes from '@/data/episodes';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const filteredEpisodes = episodes.filter((episode) =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
  const fetchBlogs = async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    
    if (Array.isArray(data)) {
      setBlogs(data);
    } else if (Array.isArray(data.blogs)) {
      setBlogs(data.blogs); // your API might return { blogs: [...] }
    } else {
      console.error('Unexpected API response:', data);
      setBlogs([]); // fallback to empty
    }
  };
  fetchBlogs();
}, []);


  return (
    <Layout>
      <Head>
        <title>True Crime - Harry</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="True Crime - Harry: Chilling true crime stories and investigations." />
        <meta property="og:title" content="True Crime - Harry" />
        <meta property="og:description" content="Uncover dark mysteries and true crime stories." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/1.jpg" />
      </Head>

      <section id="home" className="hero">
        <h2>Welcome to True Crime - Harry</h2>
        <p>
          Uncover the darkest mysteries and most chilling true crime stories.
          Subscribe and dive into the unknown.
        </p>
        <a
          className="cta"
          href="https://www.youtube.com/@mysteriousoracle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe on YouTube
        </a>
      </section>

      <section id="latest-video" className="section" style={{ textAlign: 'center' }}>
        <h2>Latest Video</h2>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/y2rdq9sNeY4"
            title="Latest True Crime Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <input
        type="text"
        placeholder="Search episodes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <section id="episodes" className="section">
        <h2>Recent Episodes</h2>
        <div className="card-container">
          {filteredEpisodes.map((episode) => (
            <a key={episode.id} href={`/episodes/${episode.id}`} className="card-link">
              <div className="card">
                <img src={episode.thumbnail} alt={episode.title} className="card-img" />
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="blogs" className="section">
        <h2>Latest Blog Posts</h2>
        {blogs.length === 0 ? (
          <p>No blog posts yet.</p>
        ) : (
          <div className="blog-list">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-item">
                <h3>{blog.title}</h3>
                <p>{blog.content.slice(0, 150)}...</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to load blogs:', error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#e50914', marginBottom: '2rem' }}>📰 Blog Posts</h1>
      {blogs === null ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              borderBottom: '1px solid #444',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>
  <Link
    href={`/blog/${blog._id}`}
    style={{ color: '#e50914', textDecoration: 'underline' }}
  >
    {blog.title}
  </Link>
</h2>

          </div>
        ))
      )}
    </main>
  );
}

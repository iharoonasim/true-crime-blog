import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import Head from 'next/head';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error('Blog data is not an array:', data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Blog – True Crime Harry</title>
      </Head>

      <section className="blog-container">
        <h1 className="blog-heading">Latest Blog Posts</h1>

        {blogs.length === 0 ? (
          <p className="no-blogs">No blog posts found.</p>
        ) : (
          <div className="blog-list">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog._id}`} className="blog-card">
                <h2 className="blog-title">{blog.title}</h2>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

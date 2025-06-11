import { GetServerSideProps } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
}

interface Comment {
  _id: string;
  blogId: string;
  name: string;
  text: string;
}

export default function BlogPostPage({ blog }: { blog: BlogPost }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch comments for this blog
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?blogId=${blog._id}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Error loading comments:', err);
      }
    };
    fetchComments();
  }, [blog._id]);

  // Submit a new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: blog._id, name, text }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]);
        setName('');
        setText('');
      } else {
        console.error('Failed to submit comment');
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1 style={{ color: '#e50914' }}>{blog.title}</h1>
      <article
        dangerouslySetInnerHTML={{ __html: blog.content }}
        style={{ marginTop: '1rem', lineHeight: '1.6', fontSize: '1.1rem' }}
      />
      <Link href="/blog">← Back to Blog</Link>

      <section style={{ marginTop: '3rem' }}>
        <h2>Comments</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            style={{ display: 'block', marginBottom: '0.5rem', width: '100%', padding: '0.5rem' }}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your comment"
            required
            rows={4}
            style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>

        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} style={{ borderBottom: '1px solid #444', marginBottom: '1rem', paddingBottom: '1rem' }}>
              <strong>{comment.name}</strong>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

// Server-side blog data fetch
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  if (!slug || typeof slug !== 'string') {
    return { notFound: true };
  }

  try {
    const client = await clientPromise;
    const db = client.db('truecrime');
    const blog = await db
      .collection('blogs')
      .findOne({ _id: new ObjectId(slug) });

    if (!blog) return { notFound: true };

    return {
      props: {
        blog: {
          _id: blog._id.toString(),
          title: blog.title,
          content: blog.content,
        },
      },
    };
  } catch (err) {
    console.error('Error fetching blog post:', err);
    return { notFound: true };
  }
};

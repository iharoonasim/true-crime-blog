import { useState, useEffect } from 'react';
import Layout from '@/components/layout';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
}

export default function ManageBlogPosts() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
  const res = await fetch('/api/blog');
  const data = await res.json();

  if (Array.isArray(data)) {
    setBlogs(data);
  } else {
    console.error('Expected an array but got:', data);
    setBlogs([]); // fallback to empty array
  }
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const method = editId ? 'PATCH' : 'POST';
      const res = await fetch(`/api/blog${editId ? `/${editId}` : ''}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Blog ${editId ? 'updated' : 'added'} successfully!`);
        setTitle('');
        setContent('');
        setEditId(null);
        fetchBlogs();
      } else {
        alert(`❌ Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      alert('❌ Failed to save blog post. Check console for details.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('❌ Blog post deleted.');
      fetchBlogs();
    } else {
      alert('Failed to delete blog post.');
    }
  };

  return (
    <Layout>
      <div className="section">
        <h1>Blog Management</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          ></textarea>
          <button type="submit" className="cta" disabled={loading}>
            {loading ? (editId ? 'Updating...' : 'Posting...') : editId ? 'Update Blog Post' : 'Add Blog Post'}
          </button>
        </form>

        <div className="blog-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div>
                <button onClick={() => handleEdit(blog)}>✏️ Edit</button>
                <button onClick={() => handleDelete(blog._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

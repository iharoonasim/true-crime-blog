import { useState, useEffect, FormEvent } from 'react';
import Layout from '@/components/layout';

interface Episode {
  _id: string;
  title: string;
  link: string;
  description: string;
}

export default function ManageEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    const res = await fetch('/api/episodes');
    const data = await res.json();
    setEpisodes(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !link || !description) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(`/api/episodes${editId ? `/${editId}` : ''}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, link, description }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Episode ${editId ? 'updated' : 'added'} successfully!`);
        setTitle('');
        setLink('');
        setDescription('');
        setEditId(null);
        fetchEpisodes();
      } else {
        alert(`❌ Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      alert('❌ Failed. Check console for details.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (ep: Episode) => {
    setEditId(ep._id);
    setTitle(ep.title);
    setLink(ep.link);
    setDescription(ep.description);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this episode?')) return;
    const res = await fetch(`/api/episodes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('❌ Episode deleted.');
      fetchEpisodes();
    } else {
      alert('Failed to delete episode.');
    }
  };

  return (
    <Layout>
      <div className="section">
        <h1>Episodes Management</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Episode Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="YouTube Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="cta" disabled={loading}>
            {loading ? (editId ? 'Updating...' : 'Adding...') : editId ? 'Update Episode' : 'Add Episode'}
          </button>
        </form>

        <div className="episode-list">
          {episodes.map((ep) => (
            <div key={ep._id} className="episode-item">
              <h3>{ep.title}</h3>
              <p>{ep.description}</p>
              <div>
                <button onClick={() => handleEdit(ep)}>✏️ Edit</button>
                <button onClick={() => handleDelete(ep._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

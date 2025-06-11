import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) return <p style={styles.loading}>Loading...</p>;

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <ul style={styles.menuList}>
<li>
  <Link href="/admin/episodes" style={styles.link}>
    Manage Episodes
  </Link>
</li>
<li>
  <Link href="/admin/blog" style={styles.link}>
    Manage Blog Posts
  </Link>
</li>

          <li>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

const styles = {
  loading: {
    color: '#fff',
    textAlign: 'center' as const,
    marginTop: '2rem',
  },
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '2rem auto',
    backgroundColor: '#222',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    color: '#eee',
  },
  title: {
    color: '#e50914',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    backgroundColor: '#444',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
  },
  logoutButton: {
    padding: '0.75rem 1rem',
    backgroundColor: '#e50914',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

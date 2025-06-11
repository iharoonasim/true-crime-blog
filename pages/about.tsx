import Layout from "@/components/layout";

export default function AboutPage() {
  return (
    <Layout>
      <section className="section hero">
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>
          About <span style={{ color: '#e50914' }}>True Crime - Harry</span>
        </h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
          We're obsessed with the mysterious, the unsolved, and the chilling. Our goal is to take you on a journey into real-life crime stories that keep you thinking long after the video ends.
        </p>
      </section>

      <section className="section" style={{ backgroundColor: '#1a1a1a', color: '#eee' }}>
        <h2>📽️ Our Journey</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>2023:</strong> Channel launched with a vision to share unheard true crime stories.</li>
          <li><strong>2024:</strong> We worked day and night to provide Documentaries.</li>
          <li><strong>2025:</strong> Over 1 million views and a rapidly growing community of mystery lovers.</li>
          <li><strong>Future:</strong> Collaborations, original case investigations, and podcasts.</li>
        </ul>
      </section>

      <section className="section">
        <h2>🔍 What Makes Us Different?</h2>
        <div className="card-container">
          <div className="card">
            <h3>In-Depth Research</h3>
            <p>We dig deep into every case for the most accurate and respectful storytelling.</p>
          </div>
          <div className="card">
            <h3>Immersive Storytelling</h3>
            <p>Cinematic scripts and chilling narration bring each case to life.</p>
          </div>
          <div className="card">
            <h3>Community Driven</h3>
            <p>Your comments and suggestions shape our content roadmap.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

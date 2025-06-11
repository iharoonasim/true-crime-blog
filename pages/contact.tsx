import Layout from "@/components/layout";
import { useState } from "react";


export default function ContactPage() {
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await res.json();

  if (data.success) {
    alert('Message sent!');
    setName('');
    setEmail('');
    setMessage('');
  } else {
    alert(data.error || 'Something went wrong.');
  }
};

  return (
    <Layout>
      <section className="section hero">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
        <p style={{ fontSize: '1.1rem' }}>
          Questions, collaborations, or case suggestions? We’d love to hear from you.
        </p>
      </section>
      
      <section className="section" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div className="card" style={{ flex: 1 }}>
          <h3>📧 Email Us</h3>
          <p>
            <a href="mailto:contact.mysteriousoracle@gmail.com" className="cta">
              contact.mysteriousoracle@gmail.com
            </a>
          </p>
        </div>

        <div className="card" style={{ flex: 2 }}>
          <h3>💬 Contact Form</h3>
          <form
  onSubmit={handleSubmit}
  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
>
  <input
    type="text"
    placeholder="Your Name"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <input
    type="email"
    placeholder="Your Email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <textarea
    placeholder="Your Message"
    rows={5}
    required
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <button type="submit" className="cta">
    Send Message
  </button>
</form>

        </div>
      </section>
    </Layout>
  );
}

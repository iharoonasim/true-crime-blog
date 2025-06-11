import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useTheme } from "@/context/ThemeContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Head>
        <title>True Crime - Harry</title>
      </Head>
      <header className="header">
  <h1 className="site-title">True Crime - Harry</h1>
  <div className="nav-wrapper">
    <nav>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/episodes">Episodes</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
    <button 
      onClick={toggleTheme}
      className="toggle-btn"
      aria-label="Toggle dark/light mode"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  </div>
</header>


      <main>{children}</main>

      <footer>
        <p>&copy; 2025 True Crime - Harry. All rights reserved.</p>
      </footer>
    </>
  );
}

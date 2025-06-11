import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// ✅ Move this ABOVE the component
const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    padding: "2rem",
  },
  card: {
    background: "#222",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    width: "100%",
    maxWidth: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#1a1a1a",
    color: "#fff",
  },
  button: {
    background: "#e50914",
    color: "#fff",
    padding: "0.75rem",
    borderRadius: "6px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      router.push("/admin");
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "haroon") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center", color: "#e50914" }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

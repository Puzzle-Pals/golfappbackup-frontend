import { useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bp-golf-app-backend.vercel.app/api";

export default function AdminLogin({ setIsLoggedIn }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid password");
        setLoading(false);
        return;
      }
      // Store JWT token in localStorage
      localStorage.setItem("adminToken", data.token);
      setIsLoggedIn(true);
    } catch (err) {
      setError("Failed to connect to server.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1B4D3E", color: "#F5E8C7" }}>
      <nav style={{ backgroundColor: "#3C2F2F", padding: "1rem", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#F5E8C7", fontSize: "1.5rem", fontWeight: "bold", textDecoration: "none" }}>
            BP Men’s League
          </Link>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link href="/weekly-results" style={{ color: "#F5E8C7", textDecoration: "none" }}>Weekly Results</Link>
            <Link href="/player-stats" style={{ color: "#F5E8C7", textDecoration: "none" }}>Player Stats</Link>
            <Link href="/leaderboard" style={{ color: "#F5E8C7", textDecoration: "none" }}>Leaderboard</Link>
          </div>
        </div>
      </nav>
      <main style={{
        maxWidth: "400px",
        margin: "4rem auto 0 auto",
        padding: "2.5rem",
        background: "#3C2F2F",
        borderRadius: "0.75rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        color: "#F5E8C7"
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          letterSpacing: "1px",
          textAlign: "center"
        }}>
          Admin Login
        </h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="admin-password" style={{ display: "block", marginBottom: "1rem", fontWeight: 600 }}>
            Enter Admin Password
          </label>
          <input
            type="password"
            id="admin-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #F5E8C7",
              background: "#1B4D3E",
              color: "#F5E8C7",
              fontSize: "1.1rem",
              marginBottom: "1.5rem"
            }}
            autoComplete="current-password"
            disabled={loading}
            required
          />
          {error && (
            <div style={{ color: "#C71585", marginBottom: "1rem", fontWeight: 500 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.9rem",
              background: "#87CEEB",
              color: "#1B4D3E",
              fontWeight: "bold",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
}
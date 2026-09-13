import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swords, ShieldAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate("/");
      } else {
        setError(res.error || "Login failed. Verify credentials.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page jrpg-auth-page">
      <div className="auth-card jrpg-auth-card">
        <div className="brand centered">
          <div className="brand-icon jrpg-brand-icon">
            <Swords size={26} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "26px" }}>Daily RPG</h1>
            <span style={{ color: "var(--jrpg-gold)" }}>Bravely Level Up Your Daily Life</span>
          </div>
        </div>

        <p className="eyebrow centered-text" style={{ fontFamily: "'MedievalSharp', cursive" }}>
          WELCOME, ADVENTURER
        </p>
        <h2 style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "28px" }}>Enter the Realm</h2>
        <p className="auth-description">
          Log in to claim your quest log, level your attributes, and awaken your hero.
        </p>

        {error && (
          <div className="auth-error-banner">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
            Email Address
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hero@dailyrpg.com"
            />
          </label>

          <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button
            className="primary-button full-width jrpg-btn-glow"
            type="submit"
            style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "16px", padding: "14px" }}
            disabled={submitting}
          >
            {submitting ? "Entering Realm..." : "Enter Realm"}
          </button>
        </form>

        <div className="auth-footer-links">
          <span>First time in the realm?</span>
          <Link to="/register" className="text-link">
            Create Hero Account
          </Link>
        </div>

        <p className="demo-note" style={{ marginTop: "18px", fontSize: "11px", color: "var(--muted)", textAlign: "center" }}>
          ⚔️ Enter the credentials you registered with to load your hero from the server.
        </p>
      </div>
    </div>
  );
}

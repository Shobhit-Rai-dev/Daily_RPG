import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swords, ShieldAlert } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await register(username.trim(), email.trim(), password);
      if (res.success) {
        navigate("/");
      } else {
        setError(res.error || "Registration failed. Try again.");
      }
    } catch {
      setError("An unexpected error occurred during registration.");
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
            <span style={{ color: "var(--jrpg-gold)" }}>Awaken Your Hero at Level 1</span>
          </div>
        </div>

        <p className="eyebrow centered-text" style={{ fontFamily: "'MedievalSharp', cursive" }}>
          NEW HERO ENROLLMENT
        </p>
        <h2 style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "28px" }}>Create Adventurer</h2>
        <p className="auth-description">
          Register your hero. After logging in, you will choose your fixed character archetype.
        </p>

        {error && (
          <div className="auth-error-banner">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
            Adventurer Name
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Tiz or Agnes"
              autoFocus
            />
          </label>

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

          <div className="form-row">
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

            <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
              Confirm Password
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>
          </div>

          <button
            className="primary-button full-width jrpg-btn-glow"
            type="submit"
            style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "16px", padding: "14px" }}
            disabled={submitting}
          >
            {submitting ? "Forging Hero..." : "Enroll as Level 1 Adventurer"}
          </button>
        </form>

        <div className="auth-footer-links">
          <span>Already enrolled in the realm?</span>
          <Link to="/login" className="text-link">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

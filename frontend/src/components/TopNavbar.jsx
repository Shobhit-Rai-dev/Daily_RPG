import React from "react";
import { Link } from "react-router-dom";
import { Swords, LogOut, Coins, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRPG } from "../context/RPGContext";

export default function TopNavbar() {
  const { logout, user } = useAuth();
  const { character } = useRPG();

  const multiplier = Number(character.activeXpMultiplier || 1);

  return (
    <header className="top-navbar">
      {/* Upper Left: Logo & Branding */}
      <Link to="/" className="top-brand">
        <div className="top-brand-icon">
          <Swords size={22} />
        </div>
        <div className="top-brand-text">
          <h1 className="brand-title">Daily RPG</h1>
          <span className="brand-tagline">Forge Your Legend</span>
        </div>
      </Link>

      {/* Center: Active Potion Buff Pill (if 2x or 20x active) */}
      <div className="top-navbar-center">
        {multiplier > 1 && (
          <div className={`active-potion-pill ${multiplier === 20 ? "purple-buff" : "green-buff"}`}>
            <Sparkles size={16} />
            <strong>
              {multiplier === 20 ? "20x XP Buff Active!" : "2x XP Buff Active!"}
            </strong>
            <small>(Next Quest)</small>
          </div>
        )}
      </div>

      {/* Upper Right: Coins, Mini Profile & Logout */}
      <div className="top-nav-right">
        <div className="nav-gold-badge" title="Adventurer Gold">
          <Coins size={16} className="gold-coin-icon" />
          <span>{character.gold} G</span>
        </div>

        <div className="top-mini-profile">
          <div className="avatar-disc">
            {character.gender === "female" ? "♀" : "♂"}
          </div>
          <div className="profile-details">
            <strong className="profile-name">{character.name || user?.username || "Hero"}</strong>
            <span className="profile-level">Lv {character.level} {character.activeJob || "Adventurer"}</span>
          </div>
        </div>

        <button className="top-logout-btn" onClick={logout} title="Exit Realm (Logout)">
          <LogOut size={16} />
          <span className="logout-label">Logout</span>
        </button>
      </div>
    </header>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Dumbbell,
  Shield,
  HeartPulse,
  Sparkles,
  Award,
  ShoppingBag,
  Coins,
  CheckCircle,
  Zap,
  Flame
} from "lucide-react";
import { useRPG } from "../context/RPGContext";
import PageHeader from "../components/PageHeader";
import AdventurerAvatar from "../components/AdventurerAvatar";

export default function Profile() {
  const { character, quests, inventory, setGender } = useRPG();

  const completedQuestsCount = quests.filter((q) => q.completed).length;
  const stats = character.stats || {
    str: 10.00,
    stamina: 10.00,
    agility: 10.00,
    intelligence: 10.00,
    persona: 10.00
  };

  return (
    <>
      <PageHeader
        eyebrow="HERO DOSSIER"
        title="Adventurer Character Sheet"
        description="Every completed quest permanently strengthens your Bravely Default RPG attributes."
      />

      <div className="profile-layout">
        {/* Character Stage Card */}
        <div className="character-card">
          <div className="character-top">
            <div className="character-avatar">
              <Shield size={32} />
            </div>
            <div>
              <p className="eyebrow" style={{ margin: 0 }}>HERO PROFILE</p>
              <h3 style={{ margin: "4px 0", fontFamily: "var(--font-serif)", fontSize: "22px" }}>
                {character.name || "Tiz"}
              </h3>
              <span className="character-title" style={{ color: "var(--muted)", fontSize: "12px" }}>
                {character.gender === "female" ? "Heroine of the Realm" : "Hero of Luxendarc"}
              </span>
            </div>
            <span className="level-pill">LVL {character.level}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", margin: "14px 0" }}>
            <AdventurerAvatar gender={character.gender || "male"} size={160} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <button
              type="button"
              className={`gender-btn ${character.gender === "male" ? "active" : ""}`}
              onClick={() => setGender("male")}
            >
              ♂ Male Hero
            </button>
            <button
              type="button"
              className={`gender-btn ${character.gender === "female" ? "active" : ""}`}
              onClick={() => setGender("female")}
            >
              ♀ Female Heroine
            </button>
          </div>

          <div className="xp-row">
            <span>Experience to Next Level</span>
            <strong>
              {character.xp} / {character.nextLevelXp} XP
            </strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, Math.round((character.xp / character.nextLevelXp) * 100))}%`
              }}
            />
          </div>

          <div className="character-stats">
            <div>
              <Coins size={16} />
              <span>Gold</span>
              <strong>{character.gold} G</strong>
            </div>
            <div>
              <Flame size={16} />
              <span>Streak</span>
              <strong>{character.streak || 1} Days</strong>
            </div>
          </div>
        </div>

        {/* 5 Core Attributes Breakdown */}
        <div className="attributes-card">
          <div className="card-heading" style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <p className="eyebrow" style={{ margin: 0 }}>CORE ATTRIBUTES</p>
              <h3 style={{ margin: "4px 0", fontFamily: "var(--font-serif)", fontSize: "20px" }}>
                5 RPG Affinities
              </h3>
            </div>
            <Sparkles size={22} color="var(--jrpg-gold)" />
          </div>

          <Attribute
            label="Strength (STR)"
            desc="Physical power & strength conditioning"
            value={stats.str}
            icon={<Dumbbell size={16} />}
          />
          <Attribute
            label="Stamina (STA)"
            desc="Endurance, hydration, and long habits"
            value={stats.stamina}
            icon={<HeartPulse size={16} />}
          />
          <Attribute
            label="Agility (AGI)"
            desc="Quick reflexes, speed sprints, rapid execution"
            value={stats.agility}
            icon={<Zap size={16} />}
          />
          <Attribute
            label="Intelligence (INT)"
            desc="Academic study, coding, algorithms, reading"
            value={stats.intelligence}
            icon={<Brain size={16} />}
          />
          <Attribute
            label="Persona (PER)"
            desc="Leadership, communication, mental resilience"
            value={stats.persona}
            icon={<Shield size={16} />}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <section className="stats-summary-grid">
        <div className="stat-box">
          <CheckCircle size={24} className="stat-icon green" />
          <div>
            <strong>{completedQuestsCount}</strong>
            <span>Completed Quests</span>
          </div>
        </div>

        <div className="stat-box">
          <Award size={24} className="stat-icon purple" />
          <div>
            <strong>Level {character.level}</strong>
            <span>Adventurer Rank</span>
          </div>
        </div>

        <div className="stat-box">
          <Coins size={24} className="stat-icon orange" />
          <div>
            <strong>{character.gold} G</strong>
            <span>Gold in Treasury</span>
          </div>
        </div>

        <div className="stat-box">
          <ShoppingBag size={24} className="stat-icon blue" />
          <div>
            <strong>{inventory.length}</strong>
            <span>Backpack Relics</span>
          </div>
        </div>
      </section>

      {/* Backpack Inventory */}
      <section className="inventory-section">
        <div className="section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>BACKPACK TREASURES</p>
            <h3 style={{ margin: "4px 0", fontFamily: "var(--font-serif)", fontSize: "20px" }}>
              Acquired Equipment & Badges ({inventory.length})
            </h3>
          </div>
          <Link className="text-link" to="/shop" style={{ color: "var(--jrpg-gold)", fontSize: "13px" }}>
            Visit Reward Shop →
          </Link>
        </div>

        {inventory.length === 0 ? (
          <div className="parchment-empty-box" style={{ padding: "36px", textAlign: "center" }}>
            <p>Your adventurer's backpack is empty.</p>
            <p style={{ fontSize: "12px", color: "var(--muted)" }}>Complete quests to earn gold, then acquire legendary items in the Reward Shop.</p>
            <Link to="/shop" className="primary-button" style={{ marginTop: "12px" }}>
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="inventory-grid">
            {inventory.map((item, idx) => (
              <div className="inventory-card" key={idx}>
                <div className="inventory-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontFamily: "var(--font-serif)" }}>{item.name}</h4>
                  <p style={{ margin: "0 0 6px", fontSize: "12px", color: "var(--muted)" }}>{item.description}</p>
                  <span style={{ fontSize: "11px", color: "var(--jrpg-gold)", fontWeight: "700" }}>In Inventory</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Attribute({ label, desc, value, icon }) {
  const numVal = Number(value || 10);
  const percentage = Math.min(100, Math.max(10, Math.round((numVal / 25) * 100)));

  return (
    <div className="attribute">
      <div className="attribute-label">
        <div className="attribute-title-wrap">
          <span className="attr-icon">{icon}</span>
          <div>
            <strong style={{ fontSize: "13px" }}>{label}</strong>
            <small>{desc}</small>
          </div>
        </div>
        <span className="attr-value" style={{ color: "var(--jrpg-gold)" }}>{numVal.toFixed(2)}</span>
      </div>
      <div className="progress-track" style={{ height: "6px" }}>
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

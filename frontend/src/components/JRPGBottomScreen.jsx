import React, { useState } from "react";
import { Plus, Check, Swords, Shield, Sparkles, Flame, Coins, Award } from "lucide-react";
import { useRPG } from "../context/RPGContext";

export default function JRPGBottomScreen({ onOpenNewQuest }) {
  const { character, quests, achievements, completeQuest, lastStatBoost } = useRPG();
  const [activeTab, setActiveTab] = useState("jobInfo"); // 'jobInfo' | 'quests' | 'achievements'

  const ongoingQuests = quests.filter((q) => !q.completed);
  const completedCount = quests.filter((q) => q.completed).length;

  const stats = character.stats || {
    str: 10.00,
    stamina: 10.00,
    agility: 10.00,
    intelligence: 10.00,
    persona: 10.00
  };

  function formatStat(val) {
    return Number(val || 10).toFixed(2);
  }

  function getDelta(statKey) {
    if (lastStatBoost && lastStatBoost.stat === statKey) {
      return (
        <span className="stat-delta-boost">
          ▶ <span className="delta-number">+{lastStatBoost.amount.toFixed(2)}</span>
        </span>
      );
    }
    return null;
  }

  function renderTierClass(tier) {
    switch (tier) {
      case "Tier S":
        return "tier-s";
      case "Tier A":
        return "tier-a";
      case "Tier B":
        return "tier-b";
      case "Tier C":
        return "tier-c";
      case "Tier D":
        return "tier-d";
      default:
        return "tier-basic";
    }
  }

  return (
    <div className="jrpg-screen bottom-screen">
      <div className="parchment-container">
        {/* Left Vertical Navigation Tabs */}
        <div className="parchment-sidebar-tabs">
          <button
            type="button"
            className={`parchment-tab ${activeTab === "jobInfo" ? "active" : ""}`}
            onClick={() => setActiveTab("jobInfo")}
          >
            <span>Job Info</span>
          </button>
          <button
            type="button"
            className={`parchment-tab ${activeTab === "quests" ? "active" : ""}`}
            onClick={() => setActiveTab("quests")}
          >
            <span>Quests ({ongoingQuests.length})</span>
          </button>
          <button
            type="button"
            className={`parchment-tab ${activeTab === "achievements" ? "active" : ""}`}
            onClick={() => setActiveTab("achievements")}
          >
            <span>Milestones</span>
          </button>
        </div>

        {/* Main Parchment Sheet Content */}
        <div className="parchment-sheet">
          {/* Header Bar */}
          <div className="parchment-job-header">
            <div className="job-affinity-label">
              <span className="job-symbol">⚔️</span>
              <strong>{character.activeJob || "Freelancer"}</strong>
              <span className="level-tag">Lv {character.level}</span>
            </div>

            <div className="header-stat-meters">
              <span className="parchment-meter gold-meter">
                <Coins size={14} /> {character.gold} G
              </span>
              <span className="parchment-meter xp-meter">
                XP {character.xp}/{character.nextLevelXp}
              </span>
              <button className="parchment-btn-action" onClick={onOpenNewQuest}>
                <Plus size={14} /> New Quest
              </button>
            </div>
          </div>

          <div className="parchment-divider" />

          {/* Section 1: Stat Affinities */}
          <div className="parchment-section">
            <h4 className="parchment-section-title">Stat Affinities</h4>

            <div className="stat-affinities-grid">
              {/* HP & MP Row */}
              <div className="stat-affinity-item hp-mp-row">
                <span className="stat-affinity-label">Max HP</span>
                <span className="stat-affinity-val highlight-hp">{character.maxHp || 350}</span>
                <span className="stat-affinity-label" style={{ marginLeft: "18px" }}>
                  Max MP
                </span>
                <span className="stat-affinity-val highlight-mp">{character.maxMp || 50}</span>
              </div>

              {/* 5 Core Attributes with Floating-Point Increments */}
              <div className="stat-grid-columns">
                <div className="stat-affinity-item">
                  <span className="stat-affinity-label">STR</span>
                  <span className="stat-affinity-val">
                    {formatStat(stats.str)} {getDelta("str")}
                  </span>
                </div>

                <div className="stat-affinity-item">
                  <span className="stat-affinity-label">INT</span>
                  <span className="stat-affinity-val">
                    {formatStat(stats.intelligence)} {getDelta("intelligence")}
                  </span>
                </div>

                <div className="stat-affinity-item">
                  <span className="stat-affinity-label">STA</span>
                  <span className="stat-affinity-val">
                    {formatStat(stats.stamina)} {getDelta("stamina")}
                  </span>
                </div>

                <div className="stat-affinity-item">
                  <span className="stat-affinity-label">AGI</span>
                  <span className="stat-affinity-val">
                    {formatStat(stats.agility)} {getDelta("agility")}
                  </span>
                </div>

                <div className="stat-affinity-item">
                  <span className="stat-affinity-label">PER</span>
                  <span className="stat-affinity-val">
                    {formatStat(stats.persona)} {getDelta("persona")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="parchment-divider dashed" />

          {/* Section 2: Ongoing Quests (Replacing Arms Aptitude) */}
          <div className="parchment-section">
            <div className="section-title-row">
              <h4 className="parchment-section-title">
                Ongoing Quests <span className="section-counter">({ongoingQuests.length} Active)</span>
              </h4>
              <span className="subtitle-hint">Replaces Arms Aptitude • Completing tasks increases stats</span>
            </div>

            {ongoingQuests.length === 0 ? (
              <div className="parchment-empty-box">
                <p>All active quests fulfilled! Embark on a new adventure.</p>
                <button className="parchment-inline-button" onClick={onOpenNewQuest}>
                  <Plus size={14} /> Add Quest
                </button>
              </div>
            ) : (
              <div className="ongoing-quests-table">
                {ongoingQuests.slice(0, 4).map((quest) => (
                  <div className="ongoing-quest-row" key={quest.id}>
                    <span className={`quest-tier-pill ${renderTierClass(quest.tier)}`}>
                      {quest.tier || "Tier D"}
                    </span>

                    <div className="quest-row-details">
                      <strong className="quest-row-title">{quest.title}</strong>
                      <span className="quest-row-category">{quest.category}</span>
                    </div>

                    <div className="quest-row-rewards">
                      <span className="stat-boost-tag">
                        +{(quest.statGain || 0.15).toFixed(2)} {(quest.targetStat || "str").toUpperCase()}
                      </span>
                      <span className="xp-gold-tag">
                        +{quest.xp} XP • +{quest.gold} G
                      </span>
                    </div>

                    <button
                      className="parchment-complete-btn"
                      onClick={() => completeQuest(quest.id)}
                      title="Mark Completed & Gain Stats"
                    >
                      <Check size={14} /> Complete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="parchment-divider dashed" />

          {/* Section 3: Achievements & Badges (Replacing Armor Aptitude) */}
          <div className="parchment-section">
            <div className="section-title-row">
              <h4 className="parchment-section-title">
                Achievements & Milestones <span className="section-counter">({completedCount} Done)</span>
              </h4>
              <span className="subtitle-hint">Replaces Armor Aptitude • Habit Consistency & Prestige</span>
            </div>

            <div className="achievements-aptitude-grid">
              <div className="aptitude-badge-card unlocked">
                <span className="badge-tier-tag">Rank 1</span>
                <div className="badge-info">
                  <strong>Novice Adventurer</strong>
                  <small>Begun Journey at Level 1</small>
                </div>
              </div>

              <div className="aptitude-badge-card unlocked">
                <span className="badge-tier-tag">🔥 Streak</span>
                <div className="badge-info">
                  <strong>{character.streak || 1}-Day Streak</strong>
                  <small>Unbroken Discipline</small>
                </div>
              </div>

              <div className={`aptitude-badge-card ${character.level >= 2 ? "unlocked" : "locked"}`}>
                <span className="badge-tier-tag">Lv 2</span>
                <div className="badge-info">
                  <strong>Adept Pioneer</strong>
                  <small>{character.level >= 2 ? "Achieved" : "Reach Level 2"}</small>
                </div>
              </div>

              <div className={`aptitude-badge-card ${completedCount >= 5 ? "unlocked" : "locked"}`}>
                <span className="badge-tier-tag">Slayer</span>
                <div className="badge-info">
                  <strong>Quest Veteran</strong>
                  <small>{completedCount}/5 Quests Conquered</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

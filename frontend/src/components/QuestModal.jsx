import React, { useState, useEffect } from "react";
import { X, Plus, Sparkles, Check, Lock } from "lucide-react";
import { TIER_REWARDS } from "../services/api";

export default function QuestModal({ onClose, onSave, initialQuest = null }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Fitness",
    tier: "Tier D",
    targetStat: "str"
  });

  useEffect(() => {
    if (initialQuest) {
      setForm({
        title: initialQuest.title || "",
        description: initialQuest.description || "",
        category: initialQuest.category || "Fitness",
        tier: initialQuest.tier || "Tier D",
        targetStat: initialQuest.targetStat || "str"
      });
    }
  }, [initialQuest]);

  // Handle ESC key to dismiss
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((old) => ({
      ...old,
      [name]: value
    }));
  }

  const currentTierInfo = TIER_REWARDS[form.tier] || TIER_REWARDS["Tier D"];

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      statGain: Number(currentTierInfo.defaultGain), // Strictly computed from tier!
      xp: currentTierInfo.xp,
      gold: currentTierInfo.gold
    });
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal jrpg-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <p className="eyebrow" style={{ fontFamily: "'MedievalSharp', cursive" }}>
              {initialQuest ? "MODIFY GUILD SCROLL" : "GUILD REGISTRATION"}
            </p>
            <h3 style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "24px" }}>
              {initialQuest ? "Edit Quest Bounty" : "Commission a Quest"}
            </h3>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit}>
          <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
            Quest Title
            <input
              required
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="e.g. 50 Push-ups & 3km Run"
              autoFocus
            />
          </label>

          <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
            Description (Objectives & Constraints)
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Outline what needs to be accomplished in the realm..."
              rows={2}
            />
          </label>

          <div className="form-row">
            <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
              Quest Tier (Difficulty)
              <select name="tier" value={form.tier} onChange={updateField}>
                <option value="Tier F">Tier F (Novice • Trivial — +0.05 Stat)</option>
                <option value="Tier E">Tier E (Basic • Light — +0.10 Stat)</option>
                <option value="Tier D">Tier D (Intermediate • Standard — +0.15 Stat)</option>
                <option value="Tier C">Tier C (Skilled • Challenging — +0.25 Stat)</option>
                <option value="Tier B">Tier B (Expert • Demanding — +0.35 Stat)</option>
                <option value="Tier A">Tier A (Master • Heroic — +0.50 Stat)</option>
                <option value="Tier S">Tier S (Mythic • Legendary — +1.00 Stat)</option>
              </select>
            </label>

            <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
              Primary Stat Trained
              <select name="targetStat" value={form.targetStat} onChange={updateField}>
                <option value="str">Strength (STR) — Heavy Conditioning</option>
                <option value="stamina">Stamina (STA) — Endurance & Habits</option>
                <option value="agility">Agility (AGI) — Speed & Footwork</option>
                <option value="intelligence">Intelligence (INT) — Study & Code</option>
                <option value="persona">Persona (PER) — Leadership & Social</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
              Category
              <select name="category" value={form.category} onChange={updateField}>
                <option value="Fitness">Fitness (Unlocks Muscle Warrior)</option>
                <option value="Study">Study (Unlocks Scholar)</option>
                <option value="Health">Health (Unlocks Iron Monk)</option>
                <option value="Work">Work (Unlocks Grand Diplomat)</option>
                <option value="Personal">Personal Growth</option>
              </select>
            </label>

            <label style={{ fontFamily: "'MedievalSharp', cursive" }}>
              Stat Increase (Tier Derived)
              <div className="locked-stat-gain-display">
                <Lock size={14} />
                <span>+{currentTierInfo.defaultGain.toFixed(2)} {form.targetStat.toUpperCase()}</span>
                <small>(Locked to {form.tier})</small>
              </div>
            </label>
          </div>

          <div className="reward-preview jrpg-reward-preview">
            <div className="reward-preview-title">
              <Sparkles size={16} /> Guild Bounty Breakdown:
            </div>
            <div className="reward-preview-badges">
              <span className="reward-badge stat-badge">
                +{currentTierInfo.defaultGain.toFixed(2)} {form.targetStat.toUpperCase()}
              </span>
              <span className="reward-badge xp-badge">+{currentTierInfo.xp} XP</span>
              <span className="reward-badge gold-badge">+{currentTierInfo.gold} Gold</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" style={{ fontFamily: "'MedievalSharp', cursive" }}>
              {initialQuest ? <Check size={18} /> : <Plus size={18} />}
              {initialQuest ? "Save Changes" : "Seal Guild Quest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

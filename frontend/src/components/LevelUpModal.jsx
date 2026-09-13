import React from "react";
import { Sparkles, Trophy, ArrowUpRight, Flame } from "lucide-react";

export default function LevelUpModal({ newLevel, characterName, onClose }) {
  return (
    <div className="modal-backdrop celebration-backdrop" onClick={onClose}>
      <div
        className="modal celebration-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="celebration-badge-wrap">
          <div className="celebration-badge">
            <Trophy size={48} />
          </div>
        </div>

        <p className="eyebrow centered-text">HONOR & GLORY</p>
        <h2 className="celebration-title">LEVEL UP!</h2>

        <p className="celebration-hero-level">
          Level {newLevel}
        </p>

        <p className="celebration-subtitle">
          Outstanding work, <strong>{characterName || "Adventurer"}</strong>!
          Your discipline is transforming real-life effort into legendary mastery.
        </p>

        <div className="celebration-stats-pill">
          <div>
            <Sparkles size={16} /> All Attributes Boosted
          </div>
          <div>
            <Flame size={16} /> Momentum Preserved
          </div>
        </div>

        <button className="primary-button full-width glow-button" onClick={onClose}>
          Claim Glory & Continue <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
}

import React from "react";
import {
  Brain,
  Dumbbell,
  ScrollText,
  HeartPulse,
  Sparkles,
  Check,
  Trash2,
  Edit2
} from "lucide-react";

export default function QuestCard({ quest, onComplete, onEdit, onDelete }) {
  function renderCategoryIcon(category) {
    switch (category) {
      case "Study":
        return <Brain size={20} />;
      case "Fitness":
        return <Dumbbell size={20} />;
      case "Work":
        return <ScrollText size={20} />;
      case "Health":
        return <HeartPulse size={20} />;
      default:
        return <Sparkles size={20} />;
    }
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

  const categoryLower = (quest.category || "personal").toLowerCase();
  const statLabel = (quest.targetStat || "str").toUpperCase();
  const statGain = Number(quest.statGain || 0.15).toFixed(2);

  return (
    <article className={`quest-card parchment-quest-card ${quest.completed ? "completed" : ""}`}>
      <div className={`quest-symbol ${categoryLower}`}>
        {renderCategoryIcon(quest.category)}
      </div>

      <div className="quest-info">
        <div className="quest-title-row">
          <h4>{quest.title}</h4>
          <span className={`quest-tier-pill ${renderTierClass(quest.tier)}`}>
            {quest.tier || "Tier D"}
          </span>
        </div>

        {quest.description && <p>{quest.description}</p>}

        <div className="quest-meta">
          <span className="stat-boost-tag">
            +{statGain} {statLabel}
          </span>
          <span className="reward xp-reward">+{quest.xp} XP</span>
          <span className="reward gold-reward">+{quest.gold} Gold</span>
        </div>
      </div>

      <div className="quest-actions">
        {onDelete && !quest.completed && (
          <button
            type="button"
            className="card-action-button delete-btn"
            title="Delete Quest"
            onClick={() => onDelete(quest.id)}
          >
            <Trash2 size={16} />
          </button>
        )}
        {onEdit && !quest.completed && (
          <button
            type="button"
            className="card-action-button edit-btn"
            title="Edit Quest"
            onClick={() => onEdit(quest)}
          >
            <Edit2 size={16} />
          </button>
        )}

        <button
          className={`complete-button ${quest.completed ? "done" : ""}`}
          disabled={quest.completed}
          onClick={() => onComplete(quest.id)}
        >
          {quest.completed ? (
            <>
              <Check size={17} /> Done
            </>
          ) : (
            "Complete"
          )}
        </button>
      </div>
    </article>
  );
}

import React from "react";
import { Shield, Coins, Flame } from "lucide-react";
import XPBar from "./XPBar";

export default function CharacterCard({ character }) {
  const progress = character.nextLevelXp > 0
    ? Math.min(100, Math.round((character.xp / character.nextLevelXp) * 100))
    : 0;

  return (
    <div className="character-card">
      <div className="character-top">
        <div className="character-avatar">
          <Shield size={50} />
        </div>
        <div>
          <p className="card-label">CURRENT CHARACTER</p>
          <h3>{character.name || "Hero"}</h3>
          <span className="character-title">The Persistent Adventurer</span>
        </div>
        <span className="level-pill">LVL {character.level}</span>
      </div>

      <div className="xp-row">
        <span>Experience</span>
        <strong>
          {character.xp} / {character.nextLevelXp} XP ({progress}%)
        </strong>
      </div>

      <XPBar current={character.xp} max={character.nextLevelXp} color="purple" />

      <div className="character-stats">
        <div>
          <Coins size={17} />
          <span>Gold</span>
          <strong>{character.gold}</strong>
        </div>
        <div>
          <Flame size={17} />
          <span>Streak</span>
          <strong>{character.streak || 1} days</strong>
        </div>
      </div>
    </div>
  );
}

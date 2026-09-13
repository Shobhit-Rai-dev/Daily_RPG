import React from "react";
import { Lock, Check } from "lucide-react";
import AdventurerAvatar from "./AdventurerAvatar";
import { useRPG } from "../context/RPGContext";

export default function JRPGTopScreen() {
  const { character, setActiveJob, classStatus } = useRPG();

  const JOBS = [
    {
      id: "Novice Adventurer",
      name: "Novice Adventurer",
      icon: "⚔️",
      level: character.level,
      jp: character.xp % 100,
      maxJp: 100,
      desc: "An adaptable adventurer building balanced daily life habits."
    },
    {
      id: "Muscle Warrior",
      name: "Muscle Warrior",
      icon: "🥊",
      level: Math.max(1, Math.floor(character.stats?.str - 9)),
      jp: Math.min(30, Math.round(character.stats?.str * 2)),
      maxJp: 30,
      desc: "Earned through vigorous physical conditioning and heavy strength training."
    },
    {
      id: "Scholar",
      name: "Scholar",
      icon: "📜",
      level: Math.max(1, Math.floor(character.stats?.intelligence - 9)),
      jp: Math.min(30, Math.round(character.stats?.intelligence * 2)),
      maxJp: 30,
      desc: "Earned by dedicating deep focus to algorithmic study, code, and reading."
    },
    {
      id: "Iron Monk",
      name: "Iron Monk",
      icon: "🧘",
      level: Math.max(1, Math.floor(character.stats?.stamina - 9)),
      jp: Math.min(30, Math.round(character.stats?.stamina * 2)),
      maxJp: 30,
      desc: "Earned through unwavering stamina, continuous hydration, and bodily resilience."
    },
    {
      id: "Grand Diplomat",
      name: "Grand Diplomat",
      icon: "👑",
      level: Math.max(1, Math.floor(character.stats?.persona - 9)),
      jp: Math.min(30, Math.round(character.stats?.persona * 2)),
      maxJp: 30,
      desc: "Earned through project leadership, communication, and social mastery."
    }
  ];

  const currentJob = JOBS.find((j) => j.id === (character.activeJob || "Novice Adventurer")) || JOBS[0];

  return (
    <div className="jrpg-screen top-screen">
      {/* 3DS Screen Header Bar */}
      <div className="jrpg-top-header">
        <div className="job-badge-pill">
          <span className="leaf-icon">🍃</span>
          <strong>Class</strong>
        </div>

        <div className="shoulder-nav">
          <span className="shoulder-btn">[L]</span>
          <div className="header-character-info">
            <span className="char-lv">Lv {character.level}</span>
            <span className="char-name">{character.name || "Adventurer"}</span>
          </div>
          <span className="shoulder-btn">[R]</span>
        </div>

        <div className="job-current-pill">
          <span className="job-symbol">{currentJob.icon}</span>
          <span className="job-name-display">{currentJob.name}</span>
        </div>
      </div>

      {/* Main Top Stage */}
      <div className="jrpg-top-stage">
        {/* Left Column: Job Selection Plates */}
        <div className="job-plates-list">
          {JOBS.map((job) => {
            const isSelected = (character.activeJob || "Novice Adventurer") === job.id;
            const status = classStatus?.[job.id] || { unlocked: true };
            const isUnlocked = status.unlocked;
            const jpPercent = Math.min(100, Math.round((job.jp / job.maxJp) * 100));

            return (
              <div
                key={job.id}
                className={`job-plate ${isSelected ? "selected" : ""} ${!isUnlocked ? "locked-plate" : ""}`}
                onClick={() => setActiveJob(job.id)}
                title={!isUnlocked ? `Locked! Requires: ${status.condition}` : "Click to assume class"}
              >
                {/* Finger Selector Pointer */}
                {isSelected && isUnlocked && <div className="finger-pointer">👉</div>}

                <div className="job-plate-inner">
                  <div className="plate-icon-col">
                    <span className="plate-icon">{job.icon}</span>
                  </div>

                  <div className="plate-details">
                    <div className="plate-row-top">
                      <span className="plate-lv">{isUnlocked ? `Lv ${job.level}` : "🔒"}</span>
                      <strong className="plate-title">{job.name}</strong>
                      {!isUnlocked && (
                        <span className="lock-tag">
                          <Lock size={12} /> {status.condition}
                        </span>
                      )}
                    </div>

                    {isUnlocked ? (
                      <div className="plate-jp-row">
                        <span className="jp-label">JP</span>
                        <div className="jp-bar-track">
                          <div className="jp-bar-fill" style={{ width: `${jpPercent}%` }} />
                        </div>
                        <span className="jp-numbers">
                          {job.jp}/{job.maxJp}
                        </span>
                      </div>
                    ) : (
                      <div className="plate-unlock-progress">
                        <span>Progress: {status.progress}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Chibi Character Stage with Constellation Ring */}
        <div className="character-avatar-stage">
          <AdventurerAvatar gender={character.gender || "male"} size={210} />

          <div className="character-stage-footer">
            <span className="adventurer-rank-tag">
              {character.gender === "female" ? "♀ Heroine" : "♂ Hero"} • Archetype Fixed
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Description Strip */}
      <div className="jrpg-dialogue-strip">
        <div className="dpad-indicator">
          <span>◁</span>
          <div className="circle-dpad" />
          <span>▷</span>
        </div>
        <p className="dialogue-text">{currentJob.desc}</p>
      </div>
    </div>
  );
}

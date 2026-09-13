import React, { useState } from "react";
import AdventurerAvatar from "./AdventurerAvatar";
import { Swords, Check, Sparkles } from "lucide-react";
import { useRPG } from "../context/RPGContext";

export default function CharacterSelectionModal() {
  const { character, setFixedGender } = useRPG();
  const [selectedGender, setSelectedGender] = useState("male");
  const [confirming, setConfirming] = useState(false);

  // If gender is already chosen and locked, don't show
  if (character?.genderChosen) return null;

  async function handleConfirm() {
    setConfirming(true);
    await setFixedGender(selectedGender);
    setConfirming(false);
  }

  return (
    <div className="modal-backdrop character-selection-backdrop">
      <div className="modal character-selection-modal" role="dialog" aria-modal="true">
        <div className="brand centered" style={{ marginBottom: "12px" }}>
          <div className="brand-icon">
            <Swords size={24} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "24px" }}>Daily RPG</h1>
            <span style={{ color: "var(--jrpg-gold)" }}>Awakening of the Hero</span>
          </div>
        </div>

        <p className="eyebrow centered-text" style={{ color: "var(--jrpg-gold)" }}>
          COMMENCEMENT OF DESTINY
        </p>
        <h2 style={{ fontFamily: "'MedievalSharp', cursive", textAlign: "center", margin: "6px 0 10px", fontSize: "28px" }}>
          Select Your Hero
        </h2>
        <p className="auth-description" style={{ textAlign: "center", maxWidth: "420px", margin: "0 auto 24px" }}>
          Choose your adventurer's avatar. Once confirmed, this selection will remain permanently fixed for your journey across Daily RPG.
        </p>

        <div className="avatar-options-grid">
          <div
            className={`avatar-choice-card ${selectedGender === "male" ? "selected" : ""}`}
            onClick={() => setSelectedGender("male")}
          >
            <div className="avatar-preview-wrap">
              <AdventurerAvatar gender="male" size={140} />
            </div>
            <strong style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "17px" }}>
              ♂ Male Hero
            </strong>
            <small>Tiz Archetype • Resilient & Swift</small>
            {selectedGender === "male" && (
              <div className="choice-check-badge">
                <Check size={16} /> Selected
              </div>
            )}
          </div>

          <div
            className={`avatar-choice-card ${selectedGender === "female" ? "selected" : ""}`}
            onClick={() => setSelectedGender("female")}
          >
            <div className="avatar-preview-wrap">
              <AdventurerAvatar gender="female" size={140} />
            </div>
            <strong style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "17px" }}>
              ♀ Female Heroine
            </strong>
            <small>Agnes Archetype • Wise & Noble</small>
            {selectedGender === "female" && (
              <div className="choice-check-badge">
                <Check size={16} /> Selected
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            type="button"
            className="primary-button full-width jrpg-btn-glow"
            style={{ padding: "14px", fontSize: "15px", fontFamily: "'MedievalSharp', cursive" }}
            disabled={confirming}
            onClick={handleConfirm}
          >
            <Sparkles size={18} />
            {confirming ? "Binding Destiny..." : `Confirm & Lock as ${selectedGender === "male" ? "Male Hero" : "Female Heroine"}`}
          </button>
          <small style={{ display: "block", marginTop: "8px", color: "var(--muted)", fontSize: "11px" }}>
            🔒 This archetype cannot be changed after confirmation.
          </small>
        </div>
      </div>
    </div>
  );
}

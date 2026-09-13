import React, { useState } from "react";
import JRPGTopScreen from "../components/JRPGTopScreen";
import JRPGBottomScreen from "../components/JRPGBottomScreen";
import QuestModal from "../components/QuestModal";
import { useRPG } from "../context/RPGContext";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const { addQuest } = useRPG();

  return (
    <div className="jrpg-dual-viewport">
      {/* Top 3DS Screen: Character Stage & Job Selection */}
      <JRPGTopScreen />

      {/* 3DS Hinge Separator */}
      <div className="ds-hinge-bar">
        <div className="hinge-groove left" />
        <div className="hinge-speaker left">
          <span />
          <span />
          <span />
        </div>
        <span className="nintendo-badge">LIFE RPG • NINTENDO 3DS SYSTEM</span>
        <div className="hinge-speaker right">
          <span />
          <span />
          <span />
        </div>
        <div className="hinge-groove right" />
      </div>

      {/* Bottom 3DS Screen: Parchment Status, Ongoing Quests, and Achievements */}
      <JRPGBottomScreen onOpenNewQuest={() => setShowModal(true)} />

      {/* Modal for adding new quests */}
      {showModal && (
        <QuestModal
          onClose={() => setShowModal(false)}
          onSave={async (questData) => {
            await addQuest(questData);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

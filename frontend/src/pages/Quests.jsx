import React, { useState } from "react";
import { Plus, Search, Filter, Inbox } from "lucide-react";
import { useRPG } from "../context/RPGContext";
import PageHeader from "../components/PageHeader";
import QuestCard from "../components/QuestCard";
import QuestModal from "../components/QuestModal";

export default function Quests() {
  const { quests, completeQuest, addQuest, updateQuest, deleteQuest } = useRPG();
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);

  const categories = ["All", "Fitness", "Study", "Health", "Work", "Personal"];

  const filteredQuests = quests.filter((quest) => {
    if (statusFilter === "active" && quest.completed) return false;
    if (statusFilter === "completed" && !quest.completed) return false;

    if (categoryFilter !== "All" && quest.category !== categoryFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = quest.title?.toLowerCase().includes(q);
      const matchDesc = quest.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  return (
    <>
      <PageHeader
        eyebrow="ADVENTURER GUILD REGISTRY"
        title="Quest Board"
        description="Select tasks to train your Strength, Stamina, Agility, Intelligence, and Persona."
        action={
          <button className="primary-button" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Commission Quest
          </button>
        }
      />

      <div className="quest-controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search quest log by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-select-wrapper">
          <Filter size={16} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Disciplines" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="quest-filters">
        <button
          type="button"
          className={`filter-tab ${statusFilter === "all" ? "active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          All Quests ({quests.length})
        </button>
        <button
          type="button"
          className={`filter-tab ${statusFilter === "active" ? "active" : ""}`}
          onClick={() => setStatusFilter("active")}
        >
          Active ({quests.filter((q) => !q.completed).length})
        </button>
        <button
          type="button"
          className={`filter-tab ${statusFilter === "completed" ? "active" : ""}`}
          onClick={() => setStatusFilter("completed")}
        >
          Conquered ({quests.filter((q) => q.completed).length})
        </button>
      </div>

      {filteredQuests.length === 0 ? (
        <div className="empty-state parchment-empty-box" style={{ padding: "48px 24px" }}>
          <Inbox size={48} className="empty-icon" style={{ color: "var(--jrpg-gold)" }} />
          <h4 style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "20px" }}>No Quests Found</h4>
          <p style={{ color: "var(--muted)" }}>
            {searchQuery || categoryFilter !== "All" || statusFilter !== "all"
              ? "No quests match your current guild filter criteria."
              : "Your quest log is clear! Commission a new quest to train your attributes."}
          </p>
          <button className="primary-button" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Commission Quest
          </button>
        </div>
      ) : (
        <div className="quest-list">
          {filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onComplete={completeQuest}
              onEdit={(q) => {
                setEditingQuest(q);
                setShowModal(true);
              }}
              onDelete={deleteQuest}
            />
          ))}
        </div>
      )}

      {showModal && (
        <QuestModal
          initialQuest={editingQuest}
          onClose={() => {
            setShowModal(false);
            setEditingQuest(null);
          }}
          onSave={async (questData) => {
            if (editingQuest) {
              await updateQuest(editingQuest.id, questData);
            } else {
              await addQuest(questData);
            }
            setShowModal(false);
            setEditingQuest(null);
          }}
        />
      )}
    </>
  );
}

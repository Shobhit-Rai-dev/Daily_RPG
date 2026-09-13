import React, { createContext, useContext, useState, useEffect } from "react";
import {
  questsAPI,
  characterAPI,
  shopAPI,
  inventoryAPI,
  achievementsAPI,
  DEFAULT_CHARACTER
} from "../services/api";

const RPGContext = createContext(null);

export function RPGProvider({ children }) {
  const [character, setCharacter] = useState(DEFAULT_CHARACTER);
  const [quests, setQuests] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [levelUpData, setLevelUpData] = useState(null);
  const [toast, setToast] = useState(null);
  const [lastStatBoost, setLastStatBoost] = useState(null);

  function triggerToast(message, type = "success") {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  }

  async function loadInitialData() {
    try {
      setLoading(true);
      const [charData, questList, achList, items, userInv] = await Promise.all([
        characterAPI.get(),
        questsAPI.getAll(),
        achievementsAPI.getAll(),
        shopAPI.getItems(),
        inventoryAPI.get()
      ]);

      if (charData) setCharacter(charData);
      if (questList) setQuests(questList);
      if (achList) setAchievements(achList);
      if (items) setShopItems(items);
      if (userInv) setInventory(userInv);
    } catch (err) {
      console.error("Failed to load RPG data", err);
      triggerToast(err.message || "Failed to reach the realm servers", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  // Compute unlocked classes based on completed quest types
  const completedFitness = quests.filter((q) => q.completed && q.category === "Fitness").length;
  const completedStudy = quests.filter((q) => q.completed && q.category === "Study").length;
  const completedHealth = quests.filter((q) => q.completed && q.category === "Health").length;
  const completedWork = quests.filter((q) => q.completed && q.category === "Work").length;

  const classStatus = {
    "Novice Adventurer": {
      unlocked: true,
      condition: "Starting class"
    },
    "Muscle Warrior": {
      unlocked: completedFitness >= 2 || (character.stats?.str || 10) >= 10.50,
      progress: `${Math.min(2, completedFitness)}/2 Fitness Quests`,
      condition: "Complete 2 Fitness quests"
    },
    "Scholar": {
      unlocked: completedStudy >= 2 || (character.stats?.intelligence || 10) >= 10.50,
      progress: `${Math.min(2, completedStudy)}/2 Study Quests`,
      condition: "Complete 2 Study quests"
    },
    "Iron Monk": {
      unlocked: completedHealth >= 2 || (character.stats?.stamina || 10) >= 10.50,
      progress: `${Math.min(2, completedHealth)}/2 Health Quests`,
      condition: "Complete 2 Health quests"
    },
    "Grand Diplomat": {
      unlocked: completedWork >= 2 || (character.stats?.persona || 10) >= 10.50,
      progress: `${Math.min(2, completedWork)}/2 Work Quests`,
      condition: "Complete 2 Work quests"
    }
  };

  async function completeQuest(id) {
    try {
      const result = await questsAPI.complete(id);
      if (result) {
        if (result.character) setCharacter(result.character);
        setQuests((current) =>
          current.map((q) => (q.id === id ? { ...q, completed: true } : q))
        );

        if (result.statBoost) {
          setLastStatBoost(result.statBoost);
        }

        const statLabel = (result.statBoost?.stat || "str").toUpperCase();
        const statAmount = result.statBoost?.amount || 0.15;
        const multiplierText = result.multiplierUsed > 1 ? ` (${result.multiplierUsed}x XP Potion applied!)` : "";

        triggerToast(
          `Quest Conquered! +${result.xpGained} XP${multiplierText}, +${result.goldGained} Gold, +${statAmount} ${statLabel} ⚔️`,
          "reward"
        );

        if (result.leveledUp) {
          setLevelUpData({
            newLevel: result.character.level,
            characterName: result.character.name
          });
        }
      }
    } catch (err) {
      triggerToast(err.message || "Failed to complete quest", "error");
    }
  }

  async function addQuest(questData) {
    try {
      const created = await questsAPI.create(questData);
      setQuests((current) => [created, ...current]);
      triggerToast(`New Quest Commissioned: "${questData.title}"!`, "success");
      return created;
    } catch (err) {
      triggerToast(err.message || "Failed to add quest", "error");
      throw err;
    }
  }

  async function updateQuest(id, questData) {
    try {
      const updated = await questsAPI.update(id, questData);
      setQuests((current) =>
        current.map((q) => (q.id === id ? { ...q, ...updated } : q))
      );
      triggerToast("Quest updated in registry!", "success");
      return updated;
    } catch (err) {
      triggerToast(err.message || "Failed to update quest", "error");
      throw err;
    }
  }

  async function deleteQuest(id) {
    try {
      await questsAPI.delete(id);
      setQuests((current) => current.filter((q) => q.id !== id));
      triggerToast("Quest removed from registry", "info");
    } catch (err) {
      triggerToast(err.message || "Failed to delete quest", "error");
    }
  }

  async function setFixedGender(chosenGender) {
    try {
      const updated = await characterAPI.update({ gender: chosenGender, genderChosen: true });
      setCharacter(updated);
      triggerToast(`Hero Archetype locked: ${chosenGender === "female" ? "Female Heroine" : "Male Hero"}!`, "reward");
    } catch (err) {
      triggerToast(err.message || "Failed to lock in your archetype", "error");
    }
  }

  async function setActiveJob(jobName) {
    const status = classStatus[jobName];
    if (!status?.unlocked) {
      triggerToast(`Class Locked! Requirement: ${status?.condition}`, "error");
      return;
    }

    try {
      const updated = await characterAPI.update({ activeJob: jobName });
      setCharacter(updated);
      triggerToast(`Assumed Class: ${jobName}!`, "info");
    } catch (err) {
      triggerToast(err.message || "Failed to change class", "error");
    }
  }

  async function buyShopItem(itemId) {
    try {
      const res = await shopAPI.buyItem(itemId);
      if (res) {
        setCharacter(res.character);
        setInventory(res.inventory);

        if (res.item.multiplier) {
          triggerToast(
            `Drank ${res.item.name}! Active Buff: ${res.item.multiplier}x XP on your next completed quest! 🧪`,
            "reward"
          );
        } else {
          triggerToast(`Acquired ${res.item.name}! Added to Backpack.`, "reward");
        }
      }
    } catch (err) {
      triggerToast(err.message || "Purchase failed", "error");
    }
  }

  function dismissLevelUp() {
    setLevelUpData(null);
  }

  return (
    <RPGContext.Provider
      value={{
        character,
        quests,
        achievements,
        shopItems,
        inventory,
        loading,
        levelUpData,
        toast,
        lastStatBoost,
        classStatus,
        completeQuest,
        addQuest,
        updateQuest,
        deleteQuest,
        setFixedGender,
        setActiveJob,
        buyShopItem,
        dismissLevelUp,
        triggerToast,
        refreshData: loadInitialData
      }}
    >
      {children}
    </RPGContext.Provider>
  );
}

export function useRPG() {
  const context = useContext(RPGContext);
  if (!context) {
    throw new Error("useRPG must be used within an RPGProvider");
  }
  return context;
}

const { ACHIEVEMENT_DEFS } = require("./gameData");

// Ports the exact leveling math from the frontend's localStorage mock
// (src/services/api.js -> questsAPI.complete) so behavior doesn't change
// now that a real backend is doing the work.
function applyQuestCompletion(user, quest) {
  const multiplier = Number(user.activeXpMultiplier || 1);
  const finalXpGain = quest.xp * multiplier;

  user.xp += finalXpGain;
  user.gold += quest.gold;

  let leveledUp = false;
  while (user.xp >= user.nextLevelXp) {
    user.level += 1;
    user.xp -= user.nextLevelXp;
    user.nextLevelXp = user.level * 100;
    user.maxHp += 25;
    user.maxMp += 8;
    user.hp = user.maxHp;
    user.mp = user.maxMp;
    leveledUp = true;
  }

  const statKey = quest.targetStat || "str";
  const gainAmount = Number(quest.statGain || 0.15);
  const currentVal = Number(user.stats[statKey] ?? 10.0);
  const newVal = Math.round((currentVal + gainAmount) * 100) / 100;
  user.stats[statKey] = newVal;

  // Consumed on use, same as the frontend mock.
  user.activeXpMultiplier = 1;

  return {
    xpGained: finalXpGain,
    multiplierUsed: multiplier,
    goldGained: quest.gold,
    statBoost: { stat: statKey, amount: gainAmount, newVal },
    leveledUp
  };
}

// Updates the daily streak based on the last day the user was active.
// Same-day: unchanged. Exactly one day later: +1. Any bigger gap (or first
// ever visit): reset to 1. Dates are compared in UTC calendar days.
function updateStreak(user) {
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  if (!user.lastActiveDate) {
    user.streak = 1;
    user.lastActiveDate = now;
    return;
  }

  const last = user.lastActiveDate;
  const lastDay = Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate());
  const dayDiff = Math.round((today - lastDay) / 86400000);

  if (dayDiff === 0) {
    // Already counted today.
  } else if (dayDiff === 1) {
    user.streak = (user.streak || 1) + 1;
    user.lastActiveDate = now;
  } else {
    user.streak = 1;
    user.lastActiveDate = now;
  }
}

// Computes each achievement's unlocked status from live user/quest data —
// mirrors the classStatus logic in the frontend's RPGContext.
function computeAchievements(user, quests) {
  const completedFitness = quests.filter((q) => q.completed && q.category === "Fitness").length;
  const completedStudy = quests.filter((q) => q.completed && q.category === "Study").length;
  const completedTierS = quests.some((q) => q.completed && q.tier === "Tier S");

  const unlockedMap = {
    "ach-1": true,
    "ach-2": (user.streak || 1) >= 3,
    "ach-3": completedFitness >= 2 || (user.stats.str || 10) >= 10.5,
    "ach-4": completedStudy >= 2 || (user.stats.intelligence || 10) >= 10.5,
    "ach-5": completedTierS
  };

  return ACHIEVEMENT_DEFS.map((def) => ({ ...def, unlocked: !!unlockedMap[def.id] }));
}

module.exports = { applyQuestCompletion, updateStreak, computeAchievements };

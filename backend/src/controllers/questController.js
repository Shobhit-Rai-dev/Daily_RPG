const Quest = require("../models/Quest");
const { TIER_REWARDS, VALID_TIERS, VALID_STATS, VALID_CATEGORIES } = require("../utils/gameData");
const { applyQuestCompletion } = require("../utils/gameLogic");

async function getAll(req, res, next) {
  try {
    const quests = await Quest.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(quests.map((q) => q.toClientQuest()));
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { title, description, category, tier, targetStat } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Quest title is required" });
    }

    const resolvedTier = VALID_TIERS.includes(tier) ? tier : "Tier D";
    const resolvedStat = VALID_STATS.includes(targetStat) ? targetStat : "str";
    const resolvedCategory = VALID_CATEGORIES.includes(category) ? category : "Personal";
    const tierInfo = TIER_REWARDS[resolvedTier];

    // Rewards are always derived server-side from the tier, matching
    // QuestModal's "locked to tier" behavior — a client can't inflate them.
    const quest = await Quest.create({
      user: req.userId,
      title: title.trim(),
      description: (description || "").trim(),
      category: resolvedCategory,
      tier: resolvedTier,
      targetStat: resolvedStat,
      statGain: tierInfo.defaultGain,
      xp: tierInfo.xp,
      gold: tierInfo.gold
    });

    res.status(201).json(quest.toClientQuest());
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const quest = await Quest.findOne({ _id: req.params.id, user: req.userId });
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    if (quest.completed) {
      return res.status(400).json({ message: "Completed quests can't be edited" });
    }

    const { title, description, category, tier, targetStat } = req.body;

    if (title !== undefined) quest.title = title.trim();
    if (description !== undefined) quest.description = description.trim();
    if (category !== undefined && VALID_CATEGORIES.includes(category)) quest.category = category;
    if (targetStat !== undefined && VALID_STATS.includes(targetStat)) quest.targetStat = targetStat;

    if (tier !== undefined && VALID_TIERS.includes(tier)) {
      quest.tier = tier;
      const tierInfo = TIER_REWARDS[tier];
      quest.statGain = tierInfo.defaultGain;
      quest.xp = tierInfo.xp;
      quest.gold = tierInfo.gold;
    }

    await quest.save();
    res.json(quest.toClientQuest());
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const quest = await Quest.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    res.json({ message: "Quest removed", id: req.params.id });
  } catch (err) {
    next(err);
  }
}

async function complete(req, res, next) {
  try {
    const quest = await Quest.findOne({ _id: req.params.id, user: req.userId });
    if (!quest || quest.completed) {
      return res.status(400).json({ message: "Quest already completed or not found" });
    }

    const user = req.user;
    const result = applyQuestCompletion(user, quest);
    quest.completed = true;

    await Promise.all([user.save(), quest.save()]);

    res.json({
      quest: quest.toClientQuest(),
      character: user.toCharacter(),
      ...result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, create, update, remove, complete };

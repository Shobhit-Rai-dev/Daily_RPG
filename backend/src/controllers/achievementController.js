const Quest = require("../models/Quest");
const { computeAchievements } = require("../utils/gameLogic");

async function getAll(req, res, next) {
  try {
    const quests = await Quest.find({ user: req.userId });
    res.json(computeAchievements(req.user, quests));
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll };

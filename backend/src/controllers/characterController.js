const { updateStreak } = require("../utils/gameLogic");

// Fields the frontend is allowed to write via characterAPI.update(...)
// (see RPGContext.setFixedGender / setActiveJob). Whitelisted so a client
// can't smuggle in xp/gold/level directly.
const UPDATABLE_FIELDS = ["gender", "genderChosen", "activeJob", "jobLevel", "jp"];

async function getCharacter(req, res, next) {
  try {
    const user = req.user;
    updateStreak(user);
    await user.save();
    res.json(user.toCharacter());
  } catch (err) {
    next(err);
  }
}

async function updateCharacter(req, res, next) {
  try {
    const user = req.user;

    if (req.body.gender !== undefined && !["male", "female"].includes(req.body.gender)) {
      return res.status(400).json({ message: "gender must be 'male' or 'female'" });
    }

    for (const field of UPDATABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    }

    await user.save();
    res.json(user.toCharacter());
  } catch (err) {
    next(err);
  }
}

module.exports = { getCharacter, updateCharacter };

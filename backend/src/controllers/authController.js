const User = require("../models/User");
const Quest = require("../models/Quest");
const generateToken = require("../utils/generateToken");
const { DEFAULT_QUESTS } = require("../utils/gameData");
const { updateStreak } = require("../utils/gameLogic");

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ message: "Adventurer name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters long" });
    }

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "That email is already registered" });
    }

    const user = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password
    });
    updateStreak(user);
    await user.save();

    // Seed a starter quest log so a fresh hero isn't staring at an empty screen.
    const seedQuests = DEFAULT_QUESTS.map((q) => ({ ...q, user: user._id }));
    await Quest.insertMany(seedQuests);

    const token = generateToken(user._id.toString());
    res.status(201).json({ token, user: user.toPublicUser() });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const matches = await user.comparePassword(password);
    if (!matches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    updateStreak(user);
    await user.save();

    const token = generateToken(user._id.toString());
    res.json({ token, user: user.toPublicUser() });
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res) {
  res.json({ user: req.user.toPublicUser() });
}

module.exports = { register, login, getMe };

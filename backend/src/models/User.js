const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { DEFAULT_CHARACTER_FIELDS } = require("../utils/gameData");

const StatsSchema = new mongoose.Schema(
  {
    str: { type: Number, default: 10.0 },
    stamina: { type: Number, default: 10.0 },
    agility: { type: Number, default: 10.0 },
    intelligence: { type: Number, default: 10.0 },
    persona: { type: Number, default: 10.0 }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },

    // --- Character sheet (1:1 with the user, embedded for simplicity) ---
    gender: { type: String, enum: ["male", "female", null], default: null },
    genderChosen: { type: Boolean, default: false },
    level: { type: Number, default: DEFAULT_CHARACTER_FIELDS.level },
    xp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.xp },
    nextLevelXp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.nextLevelXp },
    gold: { type: Number, default: DEFAULT_CHARACTER_FIELDS.gold },
    streak: { type: Number, default: DEFAULT_CHARACTER_FIELDS.streak },
    hp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.hp },
    maxHp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.maxHp },
    mp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.mp },
    maxMp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.maxMp },
    activeJob: { type: String, default: DEFAULT_CHARACTER_FIELDS.activeJob },
    jobLevel: { type: Number, default: DEFAULT_CHARACTER_FIELDS.jobLevel },
    jp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.jp },
    nextJp: { type: Number, default: DEFAULT_CHARACTER_FIELDS.nextJp },
    activeXpMultiplier: { type: Number, default: DEFAULT_CHARACTER_FIELDS.activeXpMultiplier },
    stats: { type: StatsSchema, default: () => ({}) },

    // Used to compute the daily streak without a separate collection.
    lastActiveDate: { type: Date, default: null }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Shape returned by /auth endpoints — never includes the password hash.
UserSchema.methods.toPublicUser = function toPublicUser() {
  return {
    id: this._id.toString(),
    username: this.username,
    email: this.email
  };
};

// Shape returned by /character endpoints — matches the frontend's
// DEFAULT_CHARACTER / RPGContext expectations exactly.
UserSchema.methods.toCharacter = function toCharacter() {
  return {
    name: this.username,
    gender: this.gender,
    genderChosen: this.genderChosen,
    level: this.level,
    xp: this.xp,
    nextLevelXp: this.nextLevelXp,
    gold: this.gold,
    streak: this.streak,
    hp: this.hp,
    maxHp: this.maxHp,
    mp: this.mp,
    maxMp: this.maxMp,
    activeJob: this.activeJob,
    jobLevel: this.jobLevel,
    jp: this.jp,
    nextJp: this.nextJp,
    activeXpMultiplier: this.activeXpMultiplier,
    stats: {
      str: this.stats.str,
      stamina: this.stats.stamina,
      agility: this.stats.agility,
      intelligence: this.stats.intelligence,
      persona: this.stats.persona
    }
  };
};

module.exports = mongoose.model("User", UserSchema);

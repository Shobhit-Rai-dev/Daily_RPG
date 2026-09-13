const mongoose = require("mongoose");
const { VALID_TIERS, VALID_STATS, VALID_CATEGORIES } = require("../utils/gameData");

const QuestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, enum: VALID_CATEGORIES, default: "Personal" },
    tier: { type: String, enum: VALID_TIERS, default: "Tier D" },
    targetStat: { type: String, enum: VALID_STATS, default: "str" },
    statGain: { type: Number, required: true },
    xp: { type: Number, required: true },
    gold: { type: Number, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

// Shape returned to the frontend — RPGContext keys quests off `id`, not `_id`.
QuestSchema.methods.toClientQuest = function toClientQuest() {
  return {
    id: this._id.toString(),
    title: this.title,
    description: this.description,
    category: this.category,
    tier: this.tier,
    targetStat: this.targetStat,
    statGain: this.statGain,
    xp: this.xp,
    gold: this.gold,
    completed: this.completed,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model("Quest", QuestSchema);

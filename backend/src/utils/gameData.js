// Game constants — kept in sync with the frontend's src/services/api.js so
// quest rewards, tiers, and shop items line up exactly on both sides.

const DEFAULT_STATS = {
  str: 10.0,
  stamina: 10.0,
  agility: 10.0,
  intelligence: 10.0,
  persona: 10.0
};

const DEFAULT_CHARACTER_FIELDS = {
  gender: null,
  genderChosen: false,
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  gold: 1500,
  streak: 1,
  hp: 350,
  maxHp: 350,
  mp: 50,
  maxMp: 50,
  activeJob: "Novice Adventurer",
  jobLevel: 1,
  jp: 0,
  nextJp: 30,
  activeXpMultiplier: 1,
  stats: { ...DEFAULT_STATS }
};

const TIER_REWARDS = {
  "Tier F": { xp: 20, gold: 10, defaultGain: 0.05, label: "Novice" },
  "Tier E": { xp: 40, gold: 20, defaultGain: 0.1, label: "Basic" },
  "Tier D": { xp: 75, gold: 35, defaultGain: 0.15, label: "Intermediate" },
  "Tier C": { xp: 120, gold: 60, defaultGain: 0.25, label: "Skilled" },
  "Tier B": { xp: 200, gold: 100, defaultGain: 0.35, label: "Expert" },
  "Tier A": { xp: 350, gold: 180, defaultGain: 0.5, label: "Master" },
  "Tier S": { xp: 600, gold: 350, defaultGain: 1.0, label: "Mythic" }
};

const VALID_TIERS = Object.keys(TIER_REWARDS);
const VALID_STATS = ["str", "stamina", "agility", "intelligence", "persona"];
const VALID_CATEGORIES = ["Fitness", "Study", "Health", "Work", "Personal"];

// Starter quest log seeded for every newly-registered hero.
const DEFAULT_QUESTS = [
  {
    title: "Morning Hydration & Posture",
    description: "Drink 500ml water and complete 5 minutes of posture reset.",
    tier: "Tier F",
    category: "Health",
    targetStat: "stamina"
  },
  {
    title: "15-Minute Agility Footwork & Sprints",
    description: "Rapid high-knees and jump-rope interval conditioning.",
    tier: "Tier E",
    category: "Fitness",
    targetStat: "agility"
  },
  {
    title: "Master Binary Search & Trees",
    description: "Implement and solve 2 tree traversal patterns on LeetCode.",
    tier: "Tier D",
    category: "Study",
    targetStat: "intelligence"
  },
  {
    title: "Upper Body Calisthenics Routine",
    description: "Complete 5 sets of pull-ups and push-ups to unlock Muscle Warrior.",
    tier: "Tier C",
    category: "Fitness",
    targetStat: "str"
  },
  {
    title: "Daily RPG Architecture & Teammate Sync",
    description: "Review Express backend endpoints with teammate and test contract.",
    tier: "Tier B",
    category: "Work",
    targetStat: "persona"
  }
].map((q) => ({
  ...q,
  xp: TIER_REWARDS[q.tier].xp,
  gold: TIER_REWARDS[q.tier].gold,
  statGain: TIER_REWARDS[q.tier].defaultGain
}));

// Shop is static catalog data, not per-user DB rows.
const SHOP_ITEMS = [
  {
    id: "item-potion-green",
    name: "Verdant Focus Potion (Green Potion)",
    price: 1000,
    category: "Potion",
    color: "green",
    multiplier: 2,
    description: "A shimmering emerald elixir. Grants 2x Experience Points (XP) for your next completed quest!",
    icon: "Sparkles"
  },
  {
    id: "item-potion-purple",
    name: "Abyssal Wisdom Potion (Purple Potion)",
    price: 5000,
    category: "Potion",
    color: "purple",
    multiplier: 20,
    description: "An ancient royal purple elixir pulsing with arcane energy. Grants a monumental 20x Experience Points (XP) for your next completed quest!",
    icon: "Sparkles"
  },
  {
    id: "item-1",
    name: "Knight's Crest Theme",
    price: 250,
    category: "Theme",
    description: "Gilded heraldic borders for your adventurer dashboard.",
    icon: "Shield"
  },
  {
    id: "item-2",
    name: "Golden Master Brooch",
    price: 500,
    category: "Badge",
    description: "Prestige insignia commemorating unbreakable habit consistency.",
    icon: "Coins"
  },
  {
    id: "item-3",
    name: "Bravely Buster Blade",
    price: 2500,
    category: "Weapon",
    description: "Legendary broadsword displayed beside your character sheet.",
    icon: "Swords"
  }
];

// Achievement definitions. "unlocked" is computed per-user at request time
// in utils/achievements.js — nothing here is user-specific.
const ACHIEVEMENT_DEFS = [
  { id: "ach-1", title: "Awakened Hero", desc: "Embarked on the journey at Level 1", tier: "Tier F" },
  { id: "ach-2", title: "Discipline of Fire", desc: "Maintained a daily habit streak", tier: "Tier D" },
  { id: "ach-3", title: "Warrior's Call", desc: "Earned the Muscle Warrior class", tier: "Tier C" },
  { id: "ach-4", title: "Scholar's Mastery", desc: "Earned the Scholar class", tier: "Tier B" },
  { id: "ach-5", title: "Grand Champion", desc: "Conquered a Tier S Mythic quest", tier: "Tier S" }
];

module.exports = {
  DEFAULT_STATS,
  DEFAULT_CHARACTER_FIELDS,
  TIER_REWARDS,
  VALID_TIERS,
  VALID_STATS,
  VALID_CATEGORIES,
  DEFAULT_QUESTS,
  SHOP_ITEMS,
  ACHIEVEMENT_DEFS
};

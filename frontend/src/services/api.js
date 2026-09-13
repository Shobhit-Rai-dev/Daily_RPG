// Daily RPG API Service Layer
// Talks to the real Express backend at API_BASE_URL. No more localStorage
// mock/fallback database — every call hits the server, and failures throw
// real errors so the UI can show them instead of silently faking data.

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Kept here (not fetched from the server) because the QuestModal needs it
// synchronously while the user is picking a tier, before anything is saved.
// The backend independently enforces the same table when a quest is
// created/updated/completed, so a client can't spoof better rewards.
export const TIER_REWARDS = {
  "Tier F": { xp: 20, gold: 10, defaultGain: 0.05, label: "Novice" },
  "Tier E": { xp: 40, gold: 20, defaultGain: 0.10, label: "Basic" },
  "Tier D": { xp: 75, gold: 35, defaultGain: 0.15, label: "Intermediate" },
  "Tier C": { xp: 120, gold: 60, defaultGain: 0.25, label: "Skilled" },
  "Tier B": { xp: 200, gold: 100, defaultGain: 0.35, label: "Expert" },
  "Tier A": { xp: 350, gold: 180, defaultGain: 0.50, label: "Master" },
  "Tier S": { xp: 600, gold: 350, defaultGain: 1.00, label: "Mythic" }
};

// Used as initial React state before the real character loads from the
// server, so the dashboard has something to render for one frame.
export const DEFAULT_CHARACTER = {
  name: "Adventurer",
  gender: null,
  genderChosen: false,
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  gold: 0,
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
  stats: {
    str: 10.00,
    stamina: 10.00,
    agility: 10.00,
    intelligence: 10.00,
    persona: 10.00
  }
};

const TOKEN_KEY = "dailyrpg_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  // DELETE endpoints etc. may return an empty body.
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// --- AUTH API ---
export const authAPI = {
  async register(username, email, password) {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password })
    });
    if (data.token) setToken(data.token);
    return data;
  },

  async login(email, password) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    if (data.token) setToken(data.token);
    return data;
  },

  async getMe() {
    return request("/auth/me");
  },

  logout() {
    setToken(null);
  }
};

// --- QUESTS API ---
export const questsAPI = {
  async getAll() {
    return request("/quests");
  },

  async create(questData) {
    return request("/quests", {
      method: "POST",
      body: JSON.stringify(questData)
    });
  },

  async update(id, questData) {
    return request(`/quests/${id}`, {
      method: "PUT",
      body: JSON.stringify(questData)
    });
  },

  async delete(id) {
    return request(`/quests/${id}`, {
      method: "DELETE"
    });
  },

  async complete(id) {
    return request(`/quests/${id}/complete`, {
      method: "POST"
    });
  }
};

// --- CHARACTER API ---
export const characterAPI = {
  async get() {
    return request("/character");
  },

  async update(characterData) {
    return request("/character", {
      method: "PUT",
      body: JSON.stringify(characterData)
    });
  }
};

// --- ACHIEVEMENTS API ---
export const achievementsAPI = {
  async getAll() {
    return request("/achievements");
  }
};

// --- SHOP & INVENTORY API ---
export const shopAPI = {
  async getItems() {
    return request("/shop");
  },

  async buyItem(itemId) {
    return request(`/shop/${itemId}/buy`, {
      method: "POST"
    });
  }
};

export const inventoryAPI = {
  async get() {
    return request("/inventory");
  }
};

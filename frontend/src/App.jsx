import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RPGProvider, useRPG } from "./context/RPGContext";
import TopNavbar from "./components/TopNavbar";
import BottomNavbar from "./components/BottomNavbar";
import Toast from "./components/Toast";
import LevelUpModal from "./components/LevelUpModal";
import CharacterSelectionModal from "./components/CharacterSelectionModal";

// Pages
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { levelUpData, dismissLevelUp, toast, character } = useRPG();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p style={{ fontFamily: "'MedievalSharp', cursive", fontSize: "18px" }}>
          Entering the Daily RPG realm...
        </p>
      </div>
    );
  }

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  // If user is already authenticated and visits /login or /register, redirect to dashboard
  if (isAuthenticated && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  // First time visitors or unauthenticated users are transported to login page
  if (!isAuthenticated && !isAuthRoute) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthRoute) {
    return (
      <div className="auth-wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="daily-rpg-shell">
      {/* Upper Navigation Bar: Logo on left, Mini-profile & Logout on right */}
      <TopNavbar />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Bottom Navigation Dock */}
      <BottomNavbar />

      {/* One-time Character Archetype Selection (Male or Female) after login */}
      {isAuthenticated && !character?.genderChosen && (
        <CharacterSelectionModal />
      )}

      {/* Level Up Celebration Modal */}
      {levelUpData && (
        <LevelUpModal
          newLevel={levelUpData.newLevel}
          characterName={levelUpData.characterName}
          onClose={dismissLevelUp}
        />
      )}

      {/* Global Action Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RPGProvider>
        <AppLayout />
      </RPGProvider>
    </AuthProvider>
  );
}
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Swords,
  LayoutDashboard,
  ScrollText,
  ShoppingBag,
  UserRound,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRPG } from "../context/RPGContext";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const { character } = useRPG();

  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/quests", label: "Quest Board", icon: ScrollText },
    { to: "/shop", label: "Reward Shop", icon: ShoppingBag },
    { to: "/profile", label: "Character", icon: UserRound }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Swords size={24} />
        </div>
        <div>
          <h1>Life RPG</h1>
          <span>Level up your life</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link ${location.pathname === to ? "active" : ""}`}
          >
            <Icon size={19} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="mini-profile">
          <div className="avatar">{character.name ? character.name[0].toUpperCase() : "A"}</div>
          <div>
            <strong>{character.name || "Adventurer"}</strong>
            <span>Lvl {character.level} Hero</span>
          </div>
        </div>
        <button className="logout-button" onClick={logout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

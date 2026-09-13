import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ScrollText, ShoppingBag, UserRound } from "lucide-react";
import { useRPG } from "../context/RPGContext";

export default function BottomNavbar() {
  const location = useLocation();
  const { quests } = useRPG();

  const activeQuestsCount = quests.filter((q) => !q.completed).length;

  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/quests", label: "Quest Board", icon: ScrollText, badge: activeQuestsCount },
    { to: "/shop", label: "Reward Shop", icon: ShoppingBag },
    { to: "/profile", label: "Character", icon: UserRound }
  ];

  return (
    <nav className="bottom-navbar" aria-label="Main Navigation">
      <div className="bottom-navbar-container">
        {links.map(({ to, label, icon: Icon, badge }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`bottom-nav-item ${isActive ? "active" : ""}`}
            >
              <div className="nav-icon-wrap">
                <Icon size={20} />
                {badge > 0 && <span className="nav-badge">{badge}</span>}
              </div>
              <span className="bottom-nav-label">{label}</span>
              {isActive && <div className="active-dot-indicator" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

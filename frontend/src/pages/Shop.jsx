import React from "react";
import { Coins, Sparkles, Shield, Swords, Check, Zap } from "lucide-react";
import { useRPG } from "../context/RPGContext";
import PageHeader from "../components/PageHeader";

export default function Shop() {
  const { character, shopItems, buyShopItem } = useRPG();

  const activeMultiplier = Number(character.activeXpMultiplier || 1);

  function renderItemIcon(item) {
    if (item.color === "green") {
      return (
        <div className="potion-flask green-flask" title="Green 2x XP Potion">
          <span className="flask-glow">🧪</span>
        </div>
      );
    }
    if (item.color === "purple") {
      return (
        <div className="potion-flask purple-flask" title="Purple 20x XP Potion">
          <span className="flask-glow">🔮</span>
        </div>
      );
    }
    switch (item.icon) {
      case "Shield":
        return <Shield size={32} />;
      case "Swords":
        return <Swords size={32} />;
      case "Coins":
        return <Coins size={32} />;
      default:
        return <Sparkles size={32} />;
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="ROYAL TREASURY & ALCHEMY"
        title="Reward Shop"
        description="Exchange your gold for mystical XP multiplying elixirs, heraldic themes, and legendary gear."
      />

      {/* Wallet Balance Card & Active Buff Banner */}
      <div className="wallet-card-container">
        <div className="wallet-card">
          <Coins size={32} className="wallet-icon" />
          <div>
            <span>Your Treasury Balance</span>
            <strong>{character.gold} Coins</strong>
          </div>
        </div>

        {activeMultiplier > 1 && (
          <div className={`active-buff-banner ${activeMultiplier === 20 ? "purple-buff" : "green-buff"}`}>
            <Zap size={24} />
            <div>
              <strong>Active Elixir Buff: {activeMultiplier}x XP!</strong>
              <p>Your next completed quest will award {activeMultiplier}x experience points.</p>
            </div>
          </div>
        )}
      </div>

      <div className="shop-grid">
        {shopItems.map((item) => {
          const canAfford = character.gold >= item.price;
          const isPotion = item.category === "Potion";
          const isBuffActive = isPotion && activeMultiplier === item.multiplier;

          return (
            <div
              className={`shop-item ${item.color ? `potion-card-${item.color}` : ""}`}
              key={item.id || item.name}
            >
              <div className="shop-item-top">
                <div className="shop-item-icon">{renderItemIcon(item)}</div>
                <span className={`item-category-pill ${item.color ? `pill-${item.color}` : ""}`}>
                  {item.category}
                </span>
              </div>

              <h3>{item.name}</h3>
              <p>{item.description}</p>

              {item.multiplier && (
                <div className="potion-multiplier-badge">
                  <Zap size={14} /> Multiplies next quest XP by <strong>{item.multiplier}x</strong>
                </div>
              )}

              <div className="shop-item-footer">
                <span className="price-tag">
                  <Coins size={16} /> {item.price.toLocaleString()} Coins
                </span>

                {isBuffActive ? (
                  <button className="secondary-button buff-active-btn" disabled>
                    <Check size={16} /> Buff Active
                  </button>
                ) : (
                  <button
                    className={`primary-button buy-button ${!canAfford ? "disabled" : ""}`}
                    disabled={!canAfford}
                    onClick={() => buyShopItem(item.id)}
                  >
                    {canAfford ? "Drink / Purchase" : "Insufficient Coins"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

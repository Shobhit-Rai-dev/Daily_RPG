import React from "react";

export default function AdventurerAvatar({ gender = "male", size = 200, className = "" }) {
  const isMale = gender === "male";

  return (
    <div className={`jrpg-avatar-wrapper ${className}`} style={{ width: size, height: size }}>
      {/* Starry Constellation Ring (from Bravely Default) */}
      <div className="constellation-ring">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="constellation-dot"
            style={{
              transform: `rotate(${i * 20}deg) translate(${size * 0.44}px) rotate(-${i * 20}deg)`
            }}
          />
        ))}
      </div>

      {/* Floating Star Gleams */}
      <div className="star-sparkle star-1">✦</div>
      <div className="star-sparkle star-2">✧</div>
      <div className="star-sparkle star-3">✦</div>

      {/* Chibi Vector Character */}
      <svg
        viewBox="0 0 160 180"
        className="jrpg-character-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="skinGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#ffeedd" />
            <stop offset="85%" stopColor="#f5d0b5" />
            <stop offset="100%" stopColor="#e4b595" />
          </radialGradient>
          <linearGradient id="hairMale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#968574" />
            <stop offset="60%" stopColor="#6e5d4d" />
            <stop offset="100%" stopColor="#483a2d" />
          </linearGradient>
          <linearGradient id="hairFemale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b48358" />
            <stop offset="60%" stopColor="#8d5b35" />
            <stop offset="100%" stopColor="#5c381c" />
          </linearGradient>
          <linearGradient id="cloakMale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d332a" />
            <stop offset="100%" stopColor="#251f19" />
          </linearGradient>
          <linearGradient id="cloakFemale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a2a22" />
            <stop offset="100%" stopColor="#45140f" />
          </linearGradient>
          <filter id="chibiDropShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#1a110a" floodOpacity="0.4" />
          </filter>
        </defs>

        <g filter="url(#chibiDropShadow)">
          {/* Shadow at feet */}
          <ellipse cx="80" cy="172" rx="38" ry="7" fill="#2b1f14" opacity="0.35" />

          {/* BACK HAIR / CLOAK */}
          {isMale ? (
            /* Male Cloak */
            <path
              d="M 52 95 Q 40 135 48 165 Q 80 172 112 165 Q 120 135 108 95 Z"
              fill="url(#cloakMale)"
            />
          ) : (
            /* Female Long Flowing Hair */
            <g>
              <path
                d="M 44 65 Q 26 115 36 158 Q 50 165 60 145 Q 52 105 60 70 Z"
                fill="url(#hairFemale)"
              />
              <path
                d="M 116 65 Q 134 115 124 158 Q 110 165 100 145 Q 108 105 100 70 Z"
                fill="url(#hairFemale)"
              />
              <path
                d="M 54 95 Q 42 135 50 166 Q 80 174 110 166 Q 118 135 106 95 Z"
                fill="url(#cloakFemale)"
              />
            </g>
          )}

          {/* BODY / TUNIC */}
          <path
            d="M 58 98 Q 80 92 102 98 L 105 150 Q 80 156 55 150 Z"
            fill={isMale ? "#e6decb" : "#f0ebd8"}
          />
          {/* Vest / Armor Detail */}
          <path
            d="M 64 98 L 74 146 L 86 146 L 96 98 Q 80 95 64 98 Z"
            fill={isMale ? "#5a4533" : "#8d3429"}
          />
          {/* Belt & Buckle */}
          <rect x="62" y="132" width="36" height="7" rx="2" fill="#3b2b1e" />
          <rect x="76" y="130" width="8" height="11" rx="1.5" fill="#d4af37" stroke="#8a6c1e" strokeWidth="1" />

          {/* NECK / COLLAR */}
          <rect x="72" y="78" width="16" height="14" rx="3" fill="url(#skinGrad)" />
          <path
            d="M 60 88 Q 80 100 100 88 L 102 96 Q 80 108 58 96 Z"
            fill={isMale ? "#2a221b" : "#5a1b14"}
          />

          {/* CHIBI HEAD */}
          <path
            d="M 46 54 C 46 26 114 26 114 54 C 114 78 98 84 80 84 C 62 84 46 78 46 54 Z"
            fill="url(#skinGrad)"
          />

          {/* BLUSH CHEEKS */}
          <ellipse cx="58" cy="62" rx="6" ry="3.5" fill="#e88574" opacity="0.4" />
          <ellipse cx="102" cy="62" rx="6" ry="3.5" fill="#e88574" opacity="0.4" />

          {/* EYES (Bravely Default Soft Stylized) */}
          <ellipse cx="64" cy="54" rx="4.5" ry="6" fill="#2b231d" />
          <ellipse cx="96" cy="54" rx="4.5" ry="6" fill="#2b231d" />
          {/* Eye Highlights */}
          <circle cx="62.5" cy="51.5" r="1.8" fill="#ffffff" />
          <circle cx="94.5" cy="51.5" r="1.8" fill="#ffffff" />
          {/* Eyelashes / Soft Brows */}
          <path d="M 58 45 Q 65 42 71 45" stroke="#483626" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 89 45 Q 95 42 102 45" stroke="#483626" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* MOUTH & NOSE */}
          <circle cx="80" cy="59" r="1" fill="#c48e6c" />
          <path d="M 77 67 Q 80 69 83 67" stroke="#945842" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* FRONT HAIR & HEADWEAR */}
          {isMale ? (
            /* Tiz Style Spiky Adventurer Hair & Beret */
            <g>
              {/* Beret Hat */}
              <ellipse cx="80" cy="26" rx="42" ry="16" fill="#2b231c" transform="rotate(-6 80 26)" />
              <ellipse cx="82" cy="25" rx="38" ry="13" fill="#3d332a" transform="rotate(-6 80 26)" />

              {/* Spiky Bangs */}
              <path
                d="M 44 42 Q 52 28 66 32 Q 58 44 54 52 Z"
                fill="url(#hairMale)"
              />
              <path
                d="M 52 30 Q 72 20 84 32 Q 74 44 68 54 Z"
                fill="url(#hairMale)"
              />
              <path
                d="M 78 26 Q 96 22 106 36 Q 98 48 90 54 Z"
                fill="url(#hairMale)"
              />
              <path
                d="M 102 34 Q 116 36 118 52 Q 108 52 104 46 Z"
                fill="url(#hairMale)"
              />
            </g>
          ) : (
            /* Agnes Style Ribbon & Elegant Mage Locks */
            <g>
              {/* Headband / Hair Ribbon */}
              <path
                d="M 46 44 Q 80 24 114 44 Q 80 20 46 44 Z"
                fill="#8c261e"
              />
              {/* Ribbon Bow */}
              <circle cx="112" cy="38" r="4" fill="#d4af37" />

              {/* Side Swept Bangs */}
              <path
                d="M 44 48 Q 55 24 75 32 Q 62 48 56 60 Z"
                fill="url(#hairFemale)"
              />
              <path
                d="M 70 28 Q 90 22 104 36 Q 88 52 82 58 Z"
                fill="url(#hairFemale)"
              />
              <path
                d="M 98 34 Q 115 36 116 62 Q 106 58 102 46 Z"
                fill="url(#hairFemale)"
              />
            </g>
          )}

          {/* HANDS / CUFFS */}
          <circle cx="48" cy="120" r="7" fill="url(#skinGrad)" />
          <circle cx="112" cy="120" r="7" fill="url(#skinGrad)" />
          <rect x="44" y="112" width="9" height="7" rx="2" fill={isMale ? "#5a4533" : "#8d3429"} />
          <rect x="107" y="112" width="9" height="7" rx="2" fill={isMale ? "#5a4533" : "#8d3429"} />

          {/* BOOTS */}
          <path d="M 64 150 L 62 168 L 74 168 L 72 150 Z" fill="#2a1d13" />
          <path d="M 88 150 L 86 168 L 98 168 L 96 150 Z" fill="#2a1d13" />
        </g>
      </svg>
    </div>
  );
}

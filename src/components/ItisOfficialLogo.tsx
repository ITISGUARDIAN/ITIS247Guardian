import React from 'react';

interface ItisLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const ItisOfficialLogo: React.FC<ItisLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {/* Gold Seal Badge Container */}
      <div className={`relative ${sizeMap[size]} flex items-center justify-center filter drop-shadow-lg`}>
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Gold Metallic Gradients */}
            <linearGradient id="goldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="30%" stopColor="#FFB300" />
              <stop offset="50%" stopColor="#FFF8E1" />
              <stop offset="75%" stopColor="#FF8F00" />
              <stop offset="100%" stopColor="#FFD54F" />
            </linearGradient>

            <linearGradient id="goldInner" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFECB3" />
              <stop offset="50%" stopColor="#FFC107" />
              <stop offset="100%" stopColor="#FF6F00" />
            </linearGradient>

            <radialGradient id="shieldBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="70%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Sunburst Star Ring */}
          <circle cx="250" cy="250" r="230" fill="url(#goldOuter)" stroke="#FFE082" strokeWidth="4" />
          <circle cx="250" cy="250" r="215" fill="#020617" stroke="url(#goldInner)" strokeWidth="6" />

          {/* Golden Stars Circle */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = 250 + 200 * Math.cos(rad);
            const y = 250 + 200 * Math.sin(rad);
            return (
              <path
                key={i}
                d={`M ${x} ${y - 6} L ${x + 2} ${y - 2} L ${x + 6} ${y} L ${x + 2} ${y + 2} L ${x} ${y + 6} L ${x - 2} ${y + 2} L ${x - 6} ${y} L ${x - 2} ${y - 2} Z`}
                fill="url(#goldOuter)"
              />
            );
          })}

          {/* Inner Navy Circular Crest */}
          <circle cx="250" cy="250" r="185" fill="url(#shieldBg)" stroke="url(#goldOuter)" strokeWidth="8" />

          {/* Outer Text Path Arc */}
          <path
            id="textArcTop"
            d="M 80 250 A 170 170 0 1 1 420 250"
            fill="none"
          />
          <text fill="url(#goldOuter)" fontSize="18" fontWeight="900" letterSpacing="4">
            <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
              INTEGRATED TECHNOLOGY
            </textPath>
          </text>

          <path
            id="textArcBottom"
            d="M 420 250 A 170 170 0 1 1 80 250"
            fill="none"
          />
          <text fill="url(#goldOuter)" fontSize="18" fontWeight="900" letterSpacing="4">
            <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
              INTELLIGENCE &amp; SAFETY
            </textPath>
          </text>

          {/* Central Shield */}
          <path
            d="M 250 110 L 340 150 C 340 260 290 320 250 350 C 210 320 160 260 160 150 Z"
            fill="#0F172A"
            stroke="url(#goldOuter)"
            strokeWidth="8"
          />

          {/* Eagle Silhouette Crest at Top of Shield */}
          <path
            d="M 250 120 Q 230 100 200 115 Q 230 135 250 130 Q 270 135 300 115 Q 270 100 250 120 Z"
            fill="url(#goldInner)"
          />

          {/* Main "ITIS" Acronym Text */}
          <text
            x="250"
            y="205"
            textAnchor="middle"
            fill="url(#goldOuter)"
            fontSize="54"
            fontWeight="900"
            letterSpacing="6"
            filter="url(#goldGlow)"
          >
            ITIS
          </text>

          {/* Subtitle Under ITIS */}
          <text
            x="250"
            y="228"
            textAnchor="middle"
            fill="#E2E8F0"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1.5"
          >
            INTEGRATED TECHNOLOGY
          </text>
          <text
            x="250"
            y="242"
            textAnchor="middle"
            fill="#E2E8F0"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1.5"
          >
            INTELLIGENCE &amp; SAFETY
          </text>

          {/* Global GPS Safety Pin Symbol */}
          <g transform="translate(250, 280)">
            <path
              d="M 0 -22 C -12 -22 -20 -14 -20 -2 C -20 12 0 30 0 30 C 0 30 20 12 20 -2 C 20 -14 12 -22 0 -22 Z"
              fill="url(#goldOuter)"
              stroke="#020617"
              strokeWidth="2"
            />
            <circle cx="0" cy="-4" r="7" fill="#020617" />
          </g>

          {/* Bottom Banner Ribbon */}
          <rect x="130" y="375" width="240" height="32" rx="6" fill="#0F172A" stroke="url(#goldOuter)" strokeWidth="4" />
          <text
            x="250"
            y="396"
            textAnchor="middle"
            fill="url(#goldOuter)"
            fontSize="12"
            fontWeight="900"
            letterSpacing="2"
          >
            ★ UNCOMPROMISED SAFETY ★
          </text>
        </svg>
      </div>

      {showSubtitle && (
        <div className="mt-2 text-center">
          <div className="text-xs font-black tracking-widest text-amber-400 font-mono">ITIS REPUBLIC OF SOUTH AFRICA</div>
          <div className="text-[10px] text-slate-400 tracking-wider">Protecting. Monitoring. Responding. Every Life. Every Second.</div>
        </div>
      )}
    </div>
  );
};

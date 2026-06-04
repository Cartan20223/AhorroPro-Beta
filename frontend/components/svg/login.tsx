interface HappyEnvelopeProps {
  size?: number;
  tilt?: number;
}

export function HappyEnvelope({ size = 96, tilt = 0 }: HappyEnvelopeProps) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 96 75" fill="none" style={{ transform: `rotate(${tilt}deg)` }}>
      <rect x="2" y="18" width="92" height="55" rx="8" fill="white" stroke="#D4D4D4" strokeWidth="2" />
      <path d="M2 26 L48 50 L94 26" stroke="#D4D4D4" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M2 73 L36 46" stroke="#D4D4D4" strokeWidth="1.5" />
      <path d="M94 73 L60 46" stroke="#D4D4D4" strokeWidth="1.5" />
      <circle cx="34" cy="38" r="3.5" fill="#222" />
      <circle cx="62" cy="38" r="3.5" fill="#222" />
      <circle cx="35.5" cy="36.5" r="1.2" fill="white" />
      <circle cx="63.5" cy="36.5" r="1.2" fill="white" />
      <path d="M37 47 Q48 55 59 47" stroke="#222" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <ellipse cx="26" cy="44" rx="5" ry="3.5" fill="#FFB3C6" opacity="0.55" />
      <ellipse cx="70" cy="44" rx="5" ry="3.5" fill="#FFB3C6" opacity="0.55" />
    </svg>
  );
}

interface GoldCoinProps {
  size?: number;
}

export function GoldCoin({ size = 64 }: GoldCoinProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="58" rx="18" ry="4" fill="rgba(0,0,0,0.08)" />
      <circle cx="32" cy="30" r="27" fill="#F4C430" />
      <circle cx="32" cy="30" r="22" fill="#FFD700" />
      <path d="M18 16 Q32 10 46 16" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <text x="32" y="37" textAnchor="middle" fontSize="18" fontWeight="900" fill="#B8860B" fontFamily="sans-serif">$</text>
    </svg>
  );
}

interface StarBadgeProps {
  size?: number;
}

export function LoginStarBadge({ size = 72 }: StarBadgeProps) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 72 83" fill="none">
      <ellipse cx="36" cy="79" rx="16" ry="3.5" fill="rgba(0,0,0,0.08)" />
      <path d="M24 58 L20 76 L28 70 L36 76 L36 58" fill="#FF6B6B" />
      <path d="M48 58 L52 76 L44 70 L36 76 L36 58" fill="#FF4F4F" />
      <path d="M36 4 L42.5 21 L61 21 L47 32 L52.5 49 L36 39 L19.5 49 L25 32 L11 21 L29.5 21 Z" fill="#FFD700" stroke="#F4C430" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M28 13 Q36 8 44 13" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M36 11 L40 22.5 L53 22.5 L43.5 29.5 L47 41 L36 34 L25 41 L28.5 29.5 L19 22.5 L32 22.5 Z" fill="#FFEC6E" opacity="0.5" />
      <path d="M30 67 L34 72 L43 62" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

interface SmallBadgeProps {
  size?: number;
}

export function LoginSmallBadge({ size = 48 }: SmallBadgeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="21" fill="#A78BFA" />
      <circle cx="24" cy="24" r="16" fill="#7C3AED" />
      <path d="M19 24 L22 27 L30 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

interface ConfettiProps {
  color?: string;
  w?: number;
  h?: number;
  rotate?: number;
}

export function Confetti({ color = "#FF6B6B", w = 12, h = 6, rotate = 25 }: ConfettiProps) {
  return (
    <div
      style={{
        width: w,
        height: h,
        backgroundColor: color,
        borderRadius: h > w ? "50%" : 2,
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}

interface ConfettiSpiralProps {
  size?: number;
  color?: string;
}

export function ConfettiSpiral({ size = 18, color = "#7C3AED" }: ConfettiSpiralProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 2 Q16 6 14 10 Q12 14 8 12 Q4 10 6 6 Q8 2 12 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

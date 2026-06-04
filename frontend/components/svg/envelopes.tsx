interface NormalEnvelopeFaceProps {
  accent?: string;
}

export function NormalEnvelopeFace({ accent = "#10B981" }: NormalEnvelopeFaceProps) {
  return (
    <svg width="72" height="54" viewBox="0 0 72 54" fill="none">
      <rect x="2" y="8" width="68" height="44" rx="7" fill="white" stroke={accent} strokeWidth="1.8" />
      <path d="M2 15 L36 34 L70 15" stroke={accent} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M2 52 L28 36" stroke={accent} strokeWidth="1.2" opacity="0.5" />
      <path d="M70 52 L44 36" stroke={accent} strokeWidth="1.2" opacity="0.5" />
      <circle cx="25" cy="30" r="2.8" fill="#222" />
      <circle cx="47" cy="30" r="2.8" fill="#222" />
      <circle cx="26.1" cy="28.9" r="1" fill="white" />
      <circle cx="48.1" cy="28.9" r="1" fill="white" />
      <path d="M27 37 Q36 43 45 37" stroke="#222" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

interface ChubbyEnvelopeFaceProps {
  accent?: string;
}

export function ChubbyEnvelopeFace({ accent = "#F97316" }: ChubbyEnvelopeFaceProps) {
  return (
    <svg width="88" height="70" viewBox="0 0 88 70" fill="none">
      <rect x="2" y="6" width="84" height="60" rx="22" fill="white" stroke={accent} strokeWidth="2.5" />
      <ellipse cx="2" cy="36" rx="4" ry="14" fill="white" stroke={accent} strokeWidth="2" />
      <ellipse cx="86" cy="36" rx="4" ry="14" fill="white" stroke={accent} strokeWidth="2" />
      <path d="M6 16 L44 40 L82 16" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle cx="30" cy="36" r="5" fill="#222" />
      <circle cx="58" cy="36" r="5" fill="#222" />
      <circle cx="32" cy="34" r="1.8" fill="white" />
      <circle cx="60" cy="34" r="1.8" fill="white" />
      <path d="M26 50 Q44 62 62 50" stroke="#222" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="18" cy="44" rx="8" ry="5.5" fill="#FFB3C6" opacity="0.55" />
      <ellipse cx="70" cy="44" rx="8" ry="5.5" fill="#FFB3C6" opacity="0.55" />
      <path d="M76 18 Q77.5 15 79 18 Q79 21 77.5 21 Q76 21 76 18 Z" fill="#BAE6FD" />
    </svg>
  );
}

interface SparkleProps {
  size?: number;
  color?: string;
}

export function Sparkle({ size = 14, color = "#F97316" }: SparkleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 2 L11.2 8.8 L18 10 L11.2 11.2 L10 18 L8.8 11.2 L2 10 L8.8 8.8 Z" fill={color} />
    </svg>
  );
}

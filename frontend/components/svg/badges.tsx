interface BadgeIconProps {
  color?: string;
}

export function BadgeStar({ color = "#FFD700" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <polygon points="20,3 24.9,14.3 37.0,14.3 27.5,21.8 31.3,33.0 20,26.4 8.7,33.0 12.5,21.8 3.0,14.3 15.1,14.3" fill={color} />
      <path d="M14 9 Q20 6 26 9" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function BadgeFire({ color = "#F97316" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 3 C20 3 28 12 26 19 C26 19 30 16 29 11 C34 16 35 24 30 30 C27 34 23 36 20 36 C17 36 13 34 10 30 C5 24 6 16 11 11 C10 16 14 19 14 19 C12 12 20 3 20 3 Z" fill={color} />
      <path d="M20 18 C20 18 23 22 22 26 C22 26 24 24 23.5 21 C25.5 23 26 27 23 30 C21.5 31.5 18.5 31.5 17 30 C14 27 14.5 23 16.5 21 C16 24 18 26 18 26 C17 22 20 18 20 18 Z" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

export function BadgeTrophy({ color = "#7C3AED" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M12 6 H28 V22 C28 29 12 29 12 22 Z" fill={color} />
      <path d="M12 10 Q6 10 6 17 Q6 22 12 22" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M28 10 Q34 10 34 17 Q34 22 28 22" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="18" y="29" width="4" height="5" fill={color} />
      <rect x="12" y="34" width="16" height="3" rx="1.5" fill={color} />
      <path d="M16 10 Q20 8 24 10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function BadgeMoon({ color = "#3B82F6" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M22 6 C14 8 9 15 9 20 C9 28 16 34 24 34 C30 34 35 30 37 25 C33 26 29 25 26 22 C22 18 21 14 22 6 Z" fill={color} />
      <circle cx="32" cy="10" r="2" fill={color} opacity="0.7" />
      <circle cx="36" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="28" cy="6" r="1" fill={color} opacity="0.6" />
    </svg>
  );
}

export function BadgeDiamond({ color = "#14B8A6" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <polygon points="20,4 36,16 20,38 4,16" fill={color} />
      <polygon points="20,4 36,16 20,20 4,16" fill="rgba(255,255,255,0.22)" />
      <line x1="4" y1="16" x2="36" y2="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="20" y1="4" x2="20" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </svg>
  );
}

export function BadgeShield({ color = "#EF4444" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 3 L34 9 V22 C34 30 20 37 20 37 C20 37 6 30 6 22 V9 Z" fill={color} />
      <path d="M14 19 L18 23 L26 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M20 5 L32 10 V13 C28 12 22 11 20 5 Z" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

export function BadgeLightning({ color = "#8B5CF6" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M24 4 L12 22 H20 L16 38 L30 18 H22 Z" fill={color} />
      <path d="M22 4 L18 13 H22 L20 20" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function BadgeRocket({ color = "#F59E0B" }: BadgeIconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 4 C20 4 28 10 28 22 H12 C12 10 20 4 20 4 Z" fill={color} />
      <circle cx="20" cy="16" r="4" fill="rgba(255,255,255,0.5)" />
      <path d="M12 22 L8 30 L14 26 Z" fill={color} opacity="0.8" />
      <path d="M28 22 L32 30 L26 26 Z" fill={color} opacity="0.8" />
      <path d="M16 30 Q18 36 20 38 Q22 36 24 30" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export type BadgeShapeType = "star" | "fire" | "trophy" | "moon" | "diamond" | "shield" | "lightning" | "rocket";

interface BadgeShapeProps {
  shape: BadgeShapeType;
  color?: string;
  unlocked?: boolean;
}

export function BadgeShape({ shape, color = "#FFD700", unlocked = true }: BadgeShapeProps) {
  const c = unlocked ? color : "#C4C4C4";
  switch (shape) {
    case "star": return <BadgeStar color={c} />;
    case "fire": return <BadgeFire color={c} />;
    case "trophy": return <BadgeTrophy color={c} />;
    case "moon": return <BadgeMoon color={c} />;
    case "diamond": return <BadgeDiamond color={c} />;
    case "shield": return <BadgeShield color={c} />;
    case "lightning": return <BadgeLightning color={c} />;
    case "rocket": return <BadgeRocket color={c} />;
  }
}

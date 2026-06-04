"use client";

import { motion } from "framer-motion";
import { Star, Flame, Target, Sparkles, Moon, Zap, Award, TrendingUp, type LucideIcon } from "lucide-react";

type BadgeIcon = "star" | "flame" | "target" | "sparkles" | "moon" | "zap" | "award" | "trending";

interface MetallicBadgeProps {
  title: string;
  subtitle: string;
  icon: BadgeIcon;
  unlocked: boolean;
  color: string;
}

const icons: Record<BadgeIcon, LucideIcon> = {
  star: Star,
  flame: Flame,
  target: Target,
  sparkles: Sparkles,
  moon: Moon,
  zap: Zap,
  award: Award,
  trending: TrendingUp,
};

export function MetallicBadge({ title, subtitle, icon, unlocked, color }: MetallicBadgeProps) {
  const Icon = icons[icon];

  return (
    <motion.div
      className="relative"
      style={{ perspective: "800px" }}
      whileHover={unlocked ? { scale: 1.05, y: -4 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <motion.div
        className="relative p-4 rounded-2xl flex flex-col items-center gap-2"
        style={{
          backgroundColor: unlocked ? `${color}15` : "#F5F5F5",
          transformStyle: "preserve-3d",
        }}
        whileHover={
          unlocked
            ? { rotateY: 8, rotateX: -4 }
            : {}
        }
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: unlocked
              ? `linear-gradient(135deg, ${color}, ${color}DD, ${color}AA, ${color}DD, ${color})`
              : "linear-gradient(135deg, #E0E0E0, #BDBDBD, #9E9E9E, #BDBDBD, #E0E0E0)",
            backgroundSize: "200% 200%",
            boxShadow: unlocked
              ? `0 4px 16px ${color}50, inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.2)`
              : "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
            transform: "translateZ(16px)",
          }}
          animate={
            unlocked
              ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
              : {}
          }
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          whileHover={
            unlocked
              ? { rotate: [0, -8, 8, -8, 0] }
              : {}
          }
        >
          <Icon
            size={24}
            strokeWidth={2.5}
            className={unlocked ? "text-white drop-shadow-sm" : "text-gray-400"}
          />

          {unlocked && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.3) 100%)",
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        <div className="text-center" style={{ transform: "translateZ(8px)" }}>
          <div
            className={`text-xs mb-0.5 ${unlocked ? "text-black" : "text-gray-400"}`}
            style={{ fontWeight: 600 }}
          >
            {title}
          </div>
          <div className={`text-[0.65rem] ${unlocked ? "text-black/50" : "text-gray-300"}`}>
            {subtitle}
          </div>
        </div>

        {unlocked && (
          <motion.div
            className="absolute inset-0 rounded-2xl -z-10 blur-xl"
            style={{ background: color, opacity: 0.3 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-500">
                <path d="M6 1C4.34315 1 3 2.34315 3 4V5H2.5C2.22386 5 2 5.22386 2 5.5V10.5C2 10.7761 2.22386 11 2.5 11H9.5C9.77614 11 10 10.7761 10 10.5V5.5C10 5.22386 9.77614 5 9.5 5H9V4C9 2.34315 7.65685 1 6 1ZM8 5V4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4V5H8Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export type { BadgeIcon };

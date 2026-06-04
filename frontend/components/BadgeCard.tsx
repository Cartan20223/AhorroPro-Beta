"use client";

import { BadgeShape, type BadgeShapeType } from "@/components/svg/badges";
import { Lock } from "lucide-react";

interface BadgeItem {
  id: number;
  name: string;
  desc: string;
  unlocked: boolean;
  color: string;
  bg: string;
  shape: BadgeShapeType;
}

interface BadgeCardProps {
  badge: BadgeItem;
}

const defaultBadges: BadgeItem[] = [
  { id: 1,  name: "Primer Ahorro",     desc: "Hiciste tu primer depósito",      unlocked: true,  color: "#FFD700", bg: "#FFFBEB", shape: "star"      },
  { id: 2,  name: "Racha de 7 Días",   desc: "Ahorraste 7 días seguidos",        unlocked: true,  color: "#F97316", bg: "#FFF7ED", shape: "fire"      },
  { id: 3,  name: "Rompe Metas",   desc: "Completaste tu primera meta",    unlocked: true,  color: "#7C3AED", bg: "#F5F3FF", shape: "trophy"    },
  { id: 4,  name: "Búho Nocturno",      desc: "Ahorraste después de medianoche",         unlocked: true,  color: "#3B82F6", bg: "#EFF6FF", shape: "moon"      },
  { id: 5,  name: "Millonario",    desc: "Ahorra $1,000,000 total",        unlocked: false, color: "#14B8A6", bg: "#F0FDFA", shape: "diamond"   },
  { id: 6,  name: "Sin Deudas",      desc: "Alcanza deuda cero",              unlocked: false, color: "#EF4444", bg: "#FEF2F2", shape: "shield"    },
  { id: 7,  name: "Racha de 5 Años",  desc: "Ahorra constantemente por 5 años", unlocked: false, color: "#8B5CF6", bg: "#F5F3FF", shape: "lightning" },
  { id: 8,  name: "Ahorro Rápido",    desc: "Logra una meta en menos de 30 días", unlocked: false, color: "#F59E0B", bg: "#FFFBEB", shape: "rocket"    },
];

export { defaultBadges };
export type { BadgeItem };

export default function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-3.5 flex flex-col items-center gap-2 text-center transition-all ${
        badge.unlocked ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer" : "cursor-default"
      }`}
      style={{
        backgroundColor: badge.unlocked ? badge.bg : "#F5F5F5",
        border: badge.unlocked ? `1.5px solid ${badge.color}25` : "1.5px solid #E5E5E5",
      }}
    >
      <div className="relative">
        <BadgeShape shape={badge.shape} color={badge.color} unlocked={badge.unlocked} />
        {!badge.unlocked && (
          <div className="absolute inset-0 flex items-end justify-end">
            <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center -mb-1 -mr-1 shadow-sm">
              <Lock size={10} className="text-gray-500" strokeWidth={2.5} />
            </div>
          </div>
        )}
      </div>
      <div>
        <div
          className="text-[11px] font-black leading-tight"
          style={{ color: badge.unlocked ? "#111" : "#AAA", letterSpacing: "-0.01em" }}
        >
          {badge.name}
        </div>
        <div className="text-[9px] font-medium mt-0.5 leading-tight" style={{ color: badge.unlocked ? "#666" : "#BBB" }}>
          {badge.desc}
        </div>
      </div>
      {badge.unlocked && (
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.color }} />
      )}
    </div>
  );
}

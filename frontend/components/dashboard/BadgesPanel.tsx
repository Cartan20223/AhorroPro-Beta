"use client";

import Link from "next/link";
import { Star, Flame, Trophy, Zap, Lock, Sparkles, type LucideIcon } from "lucide-react";

const badgeIconMap: Record<string, LucideIcon> = {
  Star, Flame, Trophy, Zap, Sparkles,
};

interface Badge {
  id: number;
  title: string;
  description: string;
  xp: number;
  unlocked: boolean;
  icon: string;
  gradient: string;
  glowColor: string;
}

interface BadgesPanelProps {
  badges: Badge[];
  totalBadgeSlots: number;
}

export function BadgesPanel({ badges, totalBadgeSlots = 8 }: BadgesPanelProps) {
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const progress = (unlockedCount / totalBadgeSlots) * 100;

  return (
    <div className="w-96 bg-white border-l border-gray-200 py-6 px-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold tracking-tight text-[#111827] mb-1">Álbum de Logros</h3>
        <p className="text-xs font-medium text-[#4B5563]">Colecciona insignias y desbloquea recompensas</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-[#4B5563]">Tu Progreso</p>
          <p className="text-sm font-bold tracking-[-0.03em] text-[#111827]">{unlockedCount} / {totalBadgeSlots}</p>
        </div>

        <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {badges.map((badge, idx) => {
          const content = (
            <div className="flex items-center gap-3 py-3">
              {badge.unlocked ? (
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${badge.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  {(() => { const Icon = badgeIconMap[badge.icon]; return Icon ? <Icon className="w-5 h-5 text-white" strokeWidth={2.5} /> : null; })()}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-gray-400" strokeWidth={2} />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-bold tracking-tight ${badge.unlocked ? "text-[#111827]" : "text-gray-400"}`}>
                  {badge.title}
                </h4>
                <p className={`text-xs font-medium truncate ${badge.unlocked ? "text-[#4B5563]" : "text-gray-400"}`}>
                  {badge.description} &bull; {badge.xp} XP
                </p>
              </div>

              {badge.unlocked && (
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
              )}
            </div>
          );

          return (
            <div key={badge.id}>
              {content}
              {idx < badges.length - 1 && (
                <div className="border-t border-gray-100" />
              )}
            </div>
          );
        })}
      </div>

      <Link
        href="/logros"
        className="mt-auto pt-4 text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors text-center block"
      >
        Ver todos los logros &rarr;
      </Link>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api, type Envelope } from "@/lib/api";
import { Trophy, Star, Flame, Zap, Sparkles, Lock, ChevronRight } from "lucide-react";

interface Badge {
  id: number;
  title: string;
  description: string;
  xp: number;
  unlocked: boolean;
  icon: string;
  gradient: string;
}

const allBadgeDefinitions = [
  { id: 1, title: "Primer Ahorro", description: "Completaste tu primer sobre", xp: 100, icon: "Star", gradient: "from-yellow-400 to-orange-500" },
  { id: 2, title: "Racha de Fuego", description: "1 mes ahorrando consecutivamente", xp: 250, icon: "Flame", gradient: "from-orange-500 to-red-500" },
  { id: 3, title: "Meta Alcanzada", description: "Completa tu primera meta de ahorro", xp: 200, icon: "Trophy", gradient: "from-purple-500 to-pink-500" },
  { id: 4, title: "Súper Ahorrador", description: "Ahorra €1,000 en total", xp: 500, icon: "Zap", gradient: "from-blue-500 to-cyan-500" },
  { id: 5, title: "Racha Legendaria", description: "6 meses consecutivos de ahorro", xp: 750, icon: "Sparkles", gradient: "from-pink-500 to-purple-600" },
  { id: 6, title: "Dedicación", description: "Crea 5 sobres de ahorro", xp: 300, icon: "Star", gradient: "from-emerald-500 to-teal-600" },
  { id: 7, title: "Ahorro Constante", description: "Acumula €5,000 en sobres", xp: 1000, icon: "Zap", gradient: "from-amber-500 to-orange-600" },
  { id: 8, title: "Coleccionista", description: "Desbloquea todas las insignias", xp: 2000, icon: "Trophy", gradient: "from-violet-500 to-purple-700" },
];

function getStreakMonths(envelopes: Envelope[]): number {
  if (envelopes.length === 0) return 0;
  const months = Array.from(
    new Set(
      envelopes.map((e) => {
        const d = new Date(e.created_at);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort();
  if (months.length === 0) return 0;
  let streak = 1;
  for (let i = months.length - 1; i > 0; i--) {
    const curr = new Date(months[i] + "-01");
    const prev = new Date(months[i - 1] + "-01");
    const diff =
      (curr.getFullYear() - prev.getFullYear()) * 12 +
      curr.getMonth() - prev.getMonth();
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

function computeBadges(envelopes: Envelope[]): Badge[] {
  const completed = envelopes.filter((e) => e.completed).length;
  const totalSaved = envelopes.reduce((s, e) => s + e.current_amount, 0);
  const streak = getStreakMonths(envelopes);
  const totalEnvelopes = envelopes.length;

  return allBadgeDefinitions.map((def) => {
    let unlocked = false;
    switch (def.id) {
      case 1: unlocked = completed >= 1; break;
      case 2: unlocked = streak >= 1; break;
      case 3: unlocked = completed >= 1; break;
      case 4: unlocked = totalSaved >= 1000; break;
      case 5: unlocked = streak >= 6; break;
      case 6: unlocked = totalEnvelopes >= 5; break;
      case 7: unlocked = totalSaved >= 5000; break;
      case 8: unlocked = completed >= 1 && streak >= 6 && totalSaved >= 1000 && totalEnvelopes >= 5; break;
    }
    return { ...def, unlocked };
  });
}

const badgeIconMap: Record<string, typeof Star> = {
  Star, Flame, Trophy, Zap, Sparkles,
};

export default function LogrosPage() {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setError("");
      const data = await api.getEnvelopes();
      setEnvelopes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const badges = useMemo(() => computeBadges(envelopes), [envelopes]);
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalXp = badges.filter((b) => b.unlocked).reduce((s, b) => s + b.xp, 0);
  const progress = (unlockedCount / badges.length) * 100;

  return (
    <div className="px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Álbum de Logros</h1>
          <p className="text-xs font-medium text-[#6B7280] mt-1">
            {unlockedCount} de {badges.length} insignias desbloqueadas · {totalXp} XP totales
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl mb-6 border border-red-100"
          >
            {error}
            <button onClick={fetchData} className="ml-2 underline font-semibold hover:no-underline">
              Reintentar
            </button>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4" />
                <div className="h-4 w-24 bg-gray-100 rounded mx-auto mb-2" />
                <div className="h-3 w-32 bg-gray-50 rounded mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* XP Progress Card */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 mb-8 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-medium text-[#6B7280] mb-1">Progreso total</p>
                  <p className="text-3xl font-bold tracking-tight text-[#111827]">{unlockedCount} / {badges.length}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-soft">
                  <Trophy className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="relative w-full h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs font-medium text-[#6B7280] mt-2">{progress.toFixed(0)}% completado · {totalXp} XP acumulados</p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((badge) => {
                const Icon = badgeIconMap[badge.icon] || Star;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-3xl p-6 border shadow-soft transition-all ${
                      badge.unlocked ? "border-gray-100" : "border-gray-100"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="relative">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            badge.unlocked
                              ? `bg-gradient-to-br ${badge.gradient} shadow-soft`
                              : "bg-gray-200"
                          }`}
                        >
                          {badge.unlocked ? (
                            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" strokeWidth={2} />
                          )}
                        </div>
                        {badge.unlocked && (
                          <div className="absolute -inset-1 rounded-2xl opacity-30 blur-md">
                            <div className={`w-full h-full bg-gradient-to-br ${badge.gradient} rounded-2xl`} />
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className={`text-sm font-bold tracking-tight mb-0.5 ${badge.unlocked ? "text-[#111827]" : "text-gray-400"}`}>
                          {badge.title}
                        </h3>
                        <p className={`text-xs font-medium ${badge.unlocked ? "text-[#6B7280]" : "text-gray-400"}`}>
                          {badge.description}
                        </p>
                      </div>

                      <div className={`flex items-center gap-1 text-xs font-medium ${badge.unlocked ? "text-[#111827]" : "text-gray-400"}`}>
                        <Sparkles className="w-3 h-3" />
                        <span>{badge.xp} XP</span>
                      </div>

                      {badge.unlocked && (
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full tracking-tight-1">
                          Desbloqueado
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

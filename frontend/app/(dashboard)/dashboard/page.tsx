"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeroBalanceCard } from "@/components/dashboard/HeroBalanceCard";
import { EnvelopeCardNew } from "@/components/dashboard/EnvelopeCardNew";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { BadgesPanel } from "@/components/dashboard/BadgesPanel";
import DepositModal from "@/components/DepositModal";
import CreateEnvelopeModal from "@/components/CreateEnvelopeModal";
import LoadBalanceModal from "@/components/LoadBalanceModal";
import { useDashboardStore } from "@/lib/store";
import { type Envelope } from "@/lib/api";
import { Plus } from "lucide-react";

const weeklyData = [
  { day: "Lun", value: 120.00 },
  { day: "Mar", value: 85.50 },
  { day: "Mié", value: 200.00 },
  { day: "Jue", value: 50.00 },
  { day: "Vie", value: 150.75 },
  { day: "Sáb", value: 300.00 },
  { day: "Dom", value: 0 },
];

const savingsData = [
  { month: "Ene", amount: 120 },
  { month: "Feb", amount: 180 },
  { month: "Mar", amount: 220 },
  { month: "Abr", amount: 280 },
  { month: "May", amount: 350 },
  { month: "Jun", amount: 550 },
];

function getBadgeData(envelopes: Envelope[], totalSaved: number, streakMonths: number) {
  const completed = envelopes.filter((e) => e.completed).length;
  return [
    { id: 1, title: "Primer Ahorro", description: "Completaste tu primer sobre", xp: 100, unlocked: completed >= 1, icon: "Star" as const, gradient: "from-yellow-400 to-orange-500", glowColor: "shadow-yellow-400/50" },
    { id: 2, title: "Racha de Fuego", description: `${streakMonths} meses ahorrando`, xp: 250, unlocked: streakMonths >= 1, icon: "Flame" as const, gradient: "from-orange-500 to-red-500", glowColor: "shadow-orange-500/50" },
    { id: 3, title: "Meta Alcanzada", description: "Completa tu primera meta", xp: 200, unlocked: completed >= 1, icon: "Trophy" as const, gradient: "from-purple-500 to-pink-500", glowColor: "shadow-purple-500/50" },
    { id: 4, title: "Súper Ahorrador", description: "Ahorra €1000", xp: 500, unlocked: totalSaved >= 1000, icon: "Zap" as const, gradient: "from-blue-500 to-cyan-500", glowColor: "shadow-blue-500/50" },
    { id: 5, title: "Racha Legendaria", description: "6 meses consecutivos", xp: 750, unlocked: streakMonths >= 6, icon: "Sparkles" as const, gradient: "from-pink-500 to-purple-600", glowColor: "shadow-pink-500/50" },
  ];
}

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

export default function DashboardPage() {
  const { envelopes, balance, loading, error, fetchData } = useDashboardStore();
  const [showCreate, setShowCreate] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [depositTarget, setDepositTarget] = useState<Envelope | null>(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const activeEnvelopes = envelopes.filter((e) => !e.completed);
  const completedEnvelopes = envelopes.filter((e) => e.completed);
  const totalSaved = envelopes.reduce((s, e) => s + e.current_amount, 0);
  const streakMonths = getStreakMonths(envelopes);
  const eurBalance = balance?.eur ?? 0;
  const copBalance = balance?.cop ?? 0;

  const badges = getBadgeData(envelopes, totalSaved, streakMonths);
  const badgesEarned = badges.filter((b) => b.unlocked).length;

  const stats = [
    { faIcon: "fa-regular fa-wallet", label: "Total Ahorrado", value: `€${totalSaved.toLocaleString()}`, change: `${activeEnvelopes.length} sobres activos`, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { faIcon: "fa-solid fa-bullseye", label: "Metas Activas", value: activeEnvelopes.length.toString(), change: `${completedEnvelopes.length} completadas`, bg: "bg-purple-50", iconColor: "text-purple-600" },
    { faIcon: "fa-solid fa-house-fire", label: "Racha", value: `${streakMonths} ${streakMonths === 1 ? "mes" : "meses"}`, change: "1 mes activo", bg: "bg-orange-50", iconColor: "text-orange-600" },
    { faIcon: "fa-regular fa-star", label: "Insignias", value: `${badgesEarned} / ${badges.length}`, change: `${Math.round((badgesEarned / badges.length) * 100)}% completo`, bg: "bg-blue-50", iconColor: "text-blue-600" },
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl mb-2 border border-red-100"
          >
            {error}
            <button onClick={fetchData} className="ml-2 underline font-semibold hover:no-underline">
              Reintentar
            </button>
          </motion.div>
        )}

        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-32" />
                ))}
              </div>
              <div className="bg-gray-200 rounded-2xl h-48" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-200 rounded-xl h-32" />
              <div className="bg-gray-200 rounded-2xl h-64" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.filter((s) => s.label !== "Total Ahorrado").map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-soft transition-all flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#4B5563] mb-1 truncate">{stat.label}</p>
                        <p className="text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[#111827]">{stat.value}</p>
                      </div>
                      <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center ${stat.iconColor} text-sm flex-shrink-0 ml-2`}>
                        <i className={stat.faIcon} />
                      </div>
                    </div>
                    <p className="text-xs text-[#4B5563] font-medium mt-auto">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <HeroBalanceCard
                  eurBalance={eurBalance}
                  copBalance={copBalance}
                  monthlyChange={eurBalance * 0.1}
                  savingsData={savingsData}
                />
                <button
                  onClick={() => setShowLoad(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-soft text-sm font-medium tracking-[-0.01em] text-gray-700 hover:shadow-md transition-all"
                >
                  <i className="fa-solid fa-credit-card text-sm" />
                  Cargar fondos al balance
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.filter((s) => s.label === "Total Ahorrado").map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-soft transition-all flex flex-col h-fit"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs font-medium text-[#4B5563] mb-1">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[#111827]">{stat.value}</p>
                    </div>
                    <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center ${stat.iconColor} text-sm flex-shrink-0`}>
                      <i className={stat.faIcon} />
                    </div>
                  </div>
                  <p className="text-xs text-[#4B5563] font-medium mt-auto">{stat.change}</p>
                </div>
              ))}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-soft overflow-hidden">
                <div className="flex items-center justify-between px-4 sm:px-6 pt-5 pb-4">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#111827]">Sobres de Ahorro</h3>
                    <p className="text-xs font-medium text-[#4B5563] mt-0.5">Tus metas activas</p>
                  </div>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-semibold tracking-[-0.01em] shadow-[0_4px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all flex-shrink-0"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    <span className="hidden sm:inline">Nuevo Sobre</span>
                    <span className="sm:hidden">Nuevo</span>
                  </button>
                </div>

                {activeEnvelopes.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 px-6">
                    <i className="fa-regular fa-envelope text-4xl block mb-4 text-gray-300" />
                    <p className="text-sm font-medium text-[#4B5563] mb-5">No hay sobres activos aún</p>
                    <button
                      onClick={() => setShowCreate(true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-semibold tracking-[-0.01em] shadow-[0_4px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                      Crea tu primer sobre
                    </button>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 sm:gap-5">
                    {activeEnvelopes.map((envelope, idx) => {
                      const percentage = envelope.target_amount > 0
                        ? (envelope.current_amount / envelope.target_amount) * 100
                        : 0;
                      return (
                        <motion.div
                          key={envelope.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <EnvelopeCardNew
                            name={envelope.name}
                            percentage={percentage}
                            index={idx}
                            onClick={() => setDepositTarget(envelope)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <WeeklyChart data={weeklyData} />
          </>
        )}
      </div>

      <div className="hidden lg:block">
        <BadgesPanel badges={badges} totalBadgeSlots={8} />
      </div>

      {showCreate && (
        <CreateEnvelopeModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchData}
        />
      )}

      {showLoad && (
        <LoadBalanceModal
          onClose={() => setShowLoad(false)}
          onLoaded={fetchData}
        />
      )}

      {depositTarget && (
        <DepositModal
          envelope={depositTarget}
          balance={balance}
          onClose={() => setDepositTarget(null)}
          onDeposited={fetchData}
        />
      )}
    </div>
  );
}

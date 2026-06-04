"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import DepositModal from "@/components/DepositModal";
import { api, type Envelope } from "@/lib/api";
import { Target, Calendar } from "lucide-react";

const envelopeConfig: Record<string, { iconBg: string; iconColor: string; barColor: string }> = {
  gaming: { iconBg: "bg-purple-50", iconColor: "text-purple-600", barColor: "from-purple-500 to-purple-600" },
  travel: { iconBg: "bg-blue-50", iconColor: "text-blue-600", barColor: "from-blue-500 to-blue-600" },
  car: { iconBg: "bg-orange-50", iconColor: "text-orange-600", barColor: "from-orange-500 to-orange-600" },
  laptop: { iconBg: "bg-cyan-50", iconColor: "text-cyan-600", barColor: "from-cyan-500 to-cyan-600" },
  emergency: { iconBg: "bg-emerald-50", iconColor: "text-emerald-600", barColor: "from-emerald-500 to-emerald-600" },
  default: { iconBg: "bg-indigo-50", iconColor: "text-indigo-600", barColor: "from-indigo-500 to-indigo-600" },
};

function getConfig(name: string) {
  const lower = name.toLowerCase();
  for (const [key, config] of Object.entries(envelopeConfig)) {
    if (lower.includes(key)) return config;
  }
  return envelopeConfig.default;
}

export default function AchievementsPage() {
  const [completed, setCompleted] = useState<Envelope[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [depositTarget, setDepositTarget] = useState<Envelope | null>(null);

  const fetchCompleted = useCallback(async () => {
    try {
      setError("");
      const data = await api.getEnvelopes();
      setCompleted(data.filter((e) => e.completed));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar logros.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompleted();
  }, [fetchCompleted]);

  return (
    <div className="px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Metas Alcanzadas</h1>
          <p className="text-sm text-gray-500 mt-1">
            {completed.length} sobre{completed.length !== 1 ? "s" : ""} completado{completed.length !== 1 ? "s" : ""}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl mb-6 border border-red-100"
          >
            {error}
            <button onClick={fetchCompleted} className="ml-2 underline font-semibold hover:no-underline">
              Reintentar
            </button>
          </motion.div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl mb-4" />
                <div className="h-5 w-28 bg-gray-100 rounded mb-2" />
                <div className="h-3 w-20 bg-gray-100 rounded mb-4" />
                <div className="h-2 w-full bg-gray-100 rounded mb-3" />
                <div className="h-3 w-24 bg-gray-50 rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && completed.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <span className="text-5xl block mb-4">🏆</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aún no hay metas completadas</h3>
            <p className="text-sm text-gray-500">Sigue ahorrando en tus sobres para ver tus logros aquí</p>
          </div>
        )}

        {!loading && completed.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map((envelope) => {
              const config = getConfig(envelope.name);
              const symbol = envelope.currency === "EUR" ? "€" : "$";
              return (
                <motion.div
                  key={envelope.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => setDepositTarget(envelope)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${config.iconBg} rounded-2xl flex items-center justify-center`}>
                      <Target className={`w-7 h-7 ${config.iconColor}`} strokeWidth={2} />
                    </div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                      Completado
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-1">{envelope.name}</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">{symbol}{envelope.current_amount.toLocaleString()}</span>
                    <span className="text-sm text-gray-400">de {symbol}{envelope.target_amount.toLocaleString()}</span>
                  </div>

                  <div className="relative w-full h-3 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: "100%" }} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-600 font-semibold">100% completado</span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Completado</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {depositTarget && (
        <DepositModal
          envelope={depositTarget}
          onClose={() => setDepositTarget(null)}
          onDeposited={fetchCompleted}
        />
      )}
    </div>
  );
}

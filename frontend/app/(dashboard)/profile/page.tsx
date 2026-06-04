"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { api, type Balance, type UserProfile } from "@/lib/api";
import { Mail, Wallet, PiggyBank, TrendingUp, Euro, DollarSign, ArrowDownToLine } from "lucide-react";
import LoadBalanceModal from "@/components/LoadBalanceModal";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [totalSaved, setTotalSaved] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoad, setShowLoad] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError("");
      const [profileData, balData, envData] = await Promise.all([
        api.getProfile(),
        api.getBalance(),
        api.getEnvelopes(),
      ]);
      setProfile(profileData);
      setBalance(balData);
      setTotalSaved(envData.reduce((sum, e) => sum + e.current_amount, 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-2xl mb-6 border border-red-100 flex items-center justify-between"
          >
            <span>{error}</span>
            <button onClick={fetchData} className="ml-2 underline font-semibold hover:no-underline">
              Reintentar
            </button>
          </motion.div>
        )}

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="bg-white rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
                <div>
                  <div className="h-5 w-32 bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-44 bg-gray-50 rounded" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="h-4 w-16 bg-gray-100 rounded mb-3" />
                  <div className="h-8 w-24 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <span className="text-2xl font-bold text-white">
                    {profile?.name?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile?.name || "Usuario"}
                  </h2>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                    <Mail size={14} />
                    <span>{profile?.email || "—"}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Euro size={20} className="text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Balance EUR
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  €{(balance?.eur ?? 0).toLocaleString()}
                </div>
                <button
                  onClick={() => setShowLoad(true)}
                  className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <ArrowDownToLine size={12} />
                  Cargar fondos
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <DollarSign size={20} className="text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Balance COP
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${(balance?.cop ?? 0).toLocaleString()}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <PiggyBank size={20} className="text-purple-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total Ahorrado
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  €{totalSaved.toLocaleString()}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>

      {showLoad && (
        <LoadBalanceModal
          onClose={() => setShowLoad(false)}
          onLoaded={fetchData}
        />
      )}
    </div>
  );
}

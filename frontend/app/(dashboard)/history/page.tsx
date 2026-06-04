"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { api, type Envelope, type Balance } from "@/lib/api";
import { ArrowRight, ArrowDownToLine } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "transfer";
  amount: number;
  currency: "EUR" | "COP";
  from: string;
  to: string;
  date: string;
}

export default function HistoryPage() {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [envData, balData] = await Promise.all([
        api.getEnvelopes(),
        api.getBalance(),
      ]);
      setEnvelopes(envData);
      setBalance(balData);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const transactions: Transaction[] = [
    ...envelopes.map((env) => ({
      id: `env-${env.id}`,
      type: "transfer" as const,
      amount: env.current_amount,
      currency: env.currency as "EUR" | "COP",
      from: "Balance General",
      to: env.name,
      date: env.created_at,
    })),
  ];

  if (balance) {
    if (balance.eur > 0) {
      transactions.unshift({
        id: "bal-eur",
        type: "deposit",
        amount: balance.eur,
        currency: "EUR",
        from: "Depósito",
        to: "Balance General",
        date: new Date().toISOString(),
      });
    }
    if (balance.cop > 0) {
      transactions.unshift({
        id: "bal-cop",
        type: "deposit",
        amount: balance.cop,
        currency: "COP",
        from: "Depósito",
        to: "Balance General",
        date: new Date().toISOString(),
      });
    }
  }

  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Historial</h1>
          <p className="text-sm text-gray-500 mt-1">
            {transactions.length} transaccione{transactions.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                    <div className="h-3 w-20 bg-gray-50 rounded" />
                  </div>
                  <div className="h-5 w-16 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <span className="text-5xl block mb-4">📋</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sin movimientos aún</h3>
            <p className="text-sm text-gray-500">Tus transacciones aparecerán aquí</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => {
              const symbol = tx.currency === "EUR" ? "€" : "$";
              const isDeposit = tx.type === "deposit";
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDeposit ? "bg-emerald-50" : "bg-purple-50"
                    }`}>
                      {isDeposit ? (
                        <ArrowDownToLine size={20} className="text-emerald-600" />
                      ) : (
                        <ArrowRight size={20} className="text-purple-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 truncate">
                          {isDeposit ? `Depósito a ${tx.to}` : `${tx.from} → ${tx.to}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{tx.currency}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(tx.date).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm font-bold ${isDeposit ? "text-emerald-600" : "text-purple-600"}`}>
                        {isDeposit ? "+" : ""}{symbol}{tx.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

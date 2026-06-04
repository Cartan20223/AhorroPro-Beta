"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, Wallet } from "lucide-react";

interface LoadBalanceModalProps {
  onClose: () => void;
  onLoaded: () => void;
}

export default function LoadBalanceModal({ onClose, onLoaded }: LoadBalanceModalProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"EUR" | "COP">("EUR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setError("Ingresa un monto válido.");
      setLoading(false);
      return;
    }

    try {
      await api.depositBalance({ amount: parsed, currency });
      onLoaded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl border border-[rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Wallet size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a0a0f]">Cargar dinero</h2>
              <p className="text-xs text-[#6b6b80]">Agrega fondos a tu balance general</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <div>
              <Label htmlFor="load-amount" className="mb-1.5 block">
                Monto
              </Label>
              <Input
                id="load-amount"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label className="mb-1.5 block">Moneda</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency("EUR")}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                    currency === "EUR"
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-[rgba(0,0,0,0.08)] text-[#6b6b80] hover:border-[#0a0a0f]"
                  }`}
                >
                  EUR €
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("COP")}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                    currency === "COP"
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-[rgba(0,0,0,0.08)] text-[#6b6b80] hover:border-[#0a0a0f]"
                  }`}
                >
                  COP $
                </button>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-xs text-emerald-700 font-medium mb-4">
                <ArrowDown size={14} />
                <span>El dinero se agregará a tu balance disponible</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="secondary"
                size="md"
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Cargando..." : "Cargar"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

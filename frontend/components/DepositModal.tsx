"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api, type Envelope, type Balance } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, ArrowRight, AlertCircle } from "lucide-react";

interface DepositModalProps {
  envelope: Envelope;
  balance?: Balance | null;
  onClose: () => void;
  onDeposited: () => void;
}

export default function DepositModal({
  envelope,
  balance,
  onClose,
  onDeposited,
}: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const percentage = (envelope.current_amount / envelope.target_amount) * 100;
  const symbol = envelope.currency === "EUR" ? "€" : "$";
  const availableBalance =
    balance
      ? envelope.currency === "EUR" ? balance.eur : balance.cop
      : Infinity;

  const parsed = parseFloat(amount);
  const exceedsBalance = balance !== null && !isNaN(parsed) && parsed > availableBalance;
  const isValid = !isNaN(parsed) && parsed > 0 && (balance === null || !exceedsBalance);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isNaN(parsed) || parsed <= 0) {
      setError("Ingresa un monto válido.");
      setLoading(false);
      return;
    }

    if (exceedsBalance) {
      setError("Saldo general insuficiente.");
      setLoading(false);
      return;
    }

    try {
      await api.depositEnvelope(envelope.id, {
        amount: parsed,
        source: "balance",
      });
      onDeposited();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Algo salió mal."
      );
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
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Wallet size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a0a0f]">
                {envelope.name}
              </h2>
              <p className="text-xs text-[#6b6b80]">Transferir desde balance general</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-semibold text-black/50">Progreso</span>
              <span className="font-bold text-black">
                {Math.round(percentage)}%
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: percentage >= 100 ? "#10b981" : "#6366f1" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-black/40 mt-1">
              <span>{symbol}{envelope.current_amount.toLocaleString()}</span>
              <span>{symbol}{envelope.target_amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Available Balance */}
          {balance && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 mb-4">
              <span className="text-xs font-semibold text-black/50">Saldo disponible</span>
              <span className="text-sm font-bold text-black">
                {symbol}{availableBalance.toLocaleString()}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <AlertCircle size={14} />
                {error}
              </motion.p>
            )}

            <div>
              <Label htmlFor="deposit-amount" className="mb-1.5 block">
                Monto a transferir ({envelope.currency})
              </Label>
              <Input
                id="deposit-amount"
                type="number"
                step="0.01"
                min="0.01"
                max={availableBalance}
                required
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder={`0.00 (máx. ${symbol}${availableBalance.toLocaleString()})`}
              />
            </div>

            {/* Transfer preview */}
            {isValid && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 rounded-xl bg-emerald-50 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-black/50">Balance general</span>
                  <motion.span
                    key={`bal-${parsed}`}
                    className="text-black"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {symbol}{(availableBalance - parsed).toLocaleString()}
                  </motion.span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight size={14} className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-black/50">{envelope.name}</span>
                  <motion.span
                    key={`env-${parsed}`}
                    className="text-emerald-700"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {symbol}
                    {(envelope.current_amount + parsed).toLocaleString()}
                  </motion.span>
                </div>
              </motion.div>
            )}

            {exceedsBalance && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 font-medium flex items-center gap-1"
              >
                <AlertCircle size={12} />
                Saldo general insuficiente — disponible: {symbol}
                {availableBalance.toLocaleString()}
              </motion.p>
            )}

            <div className="flex gap-3 pt-2">
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
                disabled={loading || !isValid}
                className="flex-1"
              >
                {loading ? "Transfiriendo..." : "Transferir"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

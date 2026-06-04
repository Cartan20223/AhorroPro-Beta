"use client";

import { motion } from "framer-motion";
import type { Envelope } from "@/lib/api";
import { PiggyBank, Trophy } from "lucide-react";

const currencySymbol: Record<string, string> = {
  EUR: "\u20AC",
  COP: "$",
};

interface EnvelopeCardProps {
  envelope: Envelope;
  onDeposit: (envelope: Envelope) => void;
}

export default function EnvelopeCard({
  envelope,
  onDeposit,
}: EnvelopeCardProps) {
  const progress =
    envelope.target_amount > 0
      ? Math.min((envelope.current_amount / envelope.target_amount) * 100, 100)
      : 0;

  const symbol = currencySymbol[envelope.currency] || envelope.currency;
  const isCompleted = envelope.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[rgba(0,0,0,0.04)] relative overflow-hidden"
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-bl-[100px]" />
      )}

      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between mb-5">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] ${
              isCompleted ? "text-accent-600" : "text-[#6b6b80]"
            }`}
          >
            {isCompleted ? <Trophy className="w-3.5 h-3.5" /> : <PiggyBank className="w-3.5 h-3.5" />}
            {envelope.currency}
          </span>
          {isCompleted && (
            <span className="text-[11px] font-bold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full">
              Done
            </span>
          )}
        </div>

        <div className="mb-2">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a0a0f]">
            {symbol}
            {envelope.current_amount.toLocaleString()}
          </span>
        </div>

        <div className="mb-1">
          <span className="text-sm font-semibold text-[#6b6b80]">
            of {symbol}
            {envelope.target_amount.toLocaleString()}
          </span>
        </div>

        <div className="mt-6 mb-2">
          <div className="w-full bg-[#f0f0f5] rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className={`h-full rounded-full ${isCompleted ? "bg-accent-500" : "bg-primary-500"}`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold text-[#6b6b80]">
            {isCompleted ? "Completed" : "Progress"}
          </span>
          <span className="text-sm font-bold text-[#0a0a0f]">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="text-sm font-semibold text-[#0a0a0f] mb-4">
            {envelope.name}
          </h3>

          <button
            onClick={() => onDeposit(envelope)}
            disabled={isCompleted}
            className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-primary hover:shadow-lg hover:shadow-primary-500/25"
          >
            {isCompleted ? "Goal reached" : "Add money"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

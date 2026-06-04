"use client";

import type { Envelope } from "@/lib/api";
import { NormalEnvelopeFace, ChubbyEnvelopeFace, Sparkle } from "@/components/svg/envelopes";
import { Lock } from "lucide-react";

const envelopeEmojis: Record<string, string> = {
  emergency: "🛡️",
  travel: "✈️",
  vacation: "✈️",
  laptop: "💻",
  computer: "💻",
  wedding: "💍",
  car: "🚗",
  gaming: "🎮",
  gift: "🎁",
  education: "📚",
  health: "🏥",
  food: "🍕",
  rent: "🏠",
  house: "🏠",
  savings: "💰",
  fun: "🎉",
  pet: "🐾",
  baby: "👶",
  business: "💼",
  investment: "📈",
  debt: "📉",
  retirement: "👴",
  tax: "📋",
  insurance: "🛡️",
  utilities: "💡",
  subscription: "📺",
  hobby: "🎨",
  fitness: "💪",
  fashion: "👗",
  music: "🎵",
  photography: "📸",
  gardening: "🌱",
  default: "🎯",
};

const pastelPalette = [
  { pastel: "#B8ECD0", bar: "#10B981" },
  { pastel: "#DDD6FE", bar: "#7C3AED" },
  { pastel: "#FED7AA", bar: "#F97316" },
  { pastel: "#BAE6FD", bar: "#0284C7" },
  { pastel: "#FEF08A", bar: "#D97706" },
  { pastel: "#FBCFE8", bar: "#EC4899" },
  { pastel: "#C8F5DE", bar: "#14B8A6" },
  { pastel: "#E0E7FF", bar: "#6366F1" },
];

function getEnvelopeMeta(name: string, index: number) {
  const lower = name.toLowerCase();
  let emoji = envelopeEmojis.default;
  for (const [key, value] of Object.entries(envelopeEmojis)) {
    if (lower.includes(key)) {
      emoji = value;
      break;
    }
  }
  const palette = pastelPalette[index % pastelPalette.length];
  return { emoji, ...palette };
}

interface DesignEnvelopeCardProps {
  envelope: Envelope;
  index?: number;
  onDeposit: (envelope: Envelope) => void;
}

export default function DesignEnvelopeCard({
  envelope,
  index = 0,
  onDeposit,
}: DesignEnvelopeCardProps) {
  const progress =
    envelope.target_amount > 0
      ? Math.min((envelope.current_amount / envelope.target_amount) * 100, 100)
      : 0;

  const isChubby = progress >= 80 && !envelope.completed;
  const isCompleted = envelope.completed;
  const meta = getEnvelopeMeta(envelope.name, index);
  const symbol = envelope.currency === "EUR" ? "€" : "$";

  return (
    <div
      className="relative rounded-3xl p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
      style={{
        backgroundColor: isCompleted ? "#F0F0F5" : meta.pastel,
        boxShadow: isChubby
          ? `0 8px 32px ${meta.bar}55, 0 0 0 2px ${meta.bar}30`
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {isChubby && !isCompleted && (
        <>
          <div className="absolute top-2 right-8" style={{ animation: "sparklePop 1.2s ease-in-out 0s infinite" }}>
            <Sparkle size={13} color={meta.bar} />
          </div>
          <div className="absolute top-6 right-3" style={{ animation: "sparklePop 1.2s ease-in-out 0.4s infinite" }}>
            <Sparkle size={10} color="#FFD700" />
          </div>
          <div className="absolute top-1 left-6" style={{ animation: "sparklePop 1.2s ease-in-out 0.2s infinite" }}>
            <Sparkle size={9} color={meta.bar} />
          </div>
          <div className="absolute bottom-12 right-2" style={{ animation: "sparklePop 1.2s ease-in-out 0.6s infinite" }}>
            <Sparkle size={11} color="#FFD700" />
          </div>
          <div className="absolute bottom-14 left-2" style={{ animation: "sparklePop 1.2s ease-in-out 0.8s infinite" }}>
            <Sparkle size={8} color={meta.bar} />
          </div>
        </>
      )}

      {isCompleted && (
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-1">
        {isChubby && !isCompleted ? (
          <ChubbyEnvelopeFace accent={meta.bar} />
        ) : (
          <NormalEnvelopeFace accent={isCompleted ? "#AAA" : meta.bar} />
        )}
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-base">{meta.emoji}</span>
          <span
            className="text-sm font-black tracking-tight"
            style={{ color: "#111", letterSpacing: "-0.01em" }}
          >
            {envelope.name}
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
            ¡Meta alcanzada!
          </span>
        ) : isChubby ? (
          <span
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: meta.bar, letterSpacing: "0.06em" }}
          >
            ✨ ¡Casi allí!
          </span>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: isChubby ? 14 : 10, backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${isCompleted ? 100 : progress}%`,
              backgroundColor: isCompleted ? "#10B981" : meta.bar,
              boxShadow: isChubby ? `0 0 10px ${meta.bar}88` : undefined,
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold" style={{ color: "#111" }}>
            {symbol}{envelope.current_amount.toLocaleString()}
          </span>
          <span className="text-xs font-bold" style={{ color: "#111", opacity: 0.45 }}>
            {isCompleted ? 100 : Math.round(progress)}% · {symbol}{envelope.target_amount.toLocaleString()}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDeposit(envelope)}
        disabled={isCompleted}
        className="w-full py-2 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all hover:opacity-85 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#111", letterSpacing: "0.07em" }}
      >
        {isCompleted ? (
          <span className="flex items-center justify-center gap-1.5">
            <Lock size={11} strokeWidth={2.5} /> Completado
          </span>
        ) : (
          "+ Agregar Fondos"
        )}
      </button>
    </div>
  );
}

"use client";

const GRADIENTS = [
  "linear-gradient(to top, #0052D4, #4364F7, #6FB1FC)",
  "linear-gradient(to top, #11998e, #38ef7d)",
  "linear-gradient(to top, #7F00FF, #E100FF)",
  "linear-gradient(to top, #ff416c, #ff4b2b)",
];

interface EnvelopeCardNewProps {
  name: string;
  percentage: number;
  index: number;
  onClick: () => void;
}

export function EnvelopeCardNew({
  name,
  percentage,
  index,
  onClick,
}: EnvelopeCardNewProps) {
  const pct = Math.min(Math.max(percentage, 0), 100);
  const textLight = pct > 55;
  const barGradient = index < GRADIENTS.length - 1
    ? GRADIENTS[index]
    : GRADIENTS[GRADIENTS.length - 1];

  return (
    <div
      onClick={onClick}
      className="rounded-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all cursor-pointer relative overflow-hidden aspect-[1/1]"
    >
      <div className="absolute inset-0 rounded-[20px] border border-white/50" style={{ backgroundColor: "rgba(248,250,252,0.9)" }} />

      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-700 rounded-t-[16px]"
        style={{ height: `${pct}%`, background: barGradient }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-6">
        <h4 className={`text-base font-bold tracking-tight text-center ${textLight ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" : "text-[#111827]"}`}>
          {name}
        </h4>
        <p className={`text-3xl font-bold tracking-[-0.03em] ${textLight ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" : "text-[#111827]"}`}>
          {pct.toFixed(0)}%
        </p>
      </div>
    </div>
  );
}

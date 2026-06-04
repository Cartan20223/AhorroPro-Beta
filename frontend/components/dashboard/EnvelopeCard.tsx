"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { IsometricEnvelope, type EnvelopeType } from "./IsometricEnvelope";

interface EnvelopeCardProps {
  title: string;
  emoji: string;
  currentAmount: number;
  goalAmount: number;
  percentage: number;
  bgColor: string;
  glowColor: string;
  envelopeType: EnvelopeType;
  badge?: string;
  currencySymbol?: string;
  onAddFunds: () => void;
}

export function EnvelopeCard({
  title,
  emoji,
  currentAmount,
  goalAmount,
  percentage,
  bgColor,
  glowColor,
  envelopeType,
  badge,
  currencySymbol = "$",
  onAddFunds,
}: EnvelopeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-[28px] p-6 cursor-pointer"
      style={{ backgroundColor: bgColor, perspective: "1000px", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onAddFunds}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div
          className="absolute -inset-[1px] rounded-[28px] -z-10 blur-xl opacity-60"
          style={{ background: glowColor }}
        />
        <div
          className="absolute inset-0 rounded-[28px] -z-20"
          style={{ boxShadow: `0 8px 32px ${glowColor}60, 0 2px 8px ${glowColor}40` }}
        />

        <IsometricEnvelope type={envelopeType} />

        <div className="flex items-start gap-2 mb-3">
          <span className="text-lg">{emoji}</span>
          <h3 className="flex-1 tracking-tight text-sm" style={{ fontWeight: 600 }}>
            {title}
          </h3>
        </div>

        {badge && (
          <div
            className="inline-block px-3 py-1 rounded-full text-xs mb-3 uppercase tracking-wide"
            style={{ backgroundColor: "rgba(0,0,0,0.1)", fontWeight: 600, fontSize: "0.65rem" }}
          >
            {badge}
          </div>
        )}

        <div className="mb-1 tracking-tight" style={{ fontWeight: 600, fontSize: "1.25rem" }}>
          {currencySymbol}{currentAmount.toLocaleString()}
        </div>

        <div className="flex items-center justify-between mb-3 text-sm opacity-70">
          <span>{Math.round(percentage)}%</span>
          <span>{currencySymbol}{goalAmount.toLocaleString()}</span>
        </div>

        <div className="h-2 bg-black/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <motion.button
          className="w-full h-11 bg-black text-white rounded-full text-sm tracking-wide"
          style={{ fontWeight: 600 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => { e.stopPropagation(); onAddFunds(); }}
        >
          + AGREGAR FONDOS
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

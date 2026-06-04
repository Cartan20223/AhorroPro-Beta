"use client";

import { motion } from "framer-motion";
import { Wallet, Palmtree, Laptop, Home, Car, Gamepad2, type LucideIcon } from "lucide-react";

export type EnvelopeType = "emergency" | "vacation" | "laptop" | "wedding" | "car" | "gaming";

interface IsometricEnvelopeProps {
  type: EnvelopeType;
}

const iconMap: Record<EnvelopeType, LucideIcon> = {
  emergency: Wallet,
  vacation: Palmtree,
  laptop: Laptop,
  wedding: Home,
  car: Car,
  gaming: Gamepad2,
};

export function IsometricEnvelope({ type }: IsometricEnvelopeProps) {
  const Icon = iconMap[type];

  return (
    <div className="relative w-24 h-24 mx-auto mb-4" style={{ perspective: "400px" }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [0, 5, 0, -5, 0], rotateX: [0, -3, 0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60"
          style={{ transform: "translateZ(-8px)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />
        <div
          className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 flex items-center justify-center"
          style={{ transform: "translateZ(0px)" }}
        >
          <motion.div
            animate={{ y: [0, -4, 0], rotateZ: [0, 2, 0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={32} strokeWidth={1.5} className="text-black/60" />
          </motion.div>
        </div>

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: "20%",
              transform: "translateZ(12px)",
              boxShadow: "0 2px 8px rgba(251, 191, 36, 0.4)",
            }}
            animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}

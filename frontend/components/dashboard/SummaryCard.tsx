"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface SummaryCardProps {
  icon: LucideIcon;
  iconBg: string;
  label: string;
  value: string;
  accent?: string;
}

export function SummaryCard({ icon: Icon, iconBg, label, value, accent }: SummaryCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-5 border border-black/5"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={20} strokeWidth={2.5} className="text-white" />
        </div>
        <div>
          <div className="text-xs text-black/50 mb-0.5">{label}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl tracking-tight" style={{ fontWeight: 600 }}>
              {value}
            </span>
            {accent && (
              <span className="text-xs text-black/40 ml-1">{accent}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

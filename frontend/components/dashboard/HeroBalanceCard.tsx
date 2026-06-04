"use client";

import { TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface HeroBalanceCardProps {
  eurBalance: number;
  copBalance: number;
  monthlyChange: number;
  savingsData: { month: string; amount: number }[];
}

export function HeroBalanceCard({
  eurBalance,
  copBalance,
  monthlyChange,
  savingsData,
}: HeroBalanceCardProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl shadow-soft">
      <div className="px-8 pt-8 pb-4">
        <p className="text-xs font-medium text-purple-200 mb-3 tracking-wide">Balance Total</p>

        <div className="flex items-baseline gap-4 mb-2">
          <h2 className="text-5xl font-bold tracking-[-0.03em] text-white">
            €{eurBalance.toFixed(2)}
          </h2>
          <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-xs font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+€{monthlyChange.toFixed(0)}</span>
          </div>
        </div>

        <div className="text-sm text-purple-300 font-medium">
          +€{monthlyChange.toFixed(0)} este mes &bull; ${copBalance.toLocaleString()} COP
        </div>
      </div>

      <div className="h-16 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={savingsData}>
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#ffffff"
              strokeWidth={1.5}
              fill="url(#heroGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

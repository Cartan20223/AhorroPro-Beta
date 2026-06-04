"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface BalanceCardProps {
  currency: "EUR" | "COP";
  amount: number;
  onDeposit: (currency: "EUR" | "COP") => void;
}

const currencyConfig = {
  EUR: { symbol: "\u20AC", label: "Saldo EUR", color: "bg-primary-50 text-primary-600" },
  COP: { symbol: "$", label: "Saldo COP", color: "bg-accent-50 text-accent-600" },
};

export default function BalanceCard({
  currency,
  amount,
  onDeposit,
}: BalanceCardProps) {
  const config = currencyConfig[currency];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-200 border border-[rgba(0,0,0,0.06)]">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${config.color}`}>
              <Wallet className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-[#6b6b80] uppercase tracking-widest">
              {config.label}
            </p>
          </div>
          <p className="text-3xl font-extrabold tracking-tight text-[#0a0a0f] mb-4">
            {config.symbol}
            {amount.toLocaleString()}
          </p>
          <Button
            size="sm"
            variant="primary"
            onClick={() => onDeposit(currency)}
            className="w-full"
          >
            Depositar {currency}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

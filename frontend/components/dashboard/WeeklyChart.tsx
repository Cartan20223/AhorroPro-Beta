"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface WeeklyChartProps {
  data: { day: string; value: number }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-soft">
      <div className="mb-6">
        <h3 className="text-lg font-bold tracking-tight text-[#111827]">Actividad Semanal</h3>
        <p className="text-xs font-medium text-[#6B7280] mt-0.5">Recargas diarias</p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} tickFormatter={(v) => `€${v}`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "12px",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#F9FAFB" }}
            itemStyle={{ color: "#F9FAFB" }}
            formatter={(value) => [`€${Number(value).toFixed(2)}`, "Recargado"]}
          />
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
          <Bar dataKey="value" fill="url(#colorBar)" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
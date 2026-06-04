"use client";

interface StatItem {
  faIcon: string;
  label: string;
  value: string;
  change: string;
  bg: string;
  iconColor: string;
}

interface StatsGridProps {
  stats: StatItem[];
  isLoading?: boolean;
}

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-soft animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-7 w-20 bg-gray-100 rounded" />
              </div>
              <div className="w-9 h-9 bg-gray-100 rounded-lg" />
            </div>
            <div className="h-3 w-12 bg-gray-50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-soft transition-all flex flex-col"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs font-medium text-[#4B5563] mb-1">{stat.label}</p>
              <p className="text-2xl font-bold tracking-[-0.03em] text-[#111827]">{stat.value}</p>
            </div>
            <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center ${stat.iconColor} text-sm flex-shrink-0`}>
              <i className={stat.faIcon} />
            </div>
          </div>
          <p className="text-xs text-[#4B5563] font-medium mt-auto">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}

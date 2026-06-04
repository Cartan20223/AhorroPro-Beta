"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Award, History, Target, Settings, X } from "lucide-react";
import { useUIStore } from "@/lib/store";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Award, label: "Logros", href: "/logros" },
  { icon: History, label: "Historial", href: "/history" },
  { icon: Target, label: "Metas", href: "/achievements" },
  { icon: Settings, label: "Ajustes", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100
          flex flex-col transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          w-64 lg:w-20
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 lg:hidden">
          <span className="text-lg font-bold" style={{ color: "#2D3142" }}>Menú</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center gap-2 py-6">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  relative group flex items-center justify-start lg:justify-center
                  w-[calc(100%-16px)] lg:w-14 h-14
                  mx-2 lg:mx-0
                  px-4 lg:px-0
                  rounded-2xl transition-all
                  ${isActive
                    ? "bg-gradient-to-br from-purple-500 to-purple-600 shadow-soft"
                    : "hover:bg-gray-50 text-gray-600"
                  }
                `}
              >
                <item.icon
                  className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-white" : "text-gray-600"}`}
                  strokeWidth={2}
                />
                <span className={`ml-4 text-sm font-semibold lg:hidden ${isActive ? "text-white" : "text-gray-700"}`}>
                  {item.label}
                </span>
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 hidden lg:block">
                  {item.label}
                </div>
                {isActive && (
                  <div className="absolute -left-1 w-1 h-8 bg-purple-600 rounded-r-full hidden lg:block" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

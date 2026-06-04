"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useUIStore } from "@/lib/store";

export function Header() {
  const { toggleSidebar } = useUIStore();

  return (
    <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-5 flex items-center">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 mr-3 text-gray-600"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>
      <Link href="/dashboard">
        <span className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: "#2D3142" }}>AhorroPro</span>
      </Link>
    </div>
  );
}

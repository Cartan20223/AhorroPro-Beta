"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import { User, LogOut, ChevronRight } from "lucide-react";

const settingsSections = [
  {
    title: "Cuenta",
    items: [
      { icon: User, label: "Información personal", href: "/profile" },
    ],
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await logoutUser();
    router.push("/");
  }

  return (
    <div className="px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Ajustes</h1>

        <div className="space-y-8">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
                {section.title}
              </h2>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {section.items.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                      index < section.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                      <item.icon size={20} className="text-gray-600" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-900">{item.label}</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              Sesión
            </h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-4 p-4 hover:bg-red-50 transition-colors w-full text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <LogOut size={20} className="text-red-500" />
                </div>
                <span className="flex-1 text-sm font-medium text-red-600">
                  {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                </span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

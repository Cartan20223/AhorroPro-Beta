"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { registerUser } from "@/lib/auth";
import { ApiClientError } from "@/lib/api";
import {
  HappyEnvelope,
  GoldCoin,
  LoginStarBadge,
  LoginSmallBadge,
  Confetti,
  ConfettiSpiral,
} from "@/components/svg/login";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(name, email, password);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError("Algo salió mal. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ fontFamily: "'Satoshi', -apple-system, sans-serif" }}
    >
      {/* ── LEFT: Register Form ── */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-12 relative z-10">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <h1
              className="animate-pop-in pop-in-delay-1 text-4xl font-black tracking-tight leading-none mb-2"
              style={{ color: "#111", letterSpacing: "-0.03em" }}
            >
              Crea tu cuenta.
            </h1>
            <p className="animate-pop-in pop-in-delay-2 text-sm font-medium" style={{ color: "#888" }}>
              Comienza tu viaje de ahorro hoy.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="animate-pop-in pop-in-delay-2 mb-4 px-4 py-3 rounded-2xl bg-red-50 border border-red-100">
              <p className="text-xs font-bold text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div className="animate-pop-in pop-in-delay-2 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#888" }}>
Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez"
                required
                className="w-full rounded-2xl px-4 py-3.5 text-sm font-medium border-2 outline-none transition-all placeholder:text-gray-300"
                style={{
                  borderColor: name ? "#111" : "rgba(0,0,0,0.09)",
                  backgroundColor: "#fafafa",
                  color: "#111",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#111")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = name ? "#111" : "rgba(0,0,0,0.09)")
                }
              />
            </div>

            {/* Email */}
            <div className="animate-pop-in pop-in-delay-2 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#888" }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@ejemplo.com"
                required
                className="w-full rounded-2xl px-4 py-3.5 text-sm font-medium border-2 outline-none transition-all placeholder:text-gray-300"
                style={{
                  borderColor: email ? "#111" : "rgba(0,0,0,0.09)",
                  backgroundColor: "#fafafa",
                  color: "#111",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#111")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = email ? "#111" : "rgba(0,0,0,0.09)")
                }
              />
            </div>

            {/* Password */}
            <div className="animate-pop-in pop-in-delay-3 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#888" }}>
Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="w-full rounded-2xl px-4 py-3.5 pr-12 text-sm font-medium border-2 outline-none transition-all placeholder:text-gray-300"
                  style={{
                    borderColor: password ? "#111" : "rgba(0,0,0,0.09)",
                    backgroundColor: "#fafafa",
                    color: "#111",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#111")}
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = password ? "#111" : "rgba(0,0,0,0.09)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="animate-pop-in pop-in-delay-4 w-full rounded-2xl py-4 text-sm font-black uppercase tracking-widest text-white flex items-center justify-center gap-2 transition-all hover:opacity-85 active:scale-[0.97]"
              style={{
                backgroundColor: "#111",
                letterSpacing: "0.08em",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creando cuenta…
                </>
              ) : (
                <>
                  Crear Cuenta
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Sign in */}
          <p className="animate-pop-in pop-in-delay-5 text-center text-xs font-medium mt-8" style={{ color: "#888" }}>
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="font-black hover:underline"
              style={{ color: "#111" }}
            >
Iniciar sesión
            </Link>
          </p>
        </div>
      </div>

      {/* ── RIGHT: Illustration Panel ── */}
      <div
        className="hidden md:flex w-1/2 relative overflow-hidden"
        style={{ backgroundColor: "#BDEFD4" }}
      >
        {/* Subtle dot grid background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Large soft circle blobs */}
        <div
          className="absolute rounded-full"
          style={{ width: 420, height: 420, backgroundColor: "#A8E6C5", top: -80, right: -100 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 280, height: 280, backgroundColor: "#A0DFB9", bottom: -60, left: -40 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 160, height: 160, backgroundColor: "#C8F5DE", bottom: 120, right: 40 }}
        />

        {/* Floating illustrations */}
        <div className="absolute" style={{ top: "34%", left: "50%", transform: "translateX(-50%)", animation: "floatY10 5s ease-in-out 0s infinite" }}>
          <HappyEnvelope size={130} tilt={-4} />
        </div>
        <div className="absolute" style={{ top: "8%", right: "14%", animation: "floatY10 4.2s ease-in-out 0.8s infinite" }}>
          <HappyEnvelope size={72} tilt={12} />
        </div>
        <div className="absolute" style={{ top: "10%", left: "12%", animation: "floatY10 3.8s ease-in-out 0.4s infinite" }}>
          <LoginStarBadge size={80} />
        </div>
        <div className="absolute" style={{ top: "52%", left: "8%", animation: "floatY10 4.5s ease-in-out 1.2s infinite" }}>
          <LoginSmallBadge size={52} />
        </div>
        <div className="absolute" style={{ top: "22%", left: "28%", animation: "floatY10 3.6s ease-in-out 0.2s infinite" }}>
          <GoldCoin size={58} />
        </div>
        <div className="absolute" style={{ bottom: "22%", right: "18%", animation: "floatY10 4.8s ease-in-out 1.5s infinite" }}>
          <GoldCoin size={46} />
        </div>
        <div className="absolute" style={{ bottom: "12%", left: "30%", animation: "floatY10 3.9s ease-in-out 0.7s infinite" }}>
          <GoldCoin size={38} />
        </div>

        {/* Confetti pieces */}
        <div className="absolute" style={{ top: "6%", left: "40%", animation: "floatY7 3.5s ease-in-out 0.3s infinite" }}>
          <Confetti color="#FF6B6B" w={12} h={6} rotate={25} />
        </div>
        <div className="absolute" style={{ top: "14%", left: "58%", animation: "floatY7 4.1s ease-in-out 1.1s infinite" }}>
          <Confetti color="#FFD700" w={8} h={8} rotate={0} />
        </div>
        <div className="absolute" style={{ top: "18%", right: "8%", animation: "floatY7 3.7s ease-in-out 0.6s infinite" }}>
          <Confetti color="#7C3AED" w={14} h={5} rotate={-30} />
        </div>
        <div className="absolute" style={{ top: "30%", right: "6%", animation: "floatY7 4.4s ease-in-out 0.9s infinite" }}>
          <Confetti color="#FF6B6B" w={6} h={12} rotate={15} />
        </div>
        <div className="absolute" style={{ top: "4%", left: "24%", animation: "floatY7 3.3s ease-in-out 0.1s infinite" }}>
          <Confetti color="#34D399" w={10} h={4} rotate={-15} />
        </div>
        <div className="absolute" style={{ top: "46%", right: "28%", animation: "floatY7 4.2s ease-in-out 1.4s infinite" }}>
          <Confetti color="#FBBF24" w={7} h={7} rotate={45} />
        </div>
        <div className="absolute" style={{ top: "60%", left: "18%", animation: "floatY7 3.8s ease-in-out 0.5s infinite" }}>
          <Confetti color="#F472B6" w={12} h={5} rotate={-20} />
        </div>
        <div className="absolute" style={{ top: "68%", right: "10%", animation: "floatY7 4.6s ease-in-out 1.8s infinite" }}>
          <ConfettiSpiral color="#7C3AED" size={20} />
        </div>
        <div className="absolute" style={{ top: "76%", left: "44%", animation: "floatY7 3.4s ease-in-out 0.3s infinite" }}>
          <ConfettiSpiral color="#FF6B6B" size={16} />
        </div>
        <div className="absolute" style={{ bottom: "8%", left: "14%", animation: "floatY7 4.0s ease-in-out 1.0s infinite" }}>
          <Confetti color="#FFD700" w={14} h={6} rotate={30} />
        </div>
        <div className="absolute" style={{ bottom: "6%", right: "34%", animation: "floatY7 3.6s ease-in-out 0.7s infinite" }}>
          <Confetti color="#34D399" w={8} h={8} rotate={-45} />
        </div>
        <div className="absolute" style={{ bottom: "18%", right: "4%", animation: "floatY7 4.3s ease-in-out 1.3s infinite" }}>
          <Confetti color="#FBBF24" w={6} h={14} rotate={10} />
        </div>
        <div className="absolute" style={{ bottom: "32%", left: "5%", animation: "floatY7 3.9s ease-in-out 0.2s infinite" }}>
          <ConfettiSpiral color="#F472B6" size={18} />
        </div>
        <div className="absolute" style={{ bottom: "40%", right: "32%", animation: "floatY7 5s ease-in-out 2s infinite" }}>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFD700" }} />
        </div>
        <div className="absolute" style={{ top: "42%", left: "32%", animation: "floatY7 4.7s ease-in-out 1.6s infinite" }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B6B" }} />
        </div>

      </div>
    </div>
  );
}

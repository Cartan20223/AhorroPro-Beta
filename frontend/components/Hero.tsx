"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

function FlatStar({ className, color = "#FFD700" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path d="M20 2L25.36 14.64L38 16.36L28.64 25.36L30.72 38L20 31.64L9.28 38L11.36 25.36L2 16.36L14.64 14.64L20 2Z" fill={color} />
    </svg>
  );
}

function FlatCircle({ className, color = "#4ECDC4" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" fill={color} />
    </svg>
  );
}

function FlatSquare({ className, color = "#FF6B6B" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <rect x="2" y="2" width="36" height="36" rx="4" fill={color} />
    </svg>
  );
}

function FlatRhombus({ className, color = "#9B59B6" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <rect x="3" y="3" width="34" height="34" rx="3" fill={color} transform="rotate(45 20 20)" />
    </svg>
  );
}

const floatY = (dur: number, delay = 0, dist = 14) => ({
  y: [0, -dist, 0],
  transition: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
});

export function Hero() {
  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden max-w-none px-8">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <span className="text-lg font-extrabold tracking-[-0.02em]" style={{ color: "#111111" }}>AhorroPro</span>
            <a href="https://www.linkedin.com/in/davidquinteroaaa/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#111111">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-black transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 bg-black text-white rounded-2xl text-sm font-bold hover:scale-105 transition-all active:scale-95 shadow-lg"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      {/* ── LEFT CLUSTER ── */}
      <div className="absolute hidden xl:block pointer-events-none" style={{ left: "1%", top: "50%", transform: "translateY(-50%)", width: "32%" }}>
        <div className="relative w-full h-[780px]">
          {/* Foreground — large characters */}
          <motion.div animate={floatY(5, 0, 18)} className="absolute z-[8]" style={{ top: "-4%", left: "-2%", width: "clamp(150px, 16vw, 230px)" }}>
            <DotLottieReact src="/animations/6185b7e0-1184-11ee-94c9-47b9a5066134.lottie" loop autoplay className="w-full" />
          </motion.div>
          <motion.div animate={floatY(5.5, 1.2, 16)} className="absolute z-[8]" style={{ top: "24%", right: "-6%", width: "clamp(130px, 14vw, 200px)" }}>
            <DotLottieReact src="/animations/d362e9d6-1176-11ee-bf0d-0f0ae27863d0.lottie" loop autoplay className="w-full" />
          </motion.div>
          <motion.div animate={floatY(4.8, 0.5, 14)} className="absolute z-[8]" style={{ top: "46%", left: "-4%", width: "clamp(140px, 15vw, 210px)" }}>
            <DotLottieReact src="/animations/411fee70-117b-11ee-b0ba-8f210e8a89aa.lottie" loop autoplay className="w-full" />
          </motion.div>
          <motion.div animate={floatY(4, 1.8, 12)} className="absolute z-[8]" style={{ top: "70%", left: "5%", width: "clamp(145px, 15vw, 220px)" }}>
            <DotLottieReact src="/animations/20d7737c-118a-11ee-823e-077777312ecc.lottie" loop autoplay className="w-full" />
          </motion.div>

          {/* Midground — medium supporting elements */}
          <motion.div animate={{ x: [0, 12, 0, -12, 0], y: [0, -16, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute z-[6]" style={{ top: "8%", right: "-8%", width: "clamp(110px, 12vw, 175px)" }}>
            <DotLottieReact src="/animations/d36b3654-1176-11ee-bf16-1b3402f8072a.lottie" loop autoplay className="w-full" />
          </motion.div>

          {/* Background — large shapes, reduced intensity */}
          <motion.div animate={{ y: [0, -28, 0], rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} className="absolute z-[4] opacity-50" style={{ top: "10%", left: "30%", width: "clamp(50px, 5vw, 70px)" }}>
            <FlatCircle className="w-full" color="#B8ECD0" />
          </motion.div>
          <motion.div animate={{ y: [0, -22, 0], rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute z-[4] opacity-40" style={{ bottom: "18%", left: "-6%", width: "clamp(40px, 4vw, 55px)" }}>
            <FlatStar className="w-full" color="#FF69B4" />
          </motion.div>
          <motion.div animate={{ y: [0, -18, 0], rotate: [0, -12, 0, 12, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute z-[4] opacity-40" style={{ top: "40%", right: "-10%", width: "clamp(45px, 5vw, 65px)" }}>
            <FlatSquare className="w-full" color="#FFD700" />
          </motion.div>
          <motion.div animate={{ y: [0, -16, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute z-[4] opacity-35" style={{ bottom: "40%", left: "25%", width: "clamp(35px, 3.5vw, 50px)" }}>
            <FlatRhombus className="w-full" color="#4ECDC4" />
          </motion.div>
          <motion.div animate={{ y: [0, -24, 0], rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute z-[4] opacity-30" style={{ top: "68%", left: "40%", width: "clamp(50px, 5vw, 70px)" }}>
            <FlatStar className="w-full" color="#FF6B6B" />
          </motion.div>
          <motion.div animate={{ y: [0, -14, 0], rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5 }} className="absolute z-[4] opacity-25" style={{ top: "-2%", left: "25%", width: "clamp(60px, 6vw, 80px)" }}>
            <FlatRhombus className="w-full" color="#3B82F6" />
          </motion.div>
          <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.15, 1] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} className="absolute z-[4] opacity-35" style={{ bottom: "10%", left: "45%", width: "clamp(40px, 4vw, 55px)" }}>
            <FlatCircle className="w-full" color="#FF69B4" />
          </motion.div>
          <motion.div animate={{ y: [0, -18, 0], rotate: [0, -18, 0, 18, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.8 }} className="absolute z-[4] opacity-30" style={{ top: "76%", right: "0%", width: "clamp(45px, 4.5vw, 60px)" }}>
            <FlatSquare className="w-full" color="#F97316" />
          </motion.div>
        </div>
      </div>

      {/* ── CENTER CONTENT ── */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 font-inter tracking-tighter text-black"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            letterSpacing: "-0.06em",
            lineHeight: 0.95,
            fontWeight: 600,
          }}
        >
          Guarda Dinero
          <br />
          De Forma Segura
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 mx-auto max-w-xl text-lg md:text-xl leading-relaxed text-gray-600 font-semibold"
        >
          Gestiona tus sobres virtuales en multiples divisas.
          Alcanzar tus objetivos financieros nunca habia sido tan facil
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href="/register"
            className="px-10 py-5 bg-black text-white rounded-2xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95 text-lg font-bold"
          >
            Empezar
          </Link>
          <button
            className="px-8 py-5 bg-gray-100 text-gray-800 rounded-2xl transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 flex items-center gap-3 text-lg font-semibold"
          >
            <i className="fa-brands fa-apple text-xl" />
            Proximamente en IOS
          </button>
        </motion.div>
      </div>

      {/* ── RIGHT CLUSTER ── */}
      <div className="absolute hidden xl:block pointer-events-none" style={{ right: "1%", top: "50%", transform: "translateY(-50%)", width: "32%" }}>
        <div className="relative w-full h-[780px]">
          {/* Foreground — large characters */}
          <motion.div animate={floatY(4.5, 0, 20)} className="absolute z-[8]" style={{ top: "-4%", right: "-2%", width: "clamp(150px, 16vw, 230px)" }}>
            <DotLottieReact src="/animations/a1f21ae4-a4a5-11ee-a365-87349329ccc2.lottie" loop autoplay className="w-full" />
          </motion.div>
          <motion.div animate={{ x: [0, 12, 0, -12, 0], y: [0, -16, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute z-[8]" style={{ top: "38%", right: "-6%", width: "clamp(135px, 14vw, 205px)" }}>
            <DotLottieReact src="/animations/aaf1af08-1164-11ee-80ef-a306ae460eeb.lottie" loop autoplay className="w-full" />
          </motion.div>
          <motion.div animate={floatY(4, 1.8, 12)} className="absolute z-[8]" style={{ top: "64%", left: "0%", width: "clamp(125px, 13vw, 190px)" }}>
            <DotLottieReact src="/animations/91a3fdd8-1152-11ee-be45-cbb1212e1643.lottie" loop autoplay className="w-full" />
          </motion.div>
          <motion.div animate={floatY(4.8, 0.5, 14)} className="absolute z-[8]" style={{ top: "72%", right: "2%", width: "clamp(150px, 16vw, 225px)" }}>
            <DotLottieReact src="/animations/b21f89f7-2fcd-461e-9eb9-b3b30532c6fe.lottie" loop autoplay className="w-full" />
          </motion.div>

          {/* Midground — medium supporting elements */}
          <motion.div animate={floatY(5.2, 1.0, 16)} className="absolute z-[6]" style={{ top: "12%", left: "-6%", width: "clamp(110px, 12vw, 170px)" }}>
            <DotLottieReact src="/animations/0a406af8-116f-11ee-962c-5b57ee5a27e0.lottie" loop autoplay className="w-full" />
          </motion.div>

          {/* Background — large shapes, reduced intensity */}
          <motion.div animate={{ y: [0, -26, 0], rotate: [0, 20, 0, -20, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="absolute z-[4] opacity-40" style={{ top: "2%", left: "8%", width: "clamp(55px, 5.5vw, 75px)" }}>
            <FlatStar className="w-full" color="#FFD700" />
          </motion.div>
          <motion.div animate={{ y: [0, -20, 0], rotate: [0, -12, 0, 12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute z-[4] opacity-35" style={{ bottom: "22%", right: "-5%", width: "clamp(45px, 4.5vw, 60px)" }}>
            <FlatRhombus className="w-full" color="#B8ECD0" />
          </motion.div>
          <motion.div animate={{ y: [0, -16, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute z-[4] opacity-40" style={{ top: "52%", left: "-8%", width: "clamp(40px, 4vw, 55px)" }}>
            <FlatCircle className="w-full" color="#FF69B4" />
          </motion.div>
          <motion.div animate={{ y: [0, -18, 0], rotate: 360 }} transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 0.5 }} className="absolute z-[4] opacity-30" style={{ bottom: "38%", right: "5%", width: "clamp(35px, 3.5vw, 50px)" }}>
            <FlatSquare className="w-full" color="#9B59B6" />
          </motion.div>
          <motion.div animate={{ y: [0, -22, 0], rotate: [0, 14, 0, -14, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute z-[4] opacity-35" style={{ top: "22%", right: "-5%", width: "clamp(40px, 4vw, 55px)" }}>
            <FlatSquare className="w-full" color="#F97316" />
          </motion.div>
          <motion.div animate={{ y: [0, -16, 0], scale: [1, 1.18, 1] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute z-[4] opacity-30" style={{ top: "85%", left: "20%", width: "clamp(45px, 4.5vw, 60px)" }}>
            <FlatCircle className="w-full" color="#3B82F6" />
          </motion.div>
          <motion.div animate={{ y: [0, -28, 0], rotate: [0, -10, 0, 10, 0] }} transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 2.2 }} className="absolute z-[4] opacity-25" style={{ top: "6%", right: "35%", width: "clamp(50px, 5vw, 70px)" }}>
            <FlatRhombus className="w-full" color="#FF6B6B" />
          </motion.div>
          <motion.div animate={{ y: [0, -20, 0], rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.2 }} className="absolute z-[4] opacity-35" style={{ bottom: "10%", left: "40%", width: "clamp(35px, 3.5vw, 50px)" }}>
            <FlatStar className="w-full" color="#4ECDC4" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

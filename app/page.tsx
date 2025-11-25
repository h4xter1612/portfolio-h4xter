"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";
import { Lang } from "../data/projects";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* CAPA DE FONDO (gradiente + glow) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Gradiente grande superior / inferior */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.24)_0,_transparent_55%)]" />

        {/* Burbuja central que respira */}
        <motion.div
          className="absolute left-1/2 top-1/3 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/70 blur-[120px] mix-blend-screen"
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [0.9, 1.08, 0.9],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* CONTENIDO (encima del fondo) */}
      <div className="relative z-10">
        <main className="mx-auto max-w-6xl px-5 pb-20 pt-8">
          <HeroSection lang={lang} />
          <ProjectsSection lang={lang} />
          <SkillsSection lang={lang} />
          <ContactSection lang={lang} />
        </main>

        {/* Footer */}
        <footer className="mx-auto max-w-6xl px-5 pb-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Juan Pablo Solís Ruiz · Portfolio
        </footer>

        {/* Switch de idioma flotante abajo a la derecha */}
        <div className="fixed bottom-6 right-6 z-30">
          <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/90 px-1 py-1 text-xs shadow-lg shadow-slate-900/80 backdrop-blur">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 transition ${
                lang === "en"
                  ? "bg-sky-500 text-white"
                  : "text-slate-300 hover:text-sky-300"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={`rounded-full px-2.5 py-1 transition ${
                lang === "es"
                  ? "bg-sky-500 text-white"
                  : "text-slate-300 hover:text-sky-300"
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


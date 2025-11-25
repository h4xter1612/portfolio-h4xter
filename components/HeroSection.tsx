"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Lang } from "../data/projects";

interface HeroSectionProps {
  lang: Lang;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const isEn = lang === "en";

  return (
    <motion.section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center gap-8 text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Chip */}
      <motion.div
        className="rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1 text-xs font-medium text-sky-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        {isEn ? "B.S. in Engineering Physics" : "Ingeniería Física Industrial"}
      </motion.div>

      {/* Título + subtítulo */}
      <div className="space-y-4">
        <h1 className="bg-gradient-to-r from-sky-300 via-sky-100 to-purple-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
          Juan Pablo Solís Ruiz
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-200 md:text-lg">
          {isEn
            ? "Bridging theoretical physics and practical engineering to solve complex problems through computation, experimentation, and innovation."
            : "Uniendo la física teórica y la ingeniería aplicada para resolver problemas complejos mediante cómputo, experimentación e innovación."}
        </p>
      </div>

      {/* Botones principales */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-full bg-sky-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 hover:bg-sky-400"
        >
          {isEn ? "View Projects" : "Ver Proyectos"}
        </a>
        <a
          href="/cv/JuanPabloSolis_CV.pdf"
          className="rounded-full border border-slate-600 bg-slate-950/70 px-7 py-2.5 text-sm font-semibold text-slate-100 shadow-sm transition hover:border-sky-400 hover:bg-slate-900"
          download
        >
          {isEn ? "Download CV" : "Descargar CV"}
        </a>
      </div>

      {/* Social icons */}
      <div className="mt-2 flex gap-4">
        <SocialIcon
          href="https://github.com/h4xter1612"
          label="GitHub"
          Icon={Github}
        />
        <SocialIcon
          href="https://www.linkedin.com/in/tu-perfil"
          label="LinkedIn"
          Icon={Linkedin}
        />
        <SocialIcon
          href="mailto:tu.correo@example.com"
          label="Email"
          Icon={Mail}
        />
      </div>
    </motion.section>
  );
}

interface SocialIconProps {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

function SocialIcon({ href, label, Icon }: SocialIconProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:border-sky-400 hover:bg-slate-900"
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-0 bg-gradient-to-tr from-sky-500/40 to-purple-500/40 group-hover:opacity-100 transition" />
      <Icon className="relative h-4 w-4 group-hover:text-sky-100" />
    </a>
  );
}


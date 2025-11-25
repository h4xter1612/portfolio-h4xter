import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  FlaskConical,
  Ruler,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Lang } from "../data/projects";

interface SkillsSectionProps {
  lang: Lang;
}

export default function SkillsSection({ lang }: SkillsSectionProps) {
  const isEn = lang === "en";

  const cards = [
    {
      icon: Code2,
      title: isEn ? "Programming" : "Programación",
      items: ["Python", "MATLAB", "C++", "Julia"],
      gradient: "from-sky-400 to-cyan-300",
    },
    {
      icon: Cpu,
      title: isEn ? "Simulation & Modeling" : "Simulación y Modelado",
      items: ["MHD", "PIC", "Finite Difference", "Finite Volume"],
      gradient: "from-purple-400 to-sky-300",
    },
    {
      icon: FlaskConical,
      title: isEn ? "Experimental Physics" : "Física Experimental",
      items: ["Plasmas", "Optics", "Instrumentation"],
      gradient: "from-pink-400 to-orange-300",
    },
    {
      icon: Ruler,
      title: isEn ? "Engineering Design" : "Diseño de Ingeniería",
      items: ["CAD", "Prototyping", "RF/Antennas"],
      gradient: "from-amber-400 to-lime-300",
    },
    {
      icon: BarChart3,
      title: isEn ? "Data Analysis" : "Análisis de Datos",
      items: ["Statistics", "Visualization", "Machine Learning (basic)"],
      gradient: "from-emerald-400 to-teal-300",
    },
    {
      icon: Sparkles,
      title: isEn ? "Specialized" : "Especializado",
      items: ["Fusion & Plasmas", "Numerical Methods", "Scientific Computing"],
      gradient: "from-indigo-400 to-purple-300",
    },
  ];

  return (
    <motion.section
      id="skills"
      className="scroll-mt-28 min-h-screen flex flex-col justify-center py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-semibold text-sky-400 md:text-5xl">
            {isEn ? "Skills & Expertise" : "Habilidades y Experiencia"}
          </h2>
          <p className="text-sm text-slate-300 md:text-base">
            {isEn
              ? "Multidisciplinary toolkit spanning computation, experimentation, and theory."
              : "Conjunto multidisciplinario que abarca cómputo, experimentación y teoría."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900/85 p-5 shadow-md transition hover:-translate-y-1 hover:border-sky-400/70 hover:shadow-sky-500/30"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.06 * idx }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${card.gradient} text-slate-950 shadow-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                    {card.title}
                  </h3>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 md:text-sm">
                  {card.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}


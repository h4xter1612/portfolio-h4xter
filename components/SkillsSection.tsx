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
      title: isEn
        ? "Programming & Scientific Computing"
        : "Programación y Cómputo Científico",
      items: [
        "Python, Julia, MATLAB, C++",
        isEn ? "NumPy, SciPy, Pandas, Matplotlib" : "NumPy, SciPy, Pandas, Matplotlib",
        isEn
          ? "Reproducible scientific workflows"
          : "Flujos de trabajo científicos reproducibles",
      ],
      gradient: "from-sky-400 to-cyan-300",
    },
    {
      icon: Cpu,
      title: isEn ? "Simulation & Modelling" : "Simulación y Modelado",
      items: [
        isEn
          ? "PIC, MHD and two-fluid plasma models"
          : "Modelos de plasma PIC, MHD y dos fluidos",
        isEn
          ? "Numerical methods for ODEs/PDEs"
          : "Métodos numéricos para EDOs/EDPs",
        isEn
          ? "Geant4 and spectral/Fourier tools"
          : "Geant4 y herramientas espectrales/Fourier",
      ],
      gradient: "from-purple-400 to-sky-300",
    },
    {
      icon: Sparkles,
      title: isEn ? "Fusion & Plasma Physics" : "Fusión y Física de Plasmas",
      items: [
        isEn
          ? "Tokamak and Z-pinch equilibria"
          : "Equilibrios en tokamaks y Z-pinch",
        isEn
          ? "Waves, instabilities and dispersion"
          : "Ondas, inestabilidades y dispersión",
        isEn
          ? "Grad–Shafranov and FreeGSNKE"
          : "Grad–Shafranov y FreeGSNKE",
      ],
      gradient: "from-indigo-400 to-purple-300",
    },
    {
      icon: Ruler,
      title: isEn
        ? "RF, Antennas & Experimental"
        : "RF, Antenas y Experimental",
      items: [
        isEn
          ? "CubeSat S-band RF links"
          : "Enlaces RF en banda S para CubeSat",
        isEn
          ? "Patch and fractal antennas (KiCad)"
          : "Antenas patch y fractales (KiCad)",
        isEn
          ? "Optics and basic instrumentation"
          : "Óptica e instrumentación básica",
      ],
      gradient: "from-amber-400 to-lime-300",
    },
    {
      icon: BarChart3,
      title: isEn ? "Data Science & Analysis" : "Ciencia de Datos y Análisis",
      items: [
        isEn
          ? "Statistical modelling and EDA"
          : "Modelado estadístico y análisis exploratorio",
        isEn
          ? "Basic ML (regression, classification)"
          : "ML básico (regresión, clasificación)",
        isEn
          ? "Scientific data visualisation"
          : "Visualización de datos científicos",
      ],
      gradient: "from-emerald-400 to-teal-300",
    },
    {
      icon: FlaskConical,
      title: isEn ? "Research & Collaboration" : "Investigación y Colaboración",
      items: [
        isEn
          ? "Independent fusion/plasma projects"
          : "Proyectos independientes en fusión/plasmas",
        isEn
          ? "Interdisciplinary teams (GeoStats, CubeSat)"
          : "Equipos interdisciplinarios (GeoStats, CubeSat)",
        isEn
          ? "Mentoring and physics tutoring"
          : "Mentoría y tutoría en física",
      ],
      gradient: "from-pink-400 to-orange-300",
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
              ? "Skills focused on fusion and plasma physics: simulation codes, RF/antennas and data analysis."
              : "Habilidades enfocadas en fusión y plasmas: códigos de simulación, RF/antenas y análisis de datos."}
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


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
        "Python, MATLAB, Julia, C++",
        "NumPy, SciPy, Pandas, Matplotlib",
        isEn
          ? "Optimisation and scientific simulation workflows"
          : "Optimización y flujos de trabajo para simulación científica",
      ],
      gradient: "from-sky-400 to-cyan-300",
    },
    {
      icon: Cpu,
      title: isEn ? "Simulation & Modelling" : "Simulación y Modelado",
      items: [
        isEn
          ? "Custom PIC, MHD and two-fluid plasma codes"
          : "Códigos propios PIC, MHD y de plasma de dos fluidos",
        isEn
          ? "Numerical methods for ODEs and PDEs"
          : "Métodos numéricos para EDOs y EDPs",
        isEn
          ? "Geant4 for radiation transport and imaging"
          : "Geant4 para transporte de radiación e imagenología",
        isEn
          ? "Fourier and spectral techniques"
          : "Técnicas de Fourier y métodos espectrales",
      ],
      gradient: "from-purple-400 to-sky-300",
    },
    {
      icon: Sparkles,
      title: isEn ? "Fusion & Plasma Physics" : "Fusión y Física de Plasmas",
      items: [
        isEn
          ? "Tokamak and Z-pinch equilibria and stability"
          : "Equilibrios y estabilidad en tokamaks y Z-pinch",
        isEn
          ? "Plasma waves, instabilities and dispersion relations"
          : "Ondas, inestabilidades y relaciones de dispersión en plasmas",
        isEn
          ? "Grad–Shafranov and equilibrium tools (FreeGSNKE)"
          : "Herramientas de equilibrio tipo Grad–Shafranov (FreeGSNKE)",
      ],
      gradient: "from-indigo-400 to-purple-300",
    },
    {
      icon: Ruler,
      title: isEn
        ? "RF, Antennas & Experimental Skills"
        : "RF, Antenas y Habilidades Experimentales",
      items: [
        isEn
          ? "Basic RF link design (S-band CubeSat prototype)"
          : "Diseño básico de enlaces RF (prototipo CubeSat en banda S)",
        isEn
          ? "Patch and fractal antennas on FR4 (KiCad)"
          : "Antenas patch y fractales en FR4 (KiCad)",
        isEn
          ? "Optical lab techniques (interferometry, diffraction, spectroscopy)"
          : "Técnicas de laboratorio óptico (interferometría, difracción, espectroscopía)",
        isEn
          ? "Basic electronics and instrumentation"
          : "Electrónica básica e instrumentación",
      ],
      gradient: "from-amber-400 to-lime-300",
    },
    {
      icon: BarChart3,
      title: isEn ? "Data Science & Analysis" : "Ciencia de Datos y Análisis",
      items: [
        isEn
          ? "Statistical modelling and exploratory data analysis"
          : "Modelado estadístico y análisis exploratorio de datos",
        isEn
          ? "Basic machine learning (regression, classification)"
          : "Aprendizaje automático básico (regresión, clasificación)",
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
          ? "Independent research projects in fusion and plasma physics"
          : "Proyectos independientes en fusión y física de plasmas",
        isEn
          ? "Experience with interdisciplinary teams (GeoStats, CubeSat comms)"
          : "Experiencia con equipos interdisciplinarios (GeoStats, comunicaciones CubeSat)",
        isEn
          ? "Mentoring and tutoring in physics"
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
              ? "Toolset tailored to fusion and plasma physics: from custom simulation codes to RF, antennas and data analysis."
              : "Conjunto de herramientas orientado a fusión y plasmas: desde códigos de simulación propios hasta RF, antenas y análisis de datos."}
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


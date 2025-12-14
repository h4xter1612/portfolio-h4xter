// components/ProjectsSection.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, type Lang, type Project, type ProjectCategory, type ProjectType } from "../data/projects";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

interface ProjectsSectionProps {
  lang: Lang;
}

const categoryLabels: Record<ProjectCategory, { en: string; es: string }> = {
  "Fusion & Plasma": { en: "Fusion & Plasma", es: "Fusión y plasmas" },
  "Optics & Photonics": { en: "Optics & Photonics", es: "Óptica y fotónica" },
  "RF & Antennas": { en: "RF & Antennas", es: "RF y antenas" },
  "Medical Imaging": { en: "Medical Imaging", es: "Imagenología médica" },
  "Materials & Vacuum": { en: "Materials & Vacuum", es: "Materiales y vacío" },
  "Applied Math / Theory": { en: "Applied Math / Theory", es: "Matemática aplicada / teoría" },
};

const typeLabels: Record<ProjectType, { en: string; es: string }> = {
  Simulation: { en: "Simulation", es: "Simulación" },
  Experiment: { en: "Experiment", es: "Experimento" },
  "Engineering Design": { en: "Engineering Design", es: "Diseño de ingeniería" },
  Software: { en: "Software", es: "Software" },
  "Theory / Derivation": { en: "Theory / Derivation", es: "Teoría / derivación" },
  "Data Analysis": { en: "Data Analysis", es: "Análisis de datos" },
};

const ui = {
  title: { en: "Research & Projects", es: "Investigación y Proyectos" },
  subtitle: {
    en: "Selected work across physics, engineering, and computation.",
    es: "Trabajo seleccionado en física, ingeniería y cómputo.",
  },
  allDomains: { en: "All domains", es: "Todas las áreas" },
  allTypes: { en: "All work types", es: "Todos los tipos" },
  details: { en: "View details", es: "Ver detalles" },
  empty: {
    en: "No projects found for these filters.",
    es: "No hay proyectos con estos filtros.",
  },
};

const DOMAIN_ORDER: ProjectCategory[] = [
  "Fusion & Plasma",
  "Optics & Photonics",
  "RF & Antennas",
  "Medical Imaging",
  "Materials & Vacuum",
  "Applied Math / Theory",
];

const TYPE_ORDER: ProjectType[] = [
  "Simulation",
  "Experiment",
  "Engineering Design",
  "Software",
  "Data Analysis",
  "Theory / Derivation",
];

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
  const reduceMotion = useReducedMotion();

  const [activeDomain, setActiveDomain] = useState<"all" | ProjectCategory>("all");
  const [activeType, setActiveType] = useState<"all" | ProjectType>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = (s: { en: string; es: string }) => s[lang];

  const domains = useMemo(() => {
    const present = new Set<ProjectCategory>(projects.map((p) => p.category));
    const ordered = DOMAIN_ORDER.filter((d) => present.has(d));
    return ["all" as const, ...ordered] as const;
  }, []);

  // Projects constrained by current Domain (used to drive the dynamic Type filter)
  const domainProjects = useMemo(() => {
    if (activeDomain === "all") return projects;
    return projects.filter((p) => p.category === activeDomain);
  }, [activeDomain]);

  // Types available within the selected Domain (dynamic)
  const availableTypes = useMemo(() => {
    const present = new Set<ProjectType>();
    domainProjects.forEach((p) => p.types.forEach((tp) => present.add(tp)));

    const ordered = TYPE_ORDER.filter((tp) => present.has(tp));
    return ["all" as const, ...ordered] as const;
  }, [domainProjects]);

  // If the selected type becomes invalid after changing domain, reset to "all"
  useEffect(() => {
    if (activeType === "all") return;
    if (!availableTypes.includes(activeType)) setActiveType("all");
  }, [activeType, availableTypes]);

  const filteredProjects = useMemo(() => {
    return domainProjects.filter((p) => {
      const okType = activeType === "all" ? true : p.types.includes(activeType);
      return okType;
    });
  }, [domainProjects, activeType]);

  return (
    <motion.section
      id="projects"
      className="scroll-mt-28 py-20"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
    >
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-semibold text-sky-400 md:text-5xl">{t(ui.title)}</h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">{t(ui.subtitle)}</p>
        </div>

        {/* Domain filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {domains.map((d) => {
            const isAll = d === "all";
            const label = isAll ? t(ui.allDomains) : t(categoryLabels[d]);
            const active = activeDomain === d;

            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setActiveDomain(d);
                  setActiveType("all");
                }}
                aria-pressed={active}
                className={[
                  "rounded-full border px-4 py-1.5 text-xs font-semibold transition",
                  active
                    ? "border-sky-500 bg-sky-500 text-white shadow shadow-sky-500/30"
                    : "border-slate-700 bg-slate-950/30 text-slate-200 hover:border-sky-500/70 hover:bg-slate-900/40",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Type filter (dynamic). Mobile: dropdown. Desktop: chips */}
        <div className="flex justify-center">
          {/* Desktop/tablet */}
          <div className="hidden flex-wrap justify-center gap-3 sm:flex">
            {availableTypes.map((tp) => {
              const isAll = tp === "all";
              const label = isAll ? t(ui.allTypes) : t(typeLabels[tp]);
              const active = activeType === tp;

              return (
                <button
                  key={tp}
                  type="button"
                  onClick={() => setActiveType(tp)}
                  aria-pressed={active}
                  className={[
                    "rounded-full border px-4 py-1.5 text-xs font-semibold transition",
                    active
                      ? "border-slate-200 bg-slate-200 text-slate-950 shadow"
                      : "border-slate-700 bg-slate-950/30 text-slate-200 hover:border-slate-200/60 hover:bg-slate-900/40",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="w-full max-w-xs sm:hidden">
            <label className="sr-only">{t(ui.allTypes)}</label>
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value as "all" | ProjectType)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
            >
              {availableTypes.map((tp) => (
                <option key={tp} value={tp}>
                  {tp === "all" ? t(ui.allTypes) : t(typeLabels[tp])}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center text-sm text-slate-300">{t(ui.empty)}</div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project) => (
                <motion.button
                  key={project.id}
                  layout
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 text-left shadow-sm ring-1 ring-transparent transition hover:border-slate-700 hover:ring-sky-500/20"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <Image
                      src={project.image}
                      alt={t(project.title)}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                    {/* Domain chip (primary) */}
                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-sky-200 ring-1 ring-slate-700/60 backdrop-blur">
                      {t(categoryLabels[project.category])}
                    </span>

                    {/* Type chip (secondary, first type) */}
                    {project.types?.[0] && (
                      <span className="absolute right-3 top-3 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-semibold text-slate-200 ring-1 ring-slate-700/60 backdrop-blur">
                        {t(typeLabels[project.types[0]])}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-sm font-semibold text-slate-50 md:text-base">{t(project.title)}</h3>
                    <p className="line-clamp-3 text-xs text-slate-300 md:text-sm">{t(project.shortDescription)}</p>

                    <div className="mt-auto pt-2 text-xs font-semibold text-sky-400">
                      {t(ui.details)} <span className="opacity-80">→</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        lang={lang}
        categoryLabels={categoryLabels}
        typeLabels={typeLabels}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}


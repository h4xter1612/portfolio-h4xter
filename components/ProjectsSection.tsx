"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, type Lang, type Project, type ProjectCategory } from "../data/projects";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });

interface ProjectsSectionProps {
  lang: Lang;
}

const categoryLabels: Record<ProjectCategory, { en: string; es: string }> = {
  "Computational Physics": { en: "Computational Physics", es: "Física Computacional" },
  Simulation: { en: "Simulation", es: "Simulación" },
  "Experimental Research": { en: "Experimental Research", es: "Investigación Experimental" },
  "Engineering Design": { en: "Engineering Design", es: "Diseño de Ingeniería" },
  "Data Analysis": { en: "Data Analysis", es: "Análisis de Datos" },
  "Plasma Physics": { en: "Plasma Physics", es: "Física de plasmas" },
};

const ui = {
  title: { en: "Research & Projects", es: "Investigación y Proyectos" },
  subtitle: {
    en: "Selected work across physics, engineering, and computation.",
    es: "Trabajo seleccionado en física, ingeniería y cómputo.",
  },
  all: { en: "All Projects", es: "Todos" },
  details: { en: "View details", es: "Ver detalles" },
  empty: {
    en: "No projects found for this category.",
    es: "No hay proyectos para esta categoría.",
  },
};

const CATEGORY_ORDER: ProjectCategory[] = [
  "Plasma Physics",
  "Computational Physics",
  "Simulation",
  "Engineering Design",
  "Data Analysis",
  "Experimental Research",
];

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = (s: { en: string; es: string }) => s[lang];

  const categories = useMemo(() => {
    const present = new Set<ProjectCategory>(projects.map((p) => p.category));
    const ordered = CATEGORY_ORDER.filter((c) => present.has(c));
    return ["all" as const, ...ordered] as const;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-semibold text-sky-400 md:text-5xl">
            {t(ui.title)}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
            {t(ui.subtitle)}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const isAll = cat === "all";
            const label = isAll ? t(ui.all) : t(categoryLabels[cat]);
            const active = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
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

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center text-sm text-slate-300">
            {t(ui.empty)}
          </div>
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
                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-sky-200 ring-1 ring-slate-700/60 backdrop-blur">
                      {t(categoryLabels[project.category])}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                      {t(project.title)}
                    </h3>
                    <p className="line-clamp-3 text-xs text-slate-300 md:text-sm">
                      {t(project.shortDescription)}
                    </p>

                    <div className="mt-auto pt-2 text-xs font-semibold text-sky-400">
                      {t(ui.details)}{" "}
                      <span className="opacity-80">→</span>
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
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}


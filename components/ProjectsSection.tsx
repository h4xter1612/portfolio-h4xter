"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, Lang, Project, ProjectCategory } from "../data/projects";
import ProjectModal from "./ProjectModal";

interface ProjectsSectionProps {
  lang: Lang;
}

type CategoryFilter = "all" | ProjectCategory;

const CATEGORY_ORDER: ProjectCategory[] = [
  "Plasma Physics",
  "Computational Physics",
  "Simulation",
  "Experimental Research",
  "Engineering Design",
  "Data Analysis",
];

const categoryLabels: Record<ProjectCategory, { en: string; es: string }> = {
  "Computational Physics": { en: "Computational Physics", es: "Física Computacional" },
  Simulation: { en: "Simulation", es: "Simulación" },
  "Experimental Research": { en: "Experimental Research", es: "Investigación Experimental" },
  "Engineering Design": { en: "Engineering Design", es: "Diseño de Ingeniería" },
  "Data Analysis": { en: "Data Analysis", es: "Análisis de Datos" },
  "Plasma Physics": { en: "Plasma Physics", es: "Física de Plasmas" },
};

const ui = {
  title: { en: "Research & Projects", es: "Investigación y Proyectos" },
  subtitle: {
    en: "Selected work at the intersection of physics, engineering, and computation.",
    es: "Trabajo seleccionado en la intersección entre física, ingeniería y cómputo.",
  },
  all: { en: "All", es: "Todos" },
  allProjects: { en: "All Projects", es: "Todos los Proyectos" },
  viewDetails: { en: "View details", es: "Ver detalles" },
};

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = (s: { en: string; es: string }) => s[lang];

  const categoryCounts = useMemo(() => {
    const counts = new Map<ProjectCategory, number>();
    for (const p of projects) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return counts;
  }, []);

  const categories = useMemo<ProjectCategory[]>(() => {
    const present = new Set<ProjectCategory>(projects.map((p) => p.category));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  } as const;

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.45 } },
  } as const;

  return (
    <motion.section
      id="projects"
      className="scroll-mt-28 py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-sky-400 md:text-5xl">
              {t(ui.title)}
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              {t(ui.subtitle)}
            </p>
          </div>

          {/* Filters (mobile scrollable) */}
          <div className="flex items-center justify-center">
            <div className="w-full">
              <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-1 py-1 md:justify-center md:overflow-visible">
                <FilterButton
                  key="all"
                  active={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                  label={lang === "en" ? ui.allProjects.en : ui.allProjects.es}
                  count={projects.length}
                />

                {categories.map((cat) => (
                  <FilterButton
                    key={cat}
                    active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                    label={t(categoryLabels[cat])}
                    count={categoryCounts.get(cat) ?? 0}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filteredProjects.map((project) => {
              const techPreview = project.technologies.slice(0, 3);
              const extraTech = Math.max(0, project.technologies.length - techPreview.length);

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  variants={cardVariants}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-slate-900/70 text-left shadow-sm ring-1 ring-slate-800/80 backdrop-blur transition
                             hover:-translate-y-1 hover:ring-sky-500/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                >
                  {/* subtle glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <div className="absolute -inset-20 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 blur-2xl" />
                  </div>

                  {/* Media */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={t(project.title)}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/0 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-sky-200 ring-1 ring-slate-700/70 backdrop-blur">
                      {t(categoryLabels[project.category])}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold leading-snug text-slate-50">
                        {t(project.title)}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-300 line-clamp-3">
                        {t(project.shortDescription)}
                      </p>
                    </div>

                    {/* tech preview */}
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                      {techPreview.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 ring-1 ring-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {extraTech > 0 && (
                        <span className="rounded-full bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 ring-1 ring-slate-700/60">
                          +{extraTech}
                        </span>
                      )}

                      <span className="ml-auto text-xs font-semibold text-sky-300/90 transition-colors group-hover:text-sky-200">
                        {t(ui.viewDetails)} →
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
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

function FilterButton(props: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  const { active, onClick, label, count } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70",
        active
          ? "border-sky-500/60 bg-sky-500/15 text-sky-100 ring-1 ring-sky-500/30"
          : "border-slate-800 bg-slate-950/40 text-slate-200 hover:border-sky-500/50 hover:bg-slate-900/60",
      ].join(" ")}
    >
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={[
          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
          active ? "bg-sky-400/20 text-sky-100" : "bg-slate-800/70 text-slate-200",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}


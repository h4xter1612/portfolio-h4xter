"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projects, Lang, Project, ProjectCategory } from "../data/projects";
import ProjectModal from "./ProjectModal";

interface ProjectsSectionProps {
  lang: Lang;
}

const categoryLabels: Record<ProjectCategory, { en: string; es: string }> = {
  "Computational Physics": {
    en: "Computational Physics",
    es: "Física Computacional",
  },
  Simulation: {
    en: "Simulation",
    es: "Simulación",
  },
  "Experimental Research": {
    en: "Experimental Research",
    es: "Investigación Experimental",
  },
  "Engineering Design": {
    en: "Engineering Design",
    es: "Diseño de Ingeniería",
  },
  "Data Analysis": {
    en: "Data Analysis",
    es: "Análisis de Datos",
  },
};

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = (s: { en: string; es: string }) => s[lang];

  const categories = useMemo(
    () => ["all", ...new Set(projects.map((p) => p.category))],
    []
  );

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <motion.section
      id="projects"
      className="scroll-mt-28 min-h-screen flex flex-col justify-center py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-semibold text-sky-400 md:text-5xl">
            {lang === "en" ? "Research & Projects" : "Investigación y Proyectos"}
          </h2>
          <p className="text-sm text-slate-300 md:text-base">
            {lang === "en"
              ? "Exploring the intersection of physics, engineering, and computation."
              : "Explorando la intersección entre física, ingeniería y cómputo."}
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const isAll = cat === "all";
            const label = isAll
              ? lang === "en"
                ? "All Projects"
                : "Todos los Proyectos"
              : t(categoryLabels[cat as ProjectCategory]);

            const active = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-sky-500 bg-sky-500 text-white shadow shadow-sky-500/40"
                    : "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-500/70 hover:bg-slate-900/80"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid de proyectos */}
        <div className="grid gap-7 md:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <motion.button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/85 text-left shadow-md transition"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.08 * idx }}
              whileHover={{
                y: -6,
                boxShadow: "0 28px 80px rgba(56,189,248,0.35)",
              }}
            >
              <div className="relative h-40 overflow-hidden bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={t(project.title)}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs text-sky-300">
                  {t(categoryLabels[project.category])}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                  {t(project.title)}
                </h3>
                <p className="line-clamp-3 text-xs text-slate-300 md:text-sm">
                  {t(project.shortDescription)}
                </p>

                <div className="mt-auto pt-2 text-xs font-medium text-sky-400">
                  {lang === "en" ? "View details →" : "Ver detalles →"}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}


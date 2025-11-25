// components/ProjectModal.tsx
"use client";

import { Project, Lang } from "../data/projects";

interface ProjectModalProps {
  project: Project | null;
  lang: Lang;
  onClose: () => void;
}

export default function ProjectModal({ project, lang, onClose }: ProjectModalProps) {
  if (!project) return null;

  const t = (s: { en: string; es: string }) => s[lang];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-slate-900/95 p-6 shadow-2xl border border-slate-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700"
        >
          ✕
        </button>

        <div className="mb-4 overflow-hidden rounded-2xl bg-slate-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={t(project.title)}
            className="h-48 w-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-sky-400">
              {project.category}
            </p>
            <h2 className="text-2xl font-semibold text-slate-50">
              {t(project.title)}
            </h2>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              {lang === "en" ? "Overview" : "Resumen"}
            </h3>
            <p className="mt-1 text-sm text-slate-200">
              {t(project.shortDescription)}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              {lang === "en" ? "Key Achievements" : "Logros Clave"}
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {project.achievements.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-sky-400">✔</span>
                  <span>{t(a)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              {lang === "en" ? "Technologies & Tools" : "Tecnologías y Herramientas"}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400"
              >
                {lang === "en" ? "View Repository" : "Ver Repositorio"}
              </a>
            )}

            {project.pdfUrl && (
              <a
                href={project.pdfUrl}
                download
                className="rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-800"
              >
                {lang === "en" ? "Download PDF" : "Descargar PDF"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


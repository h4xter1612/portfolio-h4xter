"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project, Lang, ProjectCategory } from "../data/projects";
import { ExternalLink, FileText, Github, X } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  lang: Lang;
  categoryLabels: Record<ProjectCategory, { en: string; es: string }>;
  onClose: () => void;
}

const ui = {
  overview: { en: "Overview", es: "Resumen" },
  achievements: { en: "Key Achievements", es: "Logros Clave" },
  tech: { en: "Technologies & Tools", es: "Tecnologías y Herramientas" },
  links: { en: "Links", es: "Enlaces" },
  viewGitHub: { en: "View GitHub", es: "Ver GitHub" },
  openPdf: { en: "Open PDF", es: "Abrir PDF" },
  downloadPdf: { en: "Download PDF", es: "Descargar PDF" },
  openWebsite: { en: "Open website", es: "Abrir sitio" },
  close: { en: "Close", es: "Cerrar" },
};

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export default function ProjectModal({
  project,
  lang,
  categoryLabels,
  onClose,
}: ProjectModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const t = (s: { en: string; es: string }) => s[lang];

  const modalTitleId = useMemo(() => {
    return project ? `project-modal-title-${project.id}` : "project-modal-title";
  }, [project]);

  // Scroll lock + focus management
  useEffect(() => {
    if (!project) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button
    const id = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prevOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [project]);

  // ESC to close
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.18 } },
    exit: { opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.15 } },
  } as const;

  const panelVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
      scale: shouldReduceMotion ? 1 : 0.99,
      transition: { duration: shouldReduceMotion ? 0 : 0.16, ease: "easeIn" },
    },
  } as const;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          onMouseDown={(e) => {
            // click outside closes
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-slate-950/80 shadow-2xl ring-1 ring-slate-800"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-200 ring-1 ring-slate-700/70 backdrop-blur transition hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
              aria-label={t(ui.close)}
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">{t(ui.close)}</span>
            </button>

            {/* Media */}
            <div className="relative aspect-[16/9] w-full bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={t(project.title)}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-sky-200 ring-1 ring-slate-700/70 backdrop-blur">
                  {t(categoryLabels[project.category])}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-7 p-6 md:p-8">
              <div className="space-y-2">
                <h2 id={modalTitleId} className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
                  {t(project.title)}
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  {t(project.overview ?? project.shortDescription)}
                </p>
              </div>

              {/* Achievements */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-200">{t(ui.achievements)}</h3>
                <ul className="space-y-2">
                  {project.achievements.map((a, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-200">
                      <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-sky-400/90" />
                      <span>{t(a)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-200">{t(ui.tech)}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-900/60 px-3 py-1 text-[11px] font-semibold text-slate-200 ring-1 ring-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.links?.github || project.links?.pdf || project.links?.website) && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-200">{t(ui.links)}</h3>

                  <div className="flex flex-wrap gap-3">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
                      >
                        <Github className="h-4 w-4" />
                        {t(ui.viewGitHub)}
                        <ExternalLink className="h-4 w-4 opacity-80" />
                      </a>
                    )}

                    {project.links?.pdf && (
                      <PdfButton lang={lang} href={project.links.pdf} />
                    )}

                    {project.links?.website && (
                      <a
                        href={project.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/30 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t(ui.openWebsite)}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PdfButton({ lang, href }: { lang: Lang; href: string }) {
  const external = isExternalUrl(href);

  const label =
    external
      ? lang === "en"
        ? ui.openPdf.en
        : ui.openPdf.es
      : lang === "en"
        ? ui.downloadPdf.en
        : ui.downloadPdf.es;

  // If it's external (Drive), don't use download attribute.
  // If it's local (/projects/...), allow download.
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={external ? undefined : true}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/30 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
    >
      <FileText className="h-4 w-4" />
      {label}
      {external && <ExternalLink className="h-4 w-4 opacity-80" />}
    </a>
  );
}


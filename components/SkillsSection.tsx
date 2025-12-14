"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
    Code2,
    Cpu,
    FlaskConical,
    Ruler,
    BarChart3,
    Sparkles,
    BadgeCheck,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";
import { Lang } from "../data/projects";

interface SkillsSectionProps {
    lang: Lang;
}

type SkillCard = {
    icon: LucideIcon;
    title: { en: string; es: string };
    items: { en: string[]; es: string[] };
    gradient: string;
};

type Certification = {
    title: string;
    issuer: string;
    year: string;
    badge: { en: string; es: string };
    href: string;
    topics: { en: string; es: string };
};

type TecBadge = {
    title: { en: string; es: string };
    issued: { en: string; es: string };
    href: string;
    imageSrc: string;
};

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-1.5 text-sm text-slate-300">
            {items.map((item) => (
                <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500/80" />
                    <span className="leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}

function SkillCardView({ card, lang }: { card: SkillCard; lang: Lang }) {
    const Icon = card.icon;

    return (
        <motion.div
            variants={itemVariants}
            className="group relative h-full overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-sky-500/10"
        >
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${card.gradient} opacity-70`}
            />

            <div className="mb-4 flex items-start gap-3">
                <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr ${card.gradient} text-slate-950 shadow-lg`}
                >
                    <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold leading-snug text-slate-50">
                        {card.title[lang]}
                    </h3>
                </div>
            </div>

            <BulletList items={card.items[lang]} />
        </motion.div>
    );
}

function CertificationsGrid({ lang, certs }: { lang: Lang; certs: Certification[] }) {
    const isEn = lang === "en";

    return (
        <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10"
        >
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-400/20">
                    <BadgeCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-slate-50">
                        {isEn ? "Certifications" : "Certificaciones"}
                    </h3>
                    {/* Intencionalmente sin “comentarios” visibles aquí */}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {certs.map((c) => (
                    <motion.div
                        key={`${c.title}-${c.year}`}
                        variants={itemVariants}
                        className="flex h-full flex-col rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-sm backdrop-blur-sm transition hover:border-sky-400/40"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold leading-snug text-slate-100">
                                    {c.title}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                                    {c.issuer}
                                    <span className="text-slate-500"> • </span>
                                    {c.year}
                                </p>
                            </div>

                            <span className="shrink-0 rounded-full border border-slate-700/70 bg-slate-950/30 px-2 py-1 text-[11px] text-slate-200">
                                {c.badge[lang]}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                            <a
                                href={c.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-300 hover:text-sky-200"
                                aria-label={isEn ? "Open certificate link" : "Abrir enlace del certificado"}
                            >
                                {isEn ? "View" : "Ver"}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>

                            {/* Toggle discreto para topics */}
                            <details className="group">
                                <summary className="cursor-pointer list-none text-xs font-semibold text-slate-300 hover:text-sky-200">
                                    {isEn ? "Topics" : "Temas"}
                                </summary>
                                <div className="mt-2 rounded-2xl border border-slate-800/70 bg-slate-950/20 p-3">
                                    <p className="text-xs leading-relaxed text-slate-300">
                                        {c.topics[lang]}
                                    </p>
                                </div>
                            </details>
                        </div>

                        <div className="mt-auto" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function TecBadgesPanel({ lang, badges }: { lang: Lang; badges: TecBadge[] }) {
    const isEn = lang === "en";
    const [showAll, setShowAll] = useState(false);

    const visibleBadges = useMemo(() => {
        if (showAll) return badges;
        return badges.slice(0, 4);
    }, [badges, showAll]);

    return (
        <div className="mt-6">
            <details className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
                <summary className="cursor-pointer select-none list-none">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[15px] font-semibold text-slate-50">
                                {isEn ? "Tec Competency Badges" : "Badges de Competencias (Tec)"}
                            </p>
                            <p className="mt-1 text-xs text-slate-300">
                                {isEn
                                    ? "Verified micro-credentials issued by Tecnológico de Monterrey."
                                    : "Microcredenciales verificables emitidas por el Tecnológico de Monterrey."}

                            </p>
                        </div>

                        <span className="shrink-0 rounded-full border border-slate-700/70 bg-slate-950/30 px-2 py-1 text-[11px] text-slate-200">
                            {badges.length}
                        </span>
                    </div>
                </summary>

                <div className="mt-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {visibleBadges.map((b) => (
                            <a
                                key={b.href}
                                href={b.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group rounded-3xl border border-slate-800/80 bg-slate-950/20 p-4 transition hover:border-sky-400/40"
                                aria-label={
                                    isEn ? "Open badge validation link" : "Abrir enlace de validación del badge"
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={b.imageSrc}
                                        alt={b.title[lang]}
                                        loading="lazy"
                                        className="h-12 w-12 rounded-2xl ring-1 ring-slate-800/70"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-100">
                                            {b.title[lang]}
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-400">{b.issued[lang]}</p>
                                    </div>
                                </div>

                                <p className="mt-3 text-xs font-semibold text-sky-300 opacity-0 transition group-hover:opacity-100">
                                    {isEn ? "View validation" : "Ver validación"}
                                </p>
                            </a>
                        ))}
                    </div>

                    {badges.length > 4 && (
                        <div className="mt-4 flex justify-center">
                            <button
                                type="button"
                                onClick={() => setShowAll((v) => !v)}
                                className="rounded-full border border-slate-700/70 bg-slate-950/30 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-sky-400/40 hover:text-sky-200"
                            >
                                {showAll
                                    ? isEn
                                        ? "Show fewer"
                                        : "Mostrar menos"
                                    : isEn
                                        ? `Show all ${badges.length}`
                                        : `Mostrar los ${badges.length}`}
                            </button>
                        </div>
                    )}
                </div>
            </details>
        </div>
    );
}

export default function SkillsSection({ lang }: SkillsSectionProps) {
    const isEn = lang === "en";

    const cards: SkillCard[] = [
        {
            icon: Code2,
            title: {
                en: "Programming & Scientific Computing",
                es: "Programación y Cómputo Científico",
            },
            items: {
                en: [
                    "Python, Julia, MATLAB, C++ (scientific/engineering use)",
                    "NumPy, SciPy, Pandas, Matplotlib",
                    "Reproducible workflows: modular code, clear docs, version control",
                ],
                es: [
                    "Python, Julia, MATLAB, C++ (uso científico/ingenieril)",
                    "NumPy, SciPy, Pandas, Matplotlib",
                    "Flujos reproducibles: código modular, documentación clara, control de versiones",
                ],
            },
            gradient: "from-sky-400 to-cyan-300",
        },
        {
            icon: Cpu,
            title: { en: "Simulation & Modelling", es: "Simulación y Modelado" },
            items: {
                en: [
                    "PIC, resistive MHD and two-fluid plasma models",
                    "Numerical methods for ODEs/PDEs; stability-minded implementations",
                    "Spectral/Fourier tools; diagnostics-driven analysis",
                ],
                es: [
                    "Modelos de plasma PIC, MHD resistivo y dos fluidos",
                    "Métodos numéricos para EDOs/EDPs; implementaciones orientadas a estabilidad",
                    "Herramientas espectrales/Fourier; análisis guiado por diagnósticos",
                ],
            },
            gradient: "from-purple-400 to-sky-300",
        },
        {
            icon: Sparkles,
            title: { en: "Fusion & Plasma Physics", es: "Fusión y Física de Plasmas" },
            items: {
                en: [
                    "Tokamak & Z-pinch equilibrium concepts and stability intuition",
                    "Waves, instabilities and dispersion (linking theory ↔ simulation)",
                    "Grad–Shafranov workflows and FreeGSNKE-based diagnostics",
                ],
                es: [
                    "Conceptos de equilibrio y estabilidad en tokamaks y Z-pinch",
                    "Ondas, inestabilidades y dispersión (conectando teoría ↔ simulación)",
                    "Flujos Grad–Shafranov y diagnósticos con FreeGSNKE",
                ],
            },
            gradient: "from-indigo-400 to-purple-300",
        },
        {
            icon: Ruler,
            title: { en: "RF, Antennas & Experimental", es: "RF, Antenas y Experimental" },
            items: {
                en: [
                    "CubeSat S-band RF links; practical integration and testing",
                    "Patch and fractal antennas (HFSS + KiCad layouts/prototypes)",
                    "Optics lab work and basic instrumentation",
                ],
                es: [
                    "Enlaces RF en banda S para CubeSat; integración y pruebas",
                    "Antenas patch y fractales (HFSS + layouts/prototipos en KiCad)",
                    "Trabajo en óptica e instrumentación básica",
                ],
            },
            gradient: "from-amber-400 to-lime-300",
        },
        {
            icon: BarChart3,
            title: { en: "Data Science & Analysis", es: "Ciencia de Datos y Análisis" },
            items: {
                en: [
                    "Statistical modeling and exploratory analysis for scientific datasets",
                    "Basic ML (regression/classification) when appropriate",
                    "Clear, publication-style figures and result summaries",
                ],
                es: [
                    "Modelado estadístico y análisis exploratorio en datos científicos",
                    "ML básico (regresión/clasificación) cuando aporta valor",
                    "Figuras claras estilo reporte y síntesis de resultados",
                ],
            },
            gradient: "from-emerald-400 to-teal-300",
        },
        {
            icon: FlaskConical,
            title: { en: "Research & Collaboration", es: "Investigación y Colaboración" },
            items: {
                en: [
                    "Independent research initiative with strong technical writing",
                    "Interdisciplinary teamwork (engineering + physics contexts)",
                    "Mentoring / tutoring and structured communication",
                ],
                es: [
                    "Iniciativa de investigación independiente con redacción técnica sólida",
                    "Trabajo interdisciplinario (contextos de ingeniería + física)",
                    "Mentoría / tutoría y comunicación estructurada",
                ],
            },
            gradient: "from-pink-400 to-orange-300",
        },
    ];

    const certs: Certification[] = [
        {
            title: "PlasmaApplicationX: Plasma Physics – Applications",
            issuer: "EPFLx / edX (École Polytechnique Fédérale de Lausanne)",
            year: "2025",
            badge: { en: "Verified", es: "Verificado" },
            href: "https://courses.edx.org/certificates/12f2a36e4afa4cf995f74a2c678163bf",
            topics: {
                en: "Space & astrophysical plasmas; industrial/medical applications; fusion power balance; magnetic confinement devices (tokamaks, stellarators).",
                es: "Plasmas espaciales/astrofísicos; aplicaciones industriales/médicas; balance de potencia en fusión; confinamiento magnético (tokamaks, stellarators).",
            },
        },
        {
            title: "PlasmaIntroductionX: Plasma Physics – Introduction",
            issuer: "EPFLx / edX (École Polytechnique Fédérale de Lausanne)",
            year: "2025",
            badge: { en: "Verified", es: "Verificado" },
            href: "https://courses.edx.org/certificates/88fdb82fac6c419288f9a8cc5c273a93",
            topics: {
                en: "Debye shielding; single-particle motion; Vlasov/two-fluid/MHD; equilibrium & stability; MHD waves; basic numerical modeling.",
                es: "Apantallamiento de Debye; movimiento de partícula; Vlasov/dos fluidos/MHD; equilibrio y estabilidad; ondas MHD; modelado numérico básico.",
            },
        },
        {
            title: "Complete Guide to C++ Programming Foundations",
            issuer: "LinkedIn Learning",
            year: "2025",
            badge: { en: "Completed", es: "Completado" },
            href: "https://www.linkedin.com/learning/certificates/3e3ff88a7b84a8bc384256876bdc9e6ca45422cd1afeb44fdebc5d0374c2b779?trk=share_certificate",
            topics: {
                en: "C++ fundamentals for scientific/engineering work: types, pointers, references, control flow, functions, classes, and intro STL.",
                es: "Fundamentos de C++ para trabajo científico/ingenieril: tipos, punteros, referencias, control de flujo, funciones, clases e introducción a STL.",
            },
        },
        {
            title: "Lean Six Sigma White Belt",
            issuer: "Certification",
            year: "2023",
            badge: { en: "Certified", es: "Certificado" },
            href: "/docs/LeanSixSigma.pdf",
            topics: {
                en: "Process improvement basics: DMAIC overview, quality mindset, and foundational problem-structuring tools.",
                es: "Bases de mejora de procesos: visión general de DMAIC, enfoque de calidad y herramientas fundamentales para estructurar problemas.",
            },
        },
    ];

    const tecBadges: TecBadge[] = [
        {
            title: { en: "Complex Problem Solving", es: "Solución de problemas complejos" },
            issued: { en: "Apr 2025", es: "Abr 2025" },
            href: "https://badges.parchment.com/public/assertions/6ek-039cTkm8yZ5bVNB80g",
            imageSrc: "https://api.badgr.io/public/assertions/6ek-039cTkm8yZ5bVNB80g/image",
        },
        {
            title: { en: "Model Building", es: "Construcción de modelos" },
            issued: { en: "Apr 2025", es: "Abr 2025" },
            href: "https://badges.parchment.com/public/assertions/HHBUmb1IR6iTF_4bnC9j8Q",
            imageSrc: "https://api.badgr.io/public/assertions/HHBUmb1IR6iTF_4bnC9j8Q/image",
        },
        {
            title: {
                en: "Characterization of Physical Phenomena",
                es: "Caracterización de fenómenos físicos",
            },
            issued: { en: "Apr 2025", es: "Abr 2025" },
            href: "https://badges.parchment.com/public/assertions/5FLulLFWRjGS_tUa4FRofA",
            imageSrc: "https://api.badgr.io/public/assertions/5FLulLFWRjGS_tUa4FRofA/image",
        },
        {
            title: { en: "Identification of Physical Phenomena", es: "Identificación de fenómenos físicos" },
            issued: { en: "Apr 2025", es: "Abr 2025" },
            href: "https://badges.parchment.com/public/assertions/PRGE3-3USLOKx-iFVsUXrg",
            imageSrc: "https://api.badgr.io/public/assertions/PRGE3-3USLOKx-iFVsUXrg/image",
        },
        {
            title: { en: "Information Communication", es: "Comunicación de información" },
            issued: { en: "Apr 2025", es: "Abr 2025" },
            href: "https://badges.parchment.com/public/assertions/aIhfUbr-TQeWy94mx9EQuw",
            imageSrc: "https://api.badgr.io/public/assertions/aIhfUbr-TQeWy94mx9EQuw/image",
        },
        {
            title: { en: "Research Stay", es: "Estancia de Investigación" },
            issued: { en: "Apr 2025", es: "Abr 2025" },
            href: "https://badges.parchment.com/public/assertions/8tsBfUMCSyel8PxC6DcD7w",
            imageSrc: "https://api.badgr.io/public/assertions/8tsBfUMCSyel8PxC6DcD7w/image",
        },
        {
            title: { en: "Self-Awareness & Self-Management", es: "Autoconocimiento y gestión" },
            issued: { en: "Apr 2025", es: "Abr 2025" },
            href: "https://badges.parchment.com/public/assertions/baESYvEaTKmwPBi5zrCB9w",
            imageSrc: "https://api.badgr.io/public/assertions/baESYvEaTKmwPBi5zrCB9w/image",
        },
    ];

    return (
        <motion.section
            id="skills"
            className="scroll-mt-28 py-20 md:py-24"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
        >
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="mb-10 space-y-3 text-center">
                    <h2 className="text-4xl font-semibold text-sky-400 md:text-5xl">
                        {isEn ? "Skills & Expertise" : "Habilidades y Experiencia"}
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-slate-300 md:text-base">
                        {isEn
                            ? "A concise overview of my technical strengths across plasma/fusion, simulation, and engineering."
                            : "Resumen conciso de mis fortalezas técnicas en plasmas/fusión, simulación e ingeniería."}
                    </p>
                </div>

                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cards.map((card) => (
                            <SkillCardView key={card.title.en} card={card} lang={lang} />
                        ))}
                    </div>
                </motion.div>

                <CertificationsGrid lang={lang} certs={certs} />
                <TecBadgesPanel lang={lang} badges={tecBadges} />
            </div>
        </motion.section>
    );
}


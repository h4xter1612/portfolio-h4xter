// data/projects.ts

export type Lang = "en" | "es";

export type ProjectCategory =
| "Computational Physics"
| "Simulation"
| "Experimental Research"
| "Engineering Design"
| "Data Analysis"
| "Plasma Physics";

export interface LocalizedString {
    en: string;
    es: string;
}

export interface Project {
    id: string;
    title: LocalizedString;
    category: ProjectCategory;
    shortDescription: LocalizedString;
    image: string;
    achievements: LocalizedString[];
    technologies: string[];
    pdfUrl?: string;
    projectUrl?: string;
}

export const projects: Project[] = [
    {
        id: "z-pinch-sim",
        title: {
            en: "Z-Pinch MHD Stability Simulation",
            es: "Simulación MHD de Estabilidad en Z-Pinch",
        },
        category: "Simulation", // o "Computational Physics" si te gusta más
        shortDescription: {
            en: "Numerical MHD framework to study Z-pinch stability, exploring sausage and kink modes under different current and pressure profiles.",
            es: "Marco numérico MHD para estudiar la estabilidad de un Z-pinch, explorando modos sausage y kink bajo distintos perfiles de corriente y presión.",
        },
        image: "/images/zpinch-sim.gif", // o .gif, ahorita te explico
        achievements: [
            {
                en: "Implemented a resistive MHD solver to model axial Z-pinch evolution over time.",
                es: "Implementé un solucionador MHD resistivo para modelar la evolución temporal de un Z-pinch axial.",
            },
            {
                en: "Reproduced characteristic sausage and kink instabilities for different parameter regimes.",
                es: "Reproduje inestabilidades tipo sausage y kink en distintos regímenes de parámetros.",
            },
            {
                en: "Built a modular codebase ready to extend with additional physics and higher-dimensional geometries.",
                es: "Construí una base de código modular lista para extenderse con más física y geometrías de mayor dimensión.",
            },
        ],
        technologies: ["Python", "NumPy", "SciPy", "Matplotlib"], // ajusta a lo que uses
        pdfUrl: "/projects/zpinch-sim-report.pdf", // si no tienes todavía, puedes borrar esta línea
        projectUrl: "https://github.com/h4xter1612/ZPinchSim",
    },

    // aquí luego agregas otros proyectos como más objetos
    {
        id: "pic-two-stream",
        title: {
            en: "PIC Simulation of Two-Stream Instability",
            es: "Simulación PIC de la Inestabilidad de Dos Flujos",
        },
        category: "Simulation",
        shortDescription: {
            en: "1D electrostatic Particle-In-Cell (PIC) simulation of the two-stream instability, resolving the nonlinear evolution of counter-streaming electron beams.",
            es: "Simulación electrostática 1D tipo Particle-In-Cell (PIC) de la inestabilidad de dos flujos, resolviendo la evolución no lineal de haces electrónicos contra–propagantes.",
        },
        image: "/images/two-stream.gif", // o .gif si haces una animación
        achievements: [
            {
                en: "Implemented a full PIC loop (charge deposition, field solve, particle push) for a 1D periodic plasma.",
                es: "Implementé el ciclo PIC completo (depositar carga, resolver campos y adelantar partículas) para un plasma 1D periódico.",
            },
            {
                en: "Reproduced the exponential growth phase of the two-stream instability and compared it with analytical growth rates.",
                es: "Reproduje la fase de crecimiento exponencial de la inestabilidad de dos flujos y la comparé con tasas de crecimiento analíticas.",
            },
            {
                en: "Generated phase-space visualizations and field evolution plots to study nonlinear saturation.",
                es: "Generé visualizaciones en espacio de fase y de la evolución del campo para estudiar la saturación no lineal.",
            },
        ],
        technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
        pdfUrl: "/projects/pic-two-stream-report.pdf", // si no tienes aún el PDF, puedes borrar esta línea
        projectUrl: "https://github.com/h4xter1612/PIC-2StreamInst",
    },
    {
        id: "two-fluid-plasma",
        title: {
            en: "Two-Fluid Plasma Wave Simulation (1D/2D)",
            es: "Simulación de Ondas en Plasma de Dos Fluidos (1D/2D)",
        },
        category: "Computational Physics",
        shortDescription: {
            en: "Two-fluid plasma framework to study wave propagation and basic instabilities, including R/L, O/X and electrostatic modes in 1D and 2D geometries.",
            es: "Marco numérico de dos fluidos para estudiar propagación de ondas e inestabilidades básicas, incluyendo modos R/L, O/X y electrostáticos en geometrías 1D y 2D.",
        },
        image: "/images/two-fluid-plasma.gif",
        achievements: [
            {
                en: "Implemented a two-fluid model with separate ion and electron dynamics coupled to Maxwell-like field equations.",
                es: "Implementé un modelo de dos fluidos con dinámica separada de iones y electrones acoplada a ecuaciones tipo Maxwell.",
            },
            {
                en: "Validated dispersion relations for several plasma wave branches (R/L, O/X, electrostatic) against theoretical predictions.",
                es: "Validé relaciones de dispersión para varias ramas de ondas de plasma (R/L, O/X, electrostáticas) frente a predicciones teóricas.",
            },
            {
                en: "Designed a modular code structure to easily switch between 1D/2D setups, boundary conditions and parameter scans.",
                es: "Diseñé una estructura de código modular para cambiar fácilmente entre configuraciones 1D/2D, condiciones de frontera y barridos de parámetros.",
            },
        ],
        technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
        pdfUrl: "/projects/two-fluid-plasma-report.pdf", // opcional; bórralo si aún no tienes PDF
        projectUrl: "https://github.com/h4xter1612/2FluidPlasmaSim",
    },
    {
        id: "star-like-tokamak-equilibrium",
        title: {
            en: "STAR-like Spherical Tokamak Equilibrium (FreeGSNKE)",
            es: "Equilibrio de Tokamak Esférico tipo STAR (FreeGSNKE)",
        },
        category: "Plasma Physics",
        shortDescription: {
            en: "End-to-end Grad–Shafranov workflow with FreeGSNKE to design and diagnose a bean-shaped spherical tokamak equilibrium inspired by the STAR reactor concept.",
            es: "Flujo de trabajo completo de Grad–Shafranov con FreeGSNKE para diseñar y diagnosticar un equilibrio de tokamak esférico tipo STAR con sección en forma de frijol.",
        },
        image: "/images/star-bean-equilibrium.png", // por ejemplo: copia STAR_bean_equilibrium.png a esta ruta
        achievements: [
            {
                en: "Built a full STAR-like machine in FreeGSNKE from scratch, including inner/outer walls and a dedicated PF/CS coil set.",
                es: "Construí desde cero una máquina tipo STAR en FreeGSNKE, incluyendo paredes interna/externa y un conjunto dedicado de bobinas PF/CS.",
            },
            {
                en: "Implemented PF/CS current scans and a misfit-based micro-optimization to obtain a low–aspect-ratio, highly elongated, bean-shaped equilibrium with positive triangularity.",
                es: "Implementé barridos de corrientes PF/CS y una micro–optimización basada en una métrica de misfit para obtener un equilibrio de baja razón de aspecto, alta elongación y sección tipo bean con triangularidad positiva.",
            },
            {
                en: "Computed detailed MHD diagnostics — separatrix geometry, q(ψ), pressure and β_p, j_φ(R,Z), magnetic shear — and generated a quasi-static ramp-up animation of the STAR-like equilibrium.",
                es: "Calculé diagnósticos MHD detallados — geometría de la separatriz, q(ψ), presión y β_p, j_φ(R,Z), cizalla magnética — y generé una animación de ramp-up cuasiestático del equilibrio tipo STAR.",
            },
        ],
        technologies: ["Python", "NumPy", "Matplotlib", "FreeGSNKE"],
        pdfUrl: "https://drive.google.com/file/d/1dsjF9RD1yCmZXFg2fVozWc6MIJ06WTZk/view?usp=sharing", // cámbialo a /projects/... si luego lo hospedas en tu web
        projectUrl: "https://github.com/h4xter1612/STAR-like-tokamak-equilibrium",
    },


];


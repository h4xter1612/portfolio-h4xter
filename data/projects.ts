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

export type LocalizedHref = Partial<Record<Lang, string>>;
export type PdfLink = string | LocalizedHref;

export interface ProjectLinks {
  github?: string;
  pdf?: PdfLink;     // local (/projects/...) o externo (Drive, etc.)
  website?: string; // demo/page opcional
}

export interface Project {
  id: string;
  title: LocalizedString;
  category: ProjectCategory;

  shortDescription: LocalizedString;
  overview?: LocalizedString;

  /**
   * Card image (recommended: static PNG/JPG)
   */
  image: string;

  /**
   * Modal image (optional). Use this for GIFs/animated previews.
   * If omitted, modal will use `image`.
   */
  detailImage?: string;

  achievements: LocalizedString[];
  technologies: string[];

  links?: ProjectLinks;
}

export const projects: Project[] = [
  {
    id: "z-pinch-sim",
    title: {
      en: "Z-Pinch MHD Stability Simulation",
      es: "Simulación MHD de Estabilidad en Z-Pinch",
    },
    category: "Plasma Physics",
    shortDescription: {
      en: "Numerical resistive-MHD framework to study Z-pinch stability and characterize sausage/kink modes across operating regimes.",
      es: "Marco numérico MHD resistivo para estudiar la estabilidad de un Z-pinch y caracterizar modos sausage/kink en distintos regímenes.",
    },
    overview: {
      en: "Developed a modular resistive-MHD code to explore how current and pressure profiles drive Z-pinch instabilities, with diagnostics focused on mode growth, nonlinear evolution, and interpretability for plasma-physics studies.",
      es: "Desarrollé un código MHD resistivo y modular para explorar cómo perfiles de corriente y presión disparan inestabilidades en Z-pinch, con diagnósticos centrados en crecimiento modal, evolución no lineal e interpretabilidad.",
    },

    // RECOMENDADO: pon aquí una imagen estática (png/jpg)
    image: "/images/zpinch-sim.png",

    // Si ya tienes el GIF y quieres que SOLO se vea en el modal:
    // image: "/images/zpinch-sim-cover.png",
    detailImage: "/images/zpinch-sim.gif",

    achievements: [
      {
        en: "Implemented a resistive-MHD solver to model time evolution of an axial Z-pinch configuration.",
        es: "Implementé un solucionador MHD resistivo para modelar la evolución temporal de una configuración axial de Z-pinch.",
      },
      {
        en: "Reproduced characteristic sausage and kink behavior across multiple parameter regimes.",
        es: "Reproduje el comportamiento característico de modos sausage y kink en múltiples regímenes de parámetros.",
      },
      {
        en: "Designed a code structure ready for extensions (additional physics, higher-dimensional geometries, improved boundary models).",
        es: "Diseñé una base de código lista para extensiones (más física, geometrías de mayor dimensión, mejores modelos de frontera).",
      },
    ],
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
    links: {
      github: "https://github.com/h4xter1612/ZPinchSim",
    },
  },

  {
    id: "pic-two-stream",
    title: {
      en: "PIC Simulation of Two-Stream Instability",
      es: "Simulación PIC de la Inestabilidad de Dos Flujos",
    },
    category: "Plasma Physics",
    shortDescription: {
      en: "1D electrostatic PIC simulation resolving nonlinear evolution of counter-streaming electron beams in periodic domains.",
      es: "Simulación PIC electrostática 1D que resuelve la evolución no lineal de haces electrónicos contra–propagantes en dominio periódico.",
    },
    overview: {
      en: "Built a full 1D electrostatic PIC pipeline to study instability growth, phase-space dynamics, and nonlinear saturation, with comparisons against theoretical expectations for validation.",
      es: "Construí un pipeline PIC electrostático 1D completo para estudiar crecimiento de la inestabilidad, dinámica en espacio de fase y saturación no lineal, comparando contra expectativas teóricas para validar.",
    },

    image: "/images/two-stream.png",
    detailImage: "/images/two-stream.gif",

    achievements: [
      {
        en: "Implemented the full PIC loop: charge deposition, field solve, and particle push under periodic boundary conditions.",
        es: "Implementé el ciclo PIC completo: depósito de carga, solución del campo y avance de partículas con condiciones periódicas.",
      },
      {
        en: "Reproduced exponential growth and compared with analytical growth-rate predictions.",
        es: "Reproduje el crecimiento exponencial y lo comparé con predicciones analíticas de tasa de crecimiento.",
      },
      {
        en: "Generated phase-space and field-evolution diagnostics to analyze nonlinear saturation mechanisms.",
        es: "Generé diagnósticos de espacio de fase y evolución del campo para analizar mecanismos de saturación no lineal.",
      },
    ],
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
    links: {
      github: "https://github.com/h4xter1612/PIC-2StreamInst",
    },
  },

  {
    id: "two-fluid-plasma",
    title: {
      en: "Two-Fluid Plasma Wave Simulation (1D/2D)",
      es: "Simulación de Ondas en Plasma de Dos Fluidos (1D/2D)",
    },
    category: "Plasma Physics",
    shortDescription: {
      en: "Two-fluid plasma framework to study wave propagation and baseline instabilities across 1D/2D geometries with modular diagnostics.",
      es: "Marco numérico de dos fluidos para estudiar propagación de ondas e inestabilidades base en 1D/2D con diagnósticos modulares.",
    },
    overview: {
      en: "Implemented separate ion/electron dynamics coupled to field equations to validate dispersion behavior for multiple wave branches, enabling controlled parameter scans for plasma-physics interpretation.",
      es: "Implementé dinámica separada ion/electrón acoplada a ecuaciones de campo para validar dispersión en varias ramas de ondas, habilitando barridos de parámetros controlados para interpretación en plasmas.",
    },

    image: "/images/two-fluid-plasma.png",
    detailImage: "/images/two-fluid-plasma.gif",

    achievements: [
      {
        en: "Implemented a two-fluid model with ion/electron dynamics coupled to Maxwell-like field equations.",
        es: "Implementé un modelo de dos fluidos con dinámica de iones/electrones acoplada a ecuaciones tipo Maxwell.",
      },
      {
        en: "Validated dispersion relations (R/L, O/X, electrostatic branches) against theoretical predictions.",
        es: "Validé relaciones de dispersión (ramas R/L, O/X y electrostáticas) frente a predicciones teóricas.",
      },
      {
        en: "Built a modular structure to switch 1D/2D setups, boundary conditions, and parameter scans efficiently.",
        es: "Construí una estructura modular para cambiar eficientemente entre setups 1D/2D, condiciones de frontera y barridos de parámetros.",
      },
    ],
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
    links: {
      github: "https://github.com/h4xter1612/2FluidPlasmaSim",
    },
  },

  {
    id: "star-like-tokamak-equilibrium",
    title: {
      en: "STAR-like Spherical Tokamak Equilibrium (FreeGSNKE)",
      es: "Equilibrio de Tokamak Esférico tipo STAR (FreeGSNKE)",
    },
    category: "Plasma Physics",
    shortDescription: {
      en: "End-to-end Grad–Shafranov workflow to design and diagnose a STAR-inspired spherical tokamak equilibrium with a bean-shaped cross-section.",
      es: "Flujo completo Grad–Shafranov para diseñar y diagnosticar un equilibrio tipo STAR en tokamak esférico con sección en forma de frijol.",
    },
    overview: {
      en: "Built a STAR-like machine model and ran PF/CS current scans with a misfit metric to converge to low-aspect-ratio, high-elongation equilibria, then computed MHD-relevant diagnostics for interpretability and reporting.",
      es: "Construí un modelo de máquina tipo STAR y ejecuté barridos de corrientes PF/CS con una métrica de misfit para converger a equilibrios de baja razón de aspecto y alta elongación, calculando diagnósticos MHD para interpretabilidad y reporte.",
    },

    image: "/images/star_tokamak.png",
    detailImage: "/images/star_tokamak.gif",

    achievements: [
      {
        en: "Modeled a STAR-like machine in FreeGSNKE, including vessel geometry and a dedicated PF/CS coil set.",
        es: "Modelé una máquina tipo STAR en FreeGSNKE, incluyendo geometría del vessel y un conjunto dedicado de bobinas PF/CS.",
      },
      {
        en: "Implemented PF/CS current scans and a misfit-driven micro-optimization to obtain bean-shaped, positively triangular equilibria.",
        es: "Implementé barridos PF/CS y micro–optimización por misfit para obtener equilibrios tipo bean con triangularidad positiva.",
      },
      {
        en: "Computed diagnostics (separatrix geometry, q(ψ), β_p, jφ(R,Z), shear) and generated a quasi-static ramp-up visualization.",
        es: "Calculé diagnósticos (separatriz, q(ψ), β_p, jφ(R,Z), cizalla) y generé una visualización de ramp-up cuasiestático.",
      },
    ],
    technologies: ["Python", "NumPy", "Matplotlib", "FreeGSNKE"],
    links: {
      github: "https://github.com/h4xter1612/STAR-like-tokamak-equilibrium",
      pdf: {
        en: "docs/STAR.pdf",
      },
    },
  },

  {
    id: "grad-shafranov-derivation",
    title: {
      en: "Derivation of the Grad–Shafranov Equation for Tokamak Equilibrium",
      es: "Derivación de la Ecuación de Grad–Shafranov para el Equilibrio en un Tokamak",
    },
    category: "Plasma Physics",
    shortDescription: {
      en: "Self-contained technical note deriving Grad–Shafranov from Maxwell’s equations and MHD force balance for axisymmetric tokamak equilibria.",
      es: "Nota técnica auto-contenida derivando Grad–Shafranov desde Maxwell y balance de fuerzas MHD para equilibrios axisimétricos en tokamaks.",
    },
    overview: {
      en: "Produced a clear, step-by-step derivation with geometric intuition (ψ, F(ψ), Δ* operator) and notation aligned with standard tokamak-equilibrium literature, suitable as a reference for future research work.",
      es: "Redacté una derivación paso a paso con intuición geométrica (ψ, F(ψ), operador Δ*) y notación alineada con literatura estándar de equilibrios, útil como referencia para trabajo futuro.",
    },

    image: "/images/grad-shafranov.png",
    // detailImage opcional (si un día quieres animación o más capturas, puedes expandir)

    achievements: [
      {
        en: "Derived Grad–Shafranov from ∇·B=0, ∇×B=μ₀J, and J×B=∇p in cylindrical coordinates under toroidal symmetry.",
        es: "Derivé Grad–Shafranov desde ∇·B=0, ∇×B=μ₀J y J×B=∇p en coordenadas cilíndricas con simetría toroidal.",
      },
      {
        en: "Explained the physical meaning of ψ(r,z), F(ψ), and the elliptic operator Δ*ψ for equilibrium reconstruction.",
        es: "Expliqué el significado físico de ψ(r,z), F(ψ) y el operador elíptico Δ*ψ para reconstrucción de equilibrios.",
      },
      {
        en: "Delivered a polished LaTeX note (10+ pages) with consistent notation and annotations for reproducibility.",
        es: "Entregué una nota en LaTeX (10+ páginas) con notación consistente y anotaciones para reproducibilidad.",
      },
    ],
    technologies: ["LaTeX", "Analytical MHD", "Plasma Physics", "Vector Calculus"],
    links: {
      pdf: {
        en: "/docs/Grad-Shafranov.pdf",
        es: "/docs/Grad-Shafranov-es.pdf"
      },
    },
  },
    {
      id: "cubesat-fractal-patch-antenna",
      title: {
        en: "Dual-Band Fractal Patch Antenna for a 2U CubeSat (S-Band)",
        es: "Antena de Parche Fractal Doble Banda para CubeSat 2U (Banda S)",
      },
      category: "Engineering Design",
      shortDescription: {
        en: "Designed, simulated, and prototyped a compact dual-band S-band fractal patch antenna integrated with a CubeSat imaging payload; validated link performance and assessed vacuum compatibility.",
        es: "Diseñé, simulé y prototipé una antena de parche fractal doble banda en banda S, integrada con la carga útil de imágenes del CubeSat; validé desempeño del enlace y compatibilidad en vacío.",
      },
      overview: {
        en: "Developed an S-band fractal patch antenna concept for CubeSat constraints (compact, planar, no deployment). Verified impedance matching via HFSS simulations and built an FR4 prototype manufactured from a KiCad layout. Integrated the RF chain (coax/SMA + nRF24L01-class transceiver + Raspberry Pi) and demonstrated image transfer and command reception. Environmental work included vacuum testing to surface material outgassing risks and motivate a Rogers RT/duroid redesign for improved gain.",
        es: "Desarrollé una antena fractal en banda S para restricciones CubeSat (compacta, plana, sin despliegue). Verifiqué el acoplamiento de impedancia con simulaciones en HFSS y fabriqué un prototipo en FR4 a partir de un diseño en KiCad. Integré la cadena RF (coax/SMA + transceptor tipo nRF24L01 + Raspberry Pi) y demostré transferencia de imágenes y recepción de comandos. Como parte ambiental, realicé pruebas en vacío para evidenciar riesgos de desgasificación y motivar un rediseño en Rogers RT/duroid con mejor ganancia.",
      },

      // Card image: idealmente una foto limpia del prototipo o integración (estática)
      image: "/images/cubesat-antenna.png",

      // Modal image opcional: aquí puedes poner una composición con S11 + patrón de radiación,
      // o una foto más “técnica”. Si algún día haces animación, este puede ser el GIF.
      // detailImage: "/images/cubesat-antenna-detail.png",

      achievements: [
        {
          en: "Designed a dual-band fractal patch antenna in S-band, targeting CubeSat constraints (planar form factor, no deployment).",
          es: "Diseñé una antena de parche fractal doble banda en banda S, cumpliendo restricciones CubeSat (forma plana, sin despliegue).",
        },
        {
          en: "Validated impedance matching in HFSS with dual resonances (~2.45 GHz and ~2.06 GHz) and bandwidths on the order of ~70 MHz / ~45 MHz (S11 < −10 dB).",
          es: "Validé el acoplamiento de impedancia en HFSS con resonancias dobles (~2.45 GHz y ~2.06 GHz) y anchos de banda del orden de ~70 MHz / ~45 MHz (S11 < −10 dB).",
        },
        {
          en: "Produced an FR4 prototype from a KiCad PCB layout and integrated it with a coax/SMA feed and an nRF24L01-class RF module for end-to-end testing.",
          es: "Fabricqué un prototipo en FR4 desde un layout en KiCad e integré alimentación coax/SMA y un módulo RF tipo nRF24L01 para pruebas end-to-end.",
        },
        {
          en: "Demonstrated stable data transfer (250 kbps) up to ~85 m, including image transmission and successful command reception.",
          es: "Demostré transmisión estable (250 kbps) hasta ~85 m, incluyendo envío de imágenes y recepción exitosa de comandos.",
        },
        {
          en: "Ran vacuum tests to assess mechanical integrity and identify FR4 outgassing risks; proposed a Rogers RT/duroid redesign achieving simulated gain improvements (~2.86 dB in Tx band).",
          es: "Realicé pruebas en vacío para evaluar integridad mecánica e identificar riesgos de desgasificación del FR4; propuse un rediseño en Rogers RT/duroid con mejora simulada de ganancia (~2.86 dB en banda Tx).",
        },
      ],
      technologies: [
        "KiCad",
        "ANSYS HFSS",
        "RF / Antenna Design",
        "PCB (FR4 / Rogers RT/duroid)",
        "Raspberry Pi",
        "nRF24L01 (E01-ML01DP5)",
        "Coax/SMA (RG316)",
      ],
      links: {
      pdf: {
        en: "/docs/CubesatAntenna-en.pdf",
        es: "/docs/CubesatAntenna.pdf"
      },
      },
    },

];


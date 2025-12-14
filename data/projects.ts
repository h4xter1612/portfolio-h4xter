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
        en: "/docs/STAR.pdf",
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
      image: "/images/antenna.png",
      detailImage: "/images/antennaS11.png",

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
    {
      id: "geant4-radiography-framework",
      title: {
        en: "Geant4 Framework for X-Ray Radiography & CT Simulation",
        es: "Framework en Geant4 para Simulación de Radiografía y CT con Rayos X",
      },
      category: "Simulation",

      shortDescription: {
        en: "Monte Carlo imaging pipeline (Geant4 + Python) for customizable X-ray radiography, dual-energy decomposition (DEXA/ACNR), and CT reconstruction with DICOM export.",
        es: "Pipeline de imagenología por Monte Carlo (Geant4 + Python) para radiografía de rayos X configurable, descomposición de doble energía (DEXA/ACNR) y reconstrucción CT con exportación a DICOM.",
      },

      overview: {
        en: "Developed (team project) a configurable Geant4 simulation framework to model X-ray source–target–detector geometries, characterize spectra, compute attenuation coefficients, and generate radiography/tomography datasets. Post-processing in Python supports CT reconstruction (inverse Radon) and DICOM export for visualization workflows.",
        es: "Desarrollé (proyecto en equipo) un framework configurable en Geant4 para modelar la geometría fuente–objeto–detector, caracterizar espectros, calcular coeficientes de atenuación y generar datasets de radiografía/tomografía. El post-procesado en Python permite reconstrucción CT (Radon inverso) y exportación a DICOM para flujos de visualización.",
      },

      // Card image (estática 16:9)
      image: "/images/geant4.png",

      // Modal image (opcional: GIF/preview)
      detailImage: "/images/geant4D.png",

      achievements: [
        {
          en: "Implemented a Geant4 + Python workflow for high-resolution radiography and tomography generation, suitable for large-scale synthetic datasets.",
          es: "Implementé un flujo Geant4 + Python para generar radiografías y tomografías de alta resolución, útil para datasets sintéticos a gran escala.",
        },
        {
          en: "Computed mass attenuation coefficients via thickness-scan algorithm and validated against recorded data (global errors ~0.58%, 0.37%, 2.80% for representative tissues).",
          es: "Calculé coeficientes de atenuación másica mediante un algoritmo de barrido de espesor y validé contra datos registrados (errores globales ~0.58%, 0.37%, 2.80% para tejidos representativos).",
        },
        {
          en: "Simulated dual-energy radiography and applied DEXA-style decomposition methods (SLS/ACNR) to separate bone and soft-tissue components.",
          es: "Simulé radiografía de doble energía y apliqué métodos tipo DEXA (SLS/ACNR) para separar componentes de hueso y tejido blando.",
        },
        {
          en: "Built a CT pipeline with logarithmic projection correction, inverse Radon reconstruction (scikit-image), and DICOM export (pydicom) for 3D visualization.",
          es: "Construí un pipeline de CT con corrección logarítmica de proyecciones, reconstrucción por Radon inverso (scikit-image) y exportación DICOM (pydicom) para visualización 3D.",
        },
      ],

      technologies: [
        "Geant4",
        "C++",
        "Python",
        "NumPy",
        "SciPy",
        "scikit-image",
        "pydicom",
        "DICOM",
        "Monte Carlo",
        "Medical Imaging",
      ],

      links: {
        github: "https://github.com/miguelcomett/IFI.03.G4-Radiography.git",
        pdf: {
          en: "/docs/Geant4.pdf",
        },
      },
    },
    {
      id: "ftp-fringe-profilometry",
      title: {
        en: "Fourier Transform Profilometry (Fringe Projection)",
        es: "Perfilometría por Proyección de Franjas (FTP)",
      },
      category: "Experimental Research",
      shortDescription: {
        en: "3D surface reconstruction via fringe projection and Fourier Transform Profilometry, converting phase maps into height profiles.",
        es: "Reconstrucción 3D de superficies mediante proyección de franjas y Perfilometría por Transformada de Fourier, convirtiendo mapas de fase en perfiles de altura.",
      },
      overview: {
        en: "Implemented an FTP workflow to recover surface geometry from projected fringes: acquisition, spectral filtering, phase unwrapping, and height reconstruction with practical calibration considerations for robust measurements.",
        es: "Implementé un flujo FTP para recuperar la geometría de una superficie a partir de franjas proyectadas: adquisición, filtrado espectral, desenvolvimiento de fase y reconstrucción de altura con consideraciones prácticas de calibración para mediciones robustas.",
      },

      // Card image (static, 16:9). Ej: foto del setup o resultado 3D/altura.
      image: "/images/perfil.png",

      // Modal image opcional (si quieres mostrar otra evidencia: mapa de fase/altura).
      detailImage: "/images/perfilr.png",

      achievements: [
        {
          en: "Built an end-to-end FTP pipeline: fringe acquisition, FFT-based carrier isolation, phase recovery and unwrapping.",
          es: "Construí un pipeline FTP end-to-end: adquisición de franjas, aislamiento del portador con FFT, recuperación y desenvolvimiento de fase.",
        },
        {
          en: "Reconstructed height/shape maps suitable for quantitative inspection and reporting.",
          es: "Reconstruí mapas de altura/forma útiles para inspección cuantitativa y reporte.",
        },
        {
          en: "Documented measurement assumptions and practical calibration steps to improve repeatability.",
          es: "Documenté supuestos de medición y pasos prácticos de calibración para mejorar repetibilidad.",
        },
      ],
      technologies: [
        "Optics / Metrology",
        "Fringe Projection",
        "Fourier Transform (FFT)",
        "Phase Unwrapping",
        "Image Processing",
        "MATLAB" // | "Python" (elige lo que aplique)
      ],
      links: {
        pdf: {
          en: "/docs/profilometry-en.pdf", // TODO: pon tu PDF/Slides en EN si lo tienes
          es: "/docs/profilometry-es.pdf", // TODO: pon tu PDF/Slides en ES
        },
        // github: "https://github.com/....", // opcional
      },
    },
    {
      id: "optical-pulses-nlse",
      title: {
        en: "Optical Pulse Propagation in Fiber (NLSE) — System Optimization",
        es: "Propagación de Pulsos Ópticos en Fibra (NLSE) — Optimización",
      },
      category: "Simulation",
      shortDescription: {
        en: "Simulated pulse propagation under dispersion and nonlinearity using the Nonlinear Schrödinger Equation, optimizing performance trade-offs for fiber communications.",
        es: "Simulé la propagación de pulsos bajo dispersión y no linealidad con la Ecuación No Lineal de Schrödinger, optimizando compromisos de desempeño para comunicaciones en fibra.",
      },
      overview: {
        en: "Developed simulations to study temporal evolution of pulses along distance and evaluate parameter choices that improve transmission stability and efficiency, producing diagnostic visualizations for interpretation.",
        es: "Desarrollé simulaciones para estudiar la evolución temporal de pulsos a lo largo de la distancia y evaluar parámetros que mejoran estabilidad y eficiencia de transmisión, generando visualizaciones diagnósticas para interpretación.",
      },

      // Card image (static 16:9). Ej: heatmap t vs z (tu imagen de resultado).
      image: "/images/pulse.png",

      // Modal (si quieres una versión más detallada o un segundo resultado)
      detailImage: "/images/pulsep.png",

      achievements: [
        {
          en: "Modeled pulse propagation including key dispersion/nonlinear effects under an NLSE-based framework.",
          es: "Modelé la propagación de pulsos incorporando efectos clave de dispersión/no linealidad bajo un marco basado en NLSE.",
        },
        {
          en: "Generated time–distance diagnostics to visualize pulse evolution and stability regimes.",
          es: "Generé diagnósticos tiempo–distancia para visualizar evolución del pulso y regímenes de estabilidad.",
        },
        {
          en: "Performed comparative sweeps/optimization to identify parameter ranges that improve performance trade-offs.",
          es: "Realicé barridos comparativos/optimización para identificar rangos de parámetros que mejoran compromisos de desempeño.",
        },
      ],
      technologies: [
        "Nonlinear Schrödinger Equation (NLSE)",
        "Numerical Simulation",
        "FFT / Spectral Methods",
        "Optimization / Parameter Sweeps",
        "Fiber Optics",
        // "Python" | "MATLAB"
      ],
      links: {
        // Si solo tienes presentación, es totalmente válido: súbela como PDF y listo.
        pdf: {
          en: "/docs/pulse-en.pdf", // TODO
          es: "/docs/pulse-es.pdf", // TODO
        },
      },
    },

    {
      id: "vacuum-chamber-cnt",
      title: {
        en: "Vacuum Chamber Concept for CNT Measurements + Materials Characterization",
        es: "Concepto de Cámara de Vacío para Mediciones en CNT + Caracterización de Materiales",
      },
      category: "Engineering Design",
      shortDescription: {
        en: "Designed a compact vacuum chamber concept to enable controlled measurements on carbon nanotubes, supported by experimental planning and materials characterization deliverables.",
        es: "Diseñé un concepto de cámara de vacío compacta para habilitar mediciones controladas en nanotubos de carbono, respaldado por planeación experimental y entregables de caracterización de materiales.",
      },
      overview: {
        en: "Proposed a vacuum-compatible chamber architecture with practical interfaces (sensing, feedthroughs, observation) and documented constraints relevant to experimental electrical transport setups, integrating characterization results into a readable technical narrative.",
        es: "Propuse una arquitectura de cámara compatible con vacío con interfaces prácticas (sensado, pasamuros, observación) y documenté restricciones relevantes para montajes de transporte eléctrico, integrando resultados de caracterización en una narrativa técnica legible.",
      },

      // Card image (static 16:9). Ej: render principal o foto del prototipo.
      image: "/images/vc1.png",

      // Modal image opcional (ej: lámina con render + etiquetas / resultados de caracterización)
      detailImage: "/images/vc2.png",

      achievements: [
        {
          en: "Produced a vacuum-chamber concept with key mechanical interfaces and instrumentation considerations for experimental measurements.",
          es: "Desarrollé un concepto de cámara de vacío con interfaces mecánicas clave y consideraciones de instrumentación para mediciones experimentales.",
        },
        {
          en: "Defined functional requirements (observation, sensing, feedthroughs) aligned with laboratory constraints.",
          es: "Definí requerimientos funcionales (observación, sensado, pasamuros) alineados a restricciones de laboratorio.",
        },
        {
          en: "Integrated materials characterization outputs into a concise, readable deliverable for engineering audiences.",
          es: "Integré resultados de caracterización de materiales en un entregable conciso y legible para audiencias de ingeniería.",
        },
      ],
      technologies: [
        "Vacuum Engineering",
        "Mechanical Design (CAD)",
        "Instrumentation",
        "Carbon Nanotubes (CNT)",
        "Materials Characterization",
      ],
      links: {
        // Recomendación: si tu presentación resume mejor, úsala como PDF en el sitio (más legible).
        pdf: {
          en: "/docs/materials-en.pdf", // TODO
          es: "/docs/materials-es.pdf",   // TODO
        },
      },
    },
    {
      id: "stargazer-reflector-telescope",
      title: {
        en: "Reflector Telescope (Stargazer) — Design, Build, and Simulation",
        es: "Telescopio Reflector (Stargazer) — Diseño, Construcción y Simulación",
      },
      category: "Engineering Design",
      shortDescription: {
        en: "Designed and built a reflector telescope prototype, supported by simulations and performance-oriented engineering documentation.",
        es: "Diseñé y construí un prototipo de telescopio reflector, respaldado por simulaciones y documentación ingenieril orientada a desempeño.",
      },
      overview: {
        en: "Developed a design workflow combining optical/structural considerations, simulation-driven decisions, and prototype integration, producing a clear deliverable focused on practical implementation.",
        es: "Desarrollé un flujo de diseño combinando consideraciones ópticas/estructurales, decisiones guiadas por simululación e integración de prototipo, generando un entregable claro enfocado en implementación práctica.",
      },

      // Card image (static 16:9). Ej: foto del telescopio / render del ensamblaje.
      image: "/images/optics.png",

      // Modal image opcional (ej: resultados de simulación / diagrama óptico)
      detailImage: "/images/opticsrt.png",

      achievements: [
        {
          en: "Produced an end-to-end design from concept to prototype with an engineering-focused report/presentation.",
          es: "Desarrollé un diseño end-to-end de concepto a prototipo con reporte/presentación de enfoque ingenieril.",
        },
        {
          en: "Supported design decisions with simulation outputs and practical constraints (manufacturing, assembly, alignment).",
          es: "Respaldé decisiones de diseño con simulaciones y restricciones prácticas (manufactura, ensamble, alineación).",
        },
        {
          en: "Documented the system for reproducibility (components, geometry, and test considerations).",
          es: "Documenté el sistema para reproducibilidad (componentes, geometría y consideraciones de prueba).",
        },
      ],
      technologies: [
        "Optical Design",
        "Mechanical Design (CAD)",
        // "COMSOL" (si aplica a tu caso, déjalo)
        "Simulation",
        "Prototyping",
      ],
      links: {
        pdf: {
          en: "/docs/stargazer-en.pdf", // TODO
          es: "/docs/stargazer-es.pdf", // TODO
        },
      },
    },
    {
      id: "mach-zehnder-interferometer",
      title: {
        en: "Mach–Zehnder Interferometer — Build, Alignment, and Optical Characterization",
        es: "Interferómetro de Mach–Zehnder — Construcción, Alineación y Caracterización Óptica",
      },
      category: "Experimental Research",
      shortDescription: {
        en: "Built and aligned a Mach–Zehnder interferometer to study interference fringes, polarization effects, and optical path sensitivity, with MATLAB-supported analysis.",
        es: "Construí y alineé un interferómetro de Mach–Zehnder para estudiar franjas de interferencia, efectos de polarización y sensibilidad al camino óptico, con análisis apoyado en MATLAB.",
      },
      overview: {
        en: "Implemented an optical interferometry setup (source + beam splitters + mirrors + recombination) and performed a controlled study of fringe formation and stability. The work includes polarization control elements and attenuation tests with filters, connecting experimental results with theory and MATLAB-based validation.",
        es: "Implementé un montaje de interferometría óptica (fuente + divisores de haz + espejos + recombinación) y realicé un estudio controlado de la formación y estabilidad de franjas. El trabajo incluye control de polarización y pruebas de atenuación con filtros, conectando resultados experimentales con teoría y validación en MATLAB.",
      },

      // Card image (static 16:9). Ej: foto del setup, diagrama del MZI o captura de franjas.
      image: "/images/mz.png", // TODO

      // Modal image opcional (ej: franjas o diagrama/resultado más técnico)
      detailImage: "/images/mzr.png", // TODO

      achievements: [
        {
          en: "Assembled and aligned a Mach–Zehnder interferometer to obtain stable interference fringes suitable for analysis.",
          es: "Armé y alineé un interferómetro Mach–Zehnder para obtener franjas de interferencia estables y analizables.",
        },
        {
          en: "Studied polarization-dependent behavior using polarization optics (e.g., polarizers / wave plate) and documented its impact on visibility.",
          es: "Estudié el comportamiento dependiente de polarización usando óptica de polarización (p. ej., polarizadores / placa de media onda) y documenté su impacto en la visibilidad.",
        },
        {
          en: "Evaluated intensity attenuation and contrast changes with optical filters and power measurements.",
          es: "Evalué atenuación de intensidad y cambios de contraste con filtros ópticos y mediciones de potencia.",
        },
        {
          en: "Validated observations with MATLAB-supported modeling/simulation and compared with theoretical expectations.",
          es: "Validé observaciones con modelación/simulación en MATLAB y comparé con expectativas teóricas.",
        },
      ],

      technologies: [
        "Optics Lab",
        "Interferometry",
        "Polarization Optics",
        "Optical Filters",
        "MATLAB",
        // "Image Analysis" (si aplicó)
      ],

      links: {
        pdf: {
          en: "/docs/mach-zehnder-en.pdf", // TODO
          es: "/docs/mach-zehnder-es.pdf", // TODO (o tu PDF en español)
        },
      },
    },

];


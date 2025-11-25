"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { Lang } from "../data/projects";

interface ContactSectionProps {
  lang: Lang;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/movzlkwy"

export default function ContactSection({ lang }: ContactSectionProps) {
  const isEn = lang === "en";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: isEn ? "Email" : "Correo",
      value: "jp.sruiz18.tec@gmail.com",
      href: "mailto:jp.sruiz18.tec@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@h4xter1612",
      href: "https://github.com/h4xter1612",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Juan Pablo Solís Ruiz",
      href: "https://www.linkedin.com/in/juan-pablo-solís-ruiz-h4xter",
    },
    {
      icon: MapPin,
      label: isEn ? "Location" : "Ubicación",
      value: "Toluca / CDMX, México",
      href: undefined,
    },
  ];

  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 min-h-screen flex flex-col justify-center py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-semibold text-sky-400 md:text-5xl">
            {isEn ? "Let’s Connect" : "Pongámonos en Contacto"}
          </h2>
          <p className="text-sm text-slate-300 md:text-base">
            {isEn
              ? "Interested in collaboration or have questions about my work?"
              : "¿Interesado en colaborar o tienes preguntas sobre mi trabajo?"}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Panel con iconos */}
          <motion.div
            className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/85 p-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-slate-50 md:text-base">
              {isEn ? "Get in Touch" : "Datos de Contacto"}
            </h3>

            <ul className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800/90">
                    <Icon className="h-4 w-4 text-sky-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-300">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className="text-sm text-slate-100 hover:text-sky-400"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-100">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Formulario */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/85 p-5"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-slate-50 md:text-base">
              {isEn ? "Send a Message" : "Envíame un Mensaje"}
            </h3>
            <div className="space-y-3">
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                placeholder={isEn ? "Your Name" : "Tu Nombre"}
                required
              />
              <input
                type="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                placeholder={isEn ? "Your Email" : "Tu Correo"}
                required
              />
              <textarea
                rows={4}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                placeholder={isEn ? "Your Message" : "Tu Mensaje"}
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-sky-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 hover:bg-sky-400"
            >
              {isEn ? "Send Message" : "Enviar Mensaje"}
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}


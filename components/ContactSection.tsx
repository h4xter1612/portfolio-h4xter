"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { Lang } from "../data/projects";

interface ContactSectionProps {
  lang: Lang;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/movzlkwy";

export default function ContactSection({ lang }: ContactSectionProps) {
  const isEn = lang === "en";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
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
      href: "https://www.linkedin.com/in/juan-pablo-sol%C3%ADs-ruiz-h4xter",
    },
    {
      icon: MapPin,
      label: isEn ? "Location" : "Ubicación",
      value: "Toluca / CDMX, México",
      href: undefined,
    },
  ] as const;

  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 min-h-[80vh] py-16 md:py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
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
            {/* Panel con foto + datos */}
            <motion.div
              className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/85 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                {isEn ? "Get in Touch" : "Datos de Contacto"}
              </h3>

              {/* Foto (4:5) compacta, sin romper estética */}
              <div className="rounded-3xl border border-slate-800/80 bg-slate-950/20 p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 overflow-hidden rounded-2xl ring-1 ring-slate-800/70 aspect-[4/5]">
                    <Image
                      src="/images/jpsr.png"
                      alt={isEn ? "Portrait of Juan Pablo Solís Ruiz" : "Foto de Juan Pablo Solís Ruiz"}
                      fill
                      sizes="80px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-100">
                      Juan Pablo Solís Ruiz
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      {isEn
                        ? "Engineering Physics • Plasma / Fusion • Simulation & Scientific Computing"
                        : "Ing. Física • Plasmas / Fusión • Simulación y Cómputo Científico"}
                    </p>
                  </div>
                </div>
              </div>

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

            {/* Formulario conectado a Formspree */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/85 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                {isEn ? "Send a Message" : "Envíame un Mensaje"}
              </h3>

              <input
                type="hidden"
                name="_subject"
                value={
                  isEn
                    ? "New message from portfolio"
                    : "Nuevo mensaje desde el portafolio"
                }
              />

              <div className="space-y-3">
                <input
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                  placeholder={isEn ? "Your Name" : "Tu Nombre"}
                  required
                />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                  placeholder={isEn ? "Your Email" : "Tu Correo"}
                  required
                />
                <textarea
                  name="message"
                  rows={4}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                  placeholder={isEn ? "Your Message" : "Tu Mensaje"}
                  required
                />
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-full bg-sky-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? isEn
                      ? "Sending..."
                      : "Enviando..."
                    : isEn
                    ? "Send Message"
                    : "Enviar Mensaje"}
                </button>

                <div aria-live="polite">
                  {status === "success" && (
                    <p className="text-xs text-emerald-400">
                      {isEn
                        ? "Message sent successfully. I’ll get back to you soon."
                        : "Mensaje enviado correctamente. Te responderé pronto."}
                    </p>
                  )}

                  {status === "error" && (
                    <p className="text-xs text-red-400">
                      {isEn
                        ? "Something went wrong. Please try again or email me directly."
                        : "Ocurrió un error. Intenta de nuevo o mándame un correo directo."}
                    </p>
                  )}
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


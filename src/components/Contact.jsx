import { useState } from "react";
import { CheckCircle2, Mail, Github, Linkedin, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { contact } from "../data/portfolio";
import { sendContactMessage } from "../lib/api";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "", company: "" };

/**
 * Contact — info panel + form wired to the backend at `POST /api/contact`.
 * Handles validation errors, rate limiting and provider failures, and always
 * offers a direct email fallback so a message is never lost.
 */
export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [feedback, setFeedback] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFeedback(null);
    setFieldErrors({});

    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm(EMPTY_FORM);
      window.setTimeout(() => setStatus("idle"), 9000);
    } catch (error) {
      setStatus("error");
      setFieldErrors(error.errors || {});
      setFeedback({
        message: error.message || "Message could not be sent.",
        fallbackEmail: error.fallbackEmail || contact.email,
      });
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-accent-cyan/50 disabled:opacity-60";
  const labelClasses =
    "mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500";
  const sending = status === "sending";

  return (
    <section id="contact" className="section-anchor section-pad relative">
      <div className="container-x">
        <SectionHeading tag="Contact" title={contact.heading} description={contact.text} />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Info */}
          <Reveal>
            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-4 rounded-2xl glass card-hover p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-indigo/20 text-accent-cyan">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                    {contact.email}
                  </p>
                </div>
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl glass card-hover p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-indigo/20 text-accent-cyan">
                  <Github size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">GitHub</p>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                    github.com/dararamanandhu67-dara
                  </p>
                </div>
              </a>

              {contact.linkedin ? (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl glass card-hover p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-indigo/20 text-accent-cyan">
                    <Linkedin size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">LinkedIn</p>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                      {contact.linkedin.replace("https://", "")}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-2xl glass border-dashed p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500">
                    <Linkedin size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">LinkedIn</p>
                    <p className="text-sm text-slate-500">
                      Add your profile URL in src/data/portfolio.js
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 sm:p-9" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={80}
                    autoComplete="name"
                    disabled={sending}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClasses}
                    aria-invalid={Boolean(fieldErrors.name)}
                  />
                  {fieldErrors.name ? (
                    <p className="mt-2 text-xs text-amber-300">{fieldErrors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={160}
                    autoComplete="email"
                    disabled={sending}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClasses}
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  {fieldErrors.email ? (
                    <p className="mt-2 text-xs text-amber-300">{fieldErrors.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className={labelClasses}>
                  Subject <span className="normal-case text-slate-600">(optional)</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  maxLength={140}
                  disabled={sending}
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Internship opportunity, collaboration…"
                  className={inputClasses}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  maxLength={5000}
                  disabled={sending}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity or the idea you have in mind..."
                  className={`${inputClasses} resize-none`}
                  aria-invalid={Boolean(fieldErrors.message)}
                />
                {fieldErrors.message ? (
                  <p className="mt-2 text-xs text-amber-300">{fieldErrors.message}</p>
                ) : null}
              </div>

              {/* Honeypot — hidden from humans, tempting for bots */}
              <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="btn-primary mt-7 w-full justify-center disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sent" ? (
                  <>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    Message Sent
                  </>
                ) : sending ? (
                  <>
                    <Send size={16} className="animate-pulse" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              <div aria-live="polite" className="mt-4 text-center text-xs">
                {status === "sent" ? (
                  <p className="text-emerald-300">
                    Thanks for reaching out! Your message landed in my inbox — I'll reply soon.
                  </p>
                ) : status === "error" ? (
                  <p className="text-amber-300">
                    {feedback?.message}{" "}
                    <a
                      href={`mailto:${feedback?.fallbackEmail || contact.email}`}
                      className="font-medium text-accent-cyan underline underline-offset-2"
                    >
                      Email me directly
                    </a>
                    .
                  </p>
                ) : (
                  <p className="text-slate-500">
                    Messages go straight to {contact.email}. I usually reply within a day or two.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

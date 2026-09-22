import { useState } from "react";
import { Mail, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { contact } from "../data/portfolio";

/**
 * Contact — info panel + frontend-only form.
 * The form just simulates sending until a backend/email service is wired up.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only for now. Wire this to an email service (Formspree/EmailJS/API) later.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-accent-cyan/50";

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
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity or the idea you have in mind..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button type="submit" className="btn-primary mt-7 w-full justify-center">
                {sent ? (
                  <>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    Message Ready to Send
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-slate-500">
                {sent
                  ? "Thanks! This form is currently frontend-only — I'll connect it to an email service soon." 
                  : "Frontend-only form for now. A backend/email service can be added later."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
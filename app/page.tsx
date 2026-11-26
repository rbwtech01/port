
"use client";

import { useEffect, useState } from "react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "Professional websites that build trust, communicate your value and generate enquiries.",
  },
  {
    number: "02",
    title: "Landing Pages",
    description:
      "Strategic landing pages designed to turn visitors into leads and potential customers.",
  },
  {
    number: "03",
    title: "Web Applications",
    description:
      "Custom dashboards, SaaS platforms and digital products built around your business needs.",
  },
  {
    number: "04",
    title: "E-commerce",
    description:
      "Modern online stores that make discovering and purchasing products simple.",
  },
];

const projects = [
  {
    number: "01",
    category: "SaaS / Web Application",
    title: "SaaS Dashboard",
    description:
      "A concept dashboard exploring analytics, data visualization and modern product interfaces.",
    color: "from-blue-500/20 to-indigo-500/5",
    tag: "Concept project",
  },
  {
    number: "02",
    category: "Business / Website",
    title: "Agency Website",
    description:
      "A concept agency website focused on presenting services and generating qualified enquiries.",
    color: "from-violet-500/20 to-blue-500/5",
    tag: "Concept project",
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme");
    const applyTheme = (dark: boolean) => {
      setIsDark(dark);
      document.documentElement.classList.toggle("dark", dark);
    };

    applyTheme(savedTheme ? savedTheme === "dark" : preference.matches);

    function handlePreferenceChange(event: MediaQueryListEvent) {
      if (localStorage.getItem("theme") === null) {
        applyTheme(event.matches);
      }
    }

    preference.addEventListener("change", handlePreferenceChange);

    return () => {
      preference.removeEventListener("change", handlePreferenceChange);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;

    setIsDark(nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");

    document.documentElement.classList.toggle("dark", nextTheme);
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/85">

        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">

          {/* LOGO */}
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold tracking-tight"
          >
            YOUR NAME<span className="text-blue-600">.</span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            {/* THEME BUTTON */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              {isDark ? (
                // Sun icon
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
              ) : (
                // Moon icon
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
                </svg>
              )}
            </button>

            {/* DESKTOP CTA */}
            <a
              href="#contact"
              className="hidden rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
            >
              Let&apos;s Talk <span className="ml-2">↗</span>
            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-800 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/10 dark:text-white dark:hover:bg-white/10 md:hidden"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>

          </div>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-zinc-200 bg-white px-5 py-6 shadow-xl dark:border-white/10 dark:bg-[#111114] md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">

              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-blue-400"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 rounded-xl bg-blue-600 px-4 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Let&apos;s work together ↗
              </a>

            </div>
          </div>
        )}

      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36"
      >

        <div className="pointer-events-none absolute right-0 top-10 -z-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">

          <div>

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-zinc-600 dark:text-zinc-300">
                Available for new projects
              </span>
            </div>

            <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 sm:text-sm">
              Independent Web Developer
            </p>

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl xl:text-[88px]">
              I build websites
              <span className="block text-zinc-400 dark:text-zinc-500">
                that grow
              </span>
              <span className="text-blue-600 dark:text-blue-500">
                businesses.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              I help businesses, startups and agencies turn ideas into
              powerful digital experiences that attract customers,
              build trust and drive growth.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-700"
              >
                Start a project <span>↗</span>
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-zinc-300 px-8 py-4 text-sm font-semibold transition hover:bg-zinc-100 dark:border-white/15 dark:hover:bg-white/5"
              >
                Explore my work <span>↓</span>
              </a>

            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>Tailwind CSS</span>
              <span>React</span>
            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-md">

            <div className="absolute -inset-5 rounded-[35px] bg-blue-500/10 blur-2xl" />

            <div className="relative rounded-[28px] border border-zinc-200 bg-zinc-50 p-5 shadow-2xl shadow-zinc-900/5 dark:border-white/10 dark:bg-[#111114] dark:shadow-black/20 sm:p-7">

              <div className="flex items-center justify-between border-b border-zinc-200 pb-5 dark:border-white/10">
                <span className="text-sm font-semibold">Digital Experience</span>
                <span className="text-xs text-zinc-500">01 / 03</span>
              </div>

              <div className="py-12">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                  ✳
                </div>

                <h2 className="text-3xl font-bold tracking-tight">
                  Ideas into
                  <span className="block text-blue-600 dark:text-blue-400">
                    reality.
                  </span>
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  Thoughtful design. Modern technology.
                  Meaningful business outcomes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-2xl bg-white p-4 dark:bg-white/5">
                  <p className="text-xs text-zinc-500">Approach</p>
                  <p className="mt-2 text-sm font-semibold">Strategy first</p>
                </div>

                <div className="rounded-2xl bg-white p-4 dark:bg-white/5">
                  <p className="text-xs text-zinc-500">Focus</p>
                  <p className="mt-2 text-sm font-semibold">Growth driven</p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* WORK */}
      <section
        id="work"
        className="scroll-mt-24 border-t border-zinc-200 px-5 py-24 dark:border-white/10 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            Selected Work
          </p>

          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Digital work with
              <span className="text-zinc-400 dark:text-zinc-500"> purpose.</span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              Selected concepts demonstrating how I approach design,
              development and business challenges.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">

            {projects.map((project) => (
              <article
                key={project.number}
                className="group rounded-3xl border border-zinc-200 bg-zinc-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] sm:p-6"
              >

                <div className={`flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.color}`}>
                  <div className="text-center transition duration-500 group-hover:scale-105">
                    <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300">
                      {project.category}
                    </span>
                    <h3 className="mt-4 text-3xl font-bold sm:text-4xl">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-6">
                  <span className="text-xs text-zinc-500">
                    {project.number} / {project.tag}
                  </span>
                  <span className="text-xl text-blue-600">↗</span>
                </div>

                <p className="mt-3 text-lg font-semibold">{project.title}</p>

                <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  {project.description}
                </p>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="scroll-mt-24 border-t border-zinc-200 px-5 py-24 dark:border-white/10 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            Services
          </p>

          <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            How I can help
            <span className="text-zinc-400 dark:text-zinc-500"> your business.</span>
          </h2>

          <div className="mt-14 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">

            {services.map((service) => (
              <div
                key={service.number}
                className="grid gap-4 py-8 md:grid-cols-[80px_1fr_1fr] md:items-center"
              >
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {service.number}
                </span>

                <h3 className="text-xl font-semibold sm:text-2xl">
                  {service.title}
                </h3>

                <p className="max-w-md text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  {service.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-zinc-200 px-5 py-24 dark:border-white/10 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              About Me
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              More than just
              <span className="text-zinc-400 dark:text-zinc-500"> writing code.</span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-zinc-600 dark:text-zinc-400">
              I believe a website should do more than look beautiful.
              It should communicate value, build trust and help a
              business move forward.
            </p>

            <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
              My approach combines modern development, thoughtful
              user experiences and an understanding of business goals.
              Every project starts with understanding the problem.
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-zinc-200 px-5 py-24 dark:border-white/10 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">

          <div className="rounded-[30px] bg-blue-600 px-6 py-16 text-center text-white sm:px-12 sm:py-24">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-100">
              Have a project in mind?
            </p>

            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s build something meaningful together.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Have an idea, a business challenge or a project?
              Let&apos;s talk about how I can help.
            </p>

            <a
              href="mailto:hello@example.com"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
            >
              Start a conversation ↗
            </a>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 px-5 py-8 dark:border-white/10 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <a href="#home" className="text-lg font-bold">
            YOUR NAME<span className="text-blue-600">.</span>
          </a>

          <p className="text-xs text-zinc-500">
            © Your Name. All rights reserved.
          </p>

          <a
            href="#home"
            className="text-sm text-zinc-500 transition hover:text-blue-600"
          >
            Back to top ↑
          </a>

        </div>
      </footer>

    </main>
  );
}

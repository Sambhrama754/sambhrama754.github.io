/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { Sun, Moon, ExternalLink } from "lucide-react";

import { Toast } from "./components/ui/Toast";
import { SafeLink } from "./components/ui/SafeLink";
import { AnimatedTitle } from "./components/ui/AnimatedTitle";
import { ParallaxSection } from "./components/layout/ParallaxSection";

import { certificates, aiProjects, skills } from "./data/constants";
import React from "react";

const ProjectCard = React.memo(({ project, i }: { project: any, i: number }) => (
  <motion.div
    className="flex flex-col border-b border-muted/20 pb-8 group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-50px" }}
    transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 30 }}
    whileHover={{ x: 10 }}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
      <h3 className="font-display text-4xl md:text-5xl group-hover:opacity-50 transition-opacity">{project.title}</h3>
      <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase">
        <SafeLink href={project.repo} className="hover:text-fg text-muted transition-colors" aria-label={`View ${project.title} repository`}>[ REPO ]</SafeLink>
      </div>
    </div>
    <p className="text-lg md:text-xl font-light text-muted mb-6 max-w-2xl">{project.description}</p>
    <div className="flex flex-col gap-3">
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-medium">Technologies Used:</span>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t: string, idx: number) => (
          <span key={idx} className="text-[9px] tracking-[0.2em] uppercase border border-muted/30 bg-muted/5 px-3 py-1.5 rounded-full text-fg/90 hover:bg-fg hover:text-bg transition-colors cursor-default">{t}</span>
        ))}
      </div>
    </div>
  </motion.div>
));

const CertificateCard = React.memo(({ cert }: { cert: any }) => (
  <SafeLink
    href={cert.link}
    className="flex flex-col border-b border-muted/20 pb-6 group cursor-pointer relative"
    whileHover={{ x: 10 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    aria-label={`View certificate for ${cert.title}`}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
      <h3 className="font-display text-3xl md:text-5xl transition-all duration-300 flex items-center gap-4 group-hover:text-fg/70 group-hover:underline decoration-1 underline-offset-8">
        {cert.title}
        {cert.link !== "#" && <ExternalLink size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
      </h3>
      <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase text-muted mt-2 md:mt-0">
        <span>{cert.role}</span>
        <span>&mdash;</span>
        <span className={cert.status === "In Progress" ? "text-yellow-500/70" : ""}>{cert.year}</span>
      </div>
    </div>

    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
      <div className="overflow-hidden">
        <p className="pt-4 text-sm md:text-base text-muted max-w-2xl font-light leading-relaxed">
          {cert.details}
        </p>
      </div>
    </div>
  </SafeLink>
));

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { scrollY } = useScroll();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  return (
    <div className="bg-bg text-fg selection:bg-fg selection:text-bg transition-colors duration-500 ease-in-out">
      <div className="grain"></div>
      <Toast />

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`flex justify-between items-center pointer-events-auto overflow-hidden ${isScrolled
              ? "mt-4 md:mt-6 w-[95%] md:w-auto px-6 py-3 bg-header-bg backdrop-blur-xl border border-header-border rounded-full shadow-2xl"
              : "mt-0 w-full px-6 py-8 md:px-12 bg-transparent border-transparent rounded-none"
            }`}
        >
          <motion.div layout className="font-ndot text-lg md:text-xl tracking-widest uppercase whitespace-nowrap">
            SAMBHRAMA KHUSHI
          </motion.div>
          <motion.nav layout className={`flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase ${isScrolled ? 'ml-6 md:ml-12' : ''}`}>
            <a href="#projects" className="hover:opacity-50 transition-opacity hidden sm:block">Proj</a>
            <a href="#certificates" className="hover:opacity-50 transition-opacity hidden sm:block">Certs</a>
            <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="hover:opacity-50 transition-opacity cursor-pointer ml-1 flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
            </button>
          </motion.nav>
        </motion.div>
      </header>

      <main>
        {/* Hero */}
        <ParallaxSection
          id="hero"
          overlay={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase text-muted z-20 flex flex-col items-center gap-4"
            >
              <span>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-muted/50"
              />
            </motion.div>
          }
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              hidden: {}
            }}
            className="flex flex-col items-center"
          >
            <div className="overflow-hidden">
              <motion.h1
                variants={{ hidden: { y: "100%", rotate: 5 }, visible: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className="font-display text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter text-center uppercase"
              >
                AI & ML
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={{ hidden: { y: "100%", rotate: -5 }, visible: { y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className="font-display text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter text-center uppercase"
              >
                ENGINEER
              </motion.h1>
            </div>
          </motion.div>
        </ParallaxSection>

        {/* AI/ML Projects */}
        <ParallaxSection id="projects">
          <div className="w-full max-w-5xl flex flex-col items-center gap-12">
            <AnimatedTitle text="AI / ML PROJECTS" className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tighter leading-none text-center" />
            <div className="w-full flex flex-col gap-12 mt-8">
              {aiProjects.map((project, i) => (
                <ProjectCard key={i} project={project} i={i} />
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* Certificates */}
        <ParallaxSection id="certificates">
          <div className="w-full max-w-5xl flex flex-col items-center gap-12">
            <AnimatedTitle text="CERTIFICATES" className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tighter leading-none text-center" />
            <div className="w-full flex flex-col gap-6 mt-8">
              {certificates.map((cert, i) => (
                <CertificateCard key={i} cert={cert} />
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* About */}
        <ParallaxSection id="about">
          <div className="max-w-3xl text-center flex flex-col items-center gap-12">
            <AnimatedTitle text="ABOUT" className="font-display text-6xl md:text-8xl lg:text-[10vw] uppercase tracking-tighter leading-none" />
            <p className="text-xl md:text-3xl font-light leading-relaxed">
              Machine Learning & AI Engineer proficient in Python. Bridging the gap between intelligent systems and web development. Linux enthusiast since 2020.
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                },
                hidden: {}
              }}
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
                  }}
                  className="border border-muted/30 px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-fg hover:text-bg transition-colors cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ParallaxSection>

        {/* Contact */}
        <ParallaxSection id="contact">
          <div className="flex flex-col items-center gap-12">
            <AnimatedTitle text="CONTACT" className="font-display text-6xl md:text-8xl lg:text-[10vw] uppercase tracking-tighter leading-none" />
            <div className="flex flex-col items-center gap-12">
              <motion.a
                href="mailto:sambhrmakhushi@gmail.com"
                className="font-display text-3xl md:text-5xl uppercase tracking-tighter transition-opacity text-center inline-block"
                whileHover={{ scale: 1.05, opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                aria-label="Email Sambhrama Khushi"
              >
                SAMBHRMAKHUSHI@GMAIL.COM
              </motion.a>
              <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase text-muted">
                <a href="https://github.com/Sambhrama754" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors" aria-label="Github Profile">Github</a>
                <a href="https://www.kaggle.com/sambhramakhushi" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors" aria-label="Kaggle Profile">Kaggle</a>
              </div>
              <p className="text-muted text-xs tracking-widest uppercase mt-8">
                &copy; {new Date().getFullYear()} <span className="font-ndot">Sambhrama Khushi</span>. All rights reserved.
              </p>
            </div>
          </div>
        </ParallaxSection>
      </main>
    </div>
  );
}

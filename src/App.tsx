/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Sun, Moon, ExternalLink } from "lucide-react";

function ParallaxSection({ 
  children, 
  id, 
  className = "", 
  overlay 
}: { 
  children: React.ReactNode, 
  id?: string, 
  className?: string, 
  overlay?: React.ReactNode 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects: move slightly opposite to scroll direction
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  // Fade in and out at the very edges to prevent tall sections from disappearing while reading
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  // Scale down slightly when entering/leaving
  const scale = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.98, 1, 1, 0.98]);
  
  // Optimized blur: rounding the pixel value prevents expensive sub-pixel recalculations (jank)
  const blurValue = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [12, 0, 0, 12]);
  const filter = useTransform(blurValue, (v) => `blur(${Math.round(v)}px)`);

  return (
    <section id={id} ref={ref} className={`min-h-screen py-32 w-full snap-start relative flex items-center justify-center px-6 ${className}`}>
      <motion.div style={{ y, opacity, scale, filter, willChange: "transform, opacity, filter" }} className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10">
        {children}
      </motion.div>
      {overlay}
    </section>
  );
}

const certificates = [
  { 
    title: "MACHINE LEARNING WITH PYTHON", 
    role: "FREECODECAMP", 
    year: "2024", 
    link: "https://www.freecodecamp.org/certification/sambhrama27/machine-learning-with-python-v7",
    status: "Completed",
    details: "Comprehensive certification covering neural networks, deep learning, and practical ML algorithms using Python, TensorFlow, and Scikit-learn."
  },
  { 
    title: "PYTHON CERTIFICATION", 
    role: "FREECODECAMP", 
    year: "IN PROGRESS", 
    link: "https://www.freecodecamp.org/learn/python-v9",
    status: "In Progress",
    details: "Learning core programming concepts, data structures, and algorithms using Python for scientific computing."
  },
  { 
    title: "CS50: INTRO TO COMPUTER SCIENCE", 
    role: "HARVARD UNIVERSITY", 
    year: "IN PROGRESS", 
    link: "#",
    status: "In Progress",
    details: "Harvard's premier introduction to the intellectual enterprises of computer science and the art of programming."
  },
];

const aiProjects = [
  {
    title: "CROP RECOMMENDER ARDUINO",
    description: "An IoT and Machine Learning integrated system to recommend optimal crops based on soil and environmental data.",
    tech: ["Python", "Machine Learning", "Arduino", "IoT"],
    repo: "https://github.com/Sambhrama754/Crop-reccomender-ardiuno"
  },
  {
    title: "KAGGLE COMPETITIONS",
    description: "Active participant in various Kaggle data science and machine learning competitions. Developing predictive models and exploratory data analysis notebooks.",
    tech: ["Python", "Pandas", "Scikit-Learn", "XGBoost"],
    repo: "https://www.kaggle.com/sambhramakhushi/competitions"
  }
];

const skills = ["Python", "Machine Learning", "Artificial Intelligence", "Web Development", "Linux", "Data Science", "Bash", "Android Modding"];

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
    <div className="bg-bg text-fg selection:bg-fg selection:text-bg">
      <div className="grain"></div>

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center">
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`flex justify-between items-center pointer-events-auto overflow-hidden ${
            isScrolled
              ? "mt-4 md:mt-6 w-[95%] md:w-auto px-6 py-3 bg-header-bg backdrop-blur-xl border border-header-border rounded-full shadow-2xl"
              : "mt-0 w-full px-6 py-8 md:px-12 bg-transparent border-transparent rounded-none"
          }`}
        >
          <motion.div layout className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium whitespace-nowrap">
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
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase text-muted z-20"
            >
              Scroll to explore
            </motion.div>
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter text-center uppercase">
              AI & ML<br/>ENGINEER
            </h1>
          </motion.div>
        </ParallaxSection>

        {/* AI/ML Projects */}
        <ParallaxSection id="projects">
          <div className="w-full max-w-5xl flex flex-col items-center gap-12">
            <motion.h2 
              className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tighter leading-none text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              AI / ML PROJECTS
            </motion.h2>
            <div className="w-full flex flex-col gap-12 mt-8">
              {aiProjects.map((project, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col border-b border-muted/20 pb-8 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
                    <h3 className="font-display text-4xl md:text-5xl group-hover:opacity-50 transition-opacity">{project.title}</h3>
                    <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase">
                      <a href={project.repo} className="hover:text-fg text-muted transition-colors">[ REPO ]</a>
                    </div>
                  </div>
                  <p className="text-lg md:text-xl font-light text-muted mb-6 max-w-2xl">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="text-[9px] tracking-[0.2em] uppercase border border-muted/30 px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* Certificates */}
        <ParallaxSection id="certificates">
          <div className="w-full max-w-5xl flex flex-col items-center gap-12">
            <motion.h2 
              className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tighter leading-none text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              CERTIFICATES
            </motion.h2>
            <div className="w-full flex flex-col gap-6 mt-8">
              {certificates.map((cert, i) => (
                <motion.a 
                  href={cert.link !== "#" ? cert.link : undefined}
                  target={cert.link !== "#" ? "_blank" : undefined}
                  rel={cert.link !== "#" ? "noopener noreferrer" : undefined}
                  key={i}
                  className="flex flex-col border-b border-muted/20 pb-6 group cursor-pointer relative"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                    <h3 className="font-display text-3xl md:text-5xl group-hover:opacity-50 transition-opacity flex items-center gap-4">
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
                </motion.a>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* About */}
        <ParallaxSection id="about">
          <div className="max-w-3xl text-center flex flex-col items-center gap-12">
            <motion.h2 
              className="font-display text-6xl md:text-8xl lg:text-[10vw] uppercase tracking-tighter leading-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              whileHover={{ scale: 1.05, opacity: 0.4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              ABOUT
            </motion.h2>
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
            <motion.h2 
              className="font-display text-6xl md:text-8xl lg:text-[10vw] uppercase tracking-tighter leading-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              whileHover={{ scale: 1.05, opacity: 0.4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              CONTACT
            </motion.h2>
            <div className="flex flex-col items-center gap-12">
              <a 
                href="mailto:sambhrmakhushi@gmail.com" 
                className="font-display text-3xl md:text-5xl uppercase tracking-tighter hover:opacity-40 transition-opacity text-center"
              >
                SAMBHRMAKHUSHI@GMAIL.COM
              </a>
              <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase text-muted">
                <a href="https://github.com/Sambhrama754" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">Github</a>
                <a href="https://www.kaggle.com/sambhramakhushi" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">Kaggle</a>
              </div>
              <p className="text-muted text-xs tracking-widest uppercase mt-8">
                &copy; {new Date().getFullYear()} Sambhrama Khushi. All rights reserved.
              </p>
            </div>
          </div>
        </ParallaxSection>
      </main>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect } from "react";

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
  const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  // Fade in and out
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  // Scale down slightly when entering/leaving
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);
  // Blur effect for cinematic transitions
  const filter = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <section id={id} ref={ref} className={`h-screen w-full snap-start relative flex items-center justify-center px-6 overflow-hidden ${className}`}>
      <motion.div style={{ y, opacity, scale, filter, willChange: "transform, opacity, filter" }} className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10">
        {children}
      </motion.div>
      {overlay}
    </section>
  );
}

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
    setIsScrolled(latest > 50);
  });

  const certificates = [
    { title: "FREECODECAMP", role: "RESPONSIVE WEB DESIGN", year: "2023" },
    { title: "FREECODECAMP", role: "JS ALGORITHMS & DATA STRUCTURES", year: "2023" },
    { title: "FREECODECAMP", role: "FRONT END LIBRARIES", year: "2024" },
    { title: "OTHER CERTS", role: "VARIOUS SKILLS", year: "2024" },
  ];

  const phones = [
    { title: "REDMI NOTE 3", role: "CUSTOM ROM", year: "2018" },
    { title: "MOTOROLA G5S", role: "CUSTOM ROM", year: "2019" },
    { title: "LENOVO A7700", role: "CUSTOM ROM", year: "2017" },
    { title: "NOKIA 6.1", role: "CUSTOM ROM", year: "2020" },
    { title: "REDMI 4A", role: "CUSTOM ROM", year: "2018" },
    { title: "CMF PHONE 1", role: "STOCK ROM", year: "2024" },
  ];

  return (
    <div className="bg-bg text-fg selection:bg-fg selection:text-bg">
      <div className="grain"></div>

      {/* Minimal Header */}
      <header className={`fixed top-0 left-0 w-full flex justify-between items-start z-40 transition-all duration-500 pointer-events-none ${
        isScrolled 
          ? "p-6 bg-header-bg backdrop-blur-md border-b border-header-border" 
          : "p-6 md:p-12 bg-transparent border-b border-transparent"
      }`}>
        <div className="text-[10px] tracking-[0.3em] uppercase leading-relaxed">
          System.Dev<br/>
          Portfolio ©26
        </div>
        <nav className="flex flex-col items-end gap-3 text-[10px] tracking-[0.3em] uppercase pointer-events-auto">
          <button 
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className="hover:opacity-50 transition-opacity mb-4 cursor-pointer"
          >
            {theme === 'dark' ? '[ Light Mode ]' : '[ Dark Mode ]'}
          </button>
          <a href="#certificates" className="hover:opacity-50 transition-opacity">Certificates</a>
          <a href="#modding" className="hover:opacity-50 transition-opacity">Modding</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </nav>
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
                <motion.div 
                  key={i}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-muted/20 pb-6 group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <h3 className="font-display text-3xl md:text-5xl group-hover:opacity-50 transition-opacity">{cert.title}</h3>
                  <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase text-muted mt-2 md:mt-0">
                    <span>{cert.role}</span>
                    <span>&mdash;</span>
                    <span>{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* Phone Modding */}
        <ParallaxSection id="modding">
          <div className="w-full max-w-5xl flex flex-col items-center gap-12">
            <motion.h2 
              className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tighter leading-none text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              PHONE MODDING
            </motion.h2>
            <div className="w-full flex flex-col gap-6 mt-8">
              {phones.map((phone, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-muted/20 pb-6 group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <h3 className="font-display text-3xl md:text-5xl group-hover:opacity-50 transition-opacity">{phone.title}</h3>
                  <div className="flex gap-4 text-[10px] tracking-[0.2em] uppercase text-muted mt-2 md:mt-0">
                    <span className={phone.role === "STOCK ROM" ? "text-fg" : ""}>{phone.role}</span>
                    <span>&mdash;</span>
                    <span>{phone.year}</span>
                  </div>
                </motion.div>
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
                href="mailto:hello@example.com" 
                className="font-display text-3xl md:text-5xl uppercase tracking-tighter hover:opacity-40 transition-opacity"
              >
                HELLO@SYSTEM.DEV
              </a>
              <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase text-muted">
                <a href="#" className="hover:text-fg transition-colors">Instagram</a>
                <a href="#" className="hover:text-fg transition-colors">Twitter</a>
                <a href="#" className="hover:text-fg transition-colors">Github</a>
              </div>
            </div>
          </div>
        </ParallaxSection>
      </main>
    </div>
  );
}

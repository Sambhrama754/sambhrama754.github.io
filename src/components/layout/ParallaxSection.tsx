import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxSection({ 
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

  return (
    <section id={id} ref={ref} className={`min-h-screen py-32 w-full snap-start relative flex items-center justify-center px-6 ${className}`}>
      <motion.div style={{ y, opacity, scale, willChange: "transform, opacity" }} className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10">
        {children}
      </motion.div>
      {overlay}
    </section>
  );
}

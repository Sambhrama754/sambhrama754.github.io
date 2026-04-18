import { motion } from "motion/react";

export const AnimatedTitle = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.h2
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", rotate: 5, opacity: 0 },
              visible: { y: 0, rotate: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 200 } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
};

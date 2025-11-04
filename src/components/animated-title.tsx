"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTitleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedTitle({ children, className, delay = 0 }: AnimatedTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedTitleWithUnderline({ children, className }: AnimatedTitleProps) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 origin-left mt-2"
      />
    </div>
  );
}


"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionStagger({ children, className, delay = 0 }: MotionStaggerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.12,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

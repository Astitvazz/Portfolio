"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  icon?: React.ReactNode;
  proficiency?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, icon, proficiency }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-[family:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
            {name}
          </h3>
          {proficiency && (
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-2 rounded-full bg-primary transition-all duration-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${proficiency}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;

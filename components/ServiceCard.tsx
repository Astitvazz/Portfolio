"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group rounded-[1.75rem] border border-border/70 bg-background/80 shadow-sm transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-5 pb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="font-[family:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;

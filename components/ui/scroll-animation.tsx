'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;

  animateOnce?: boolean;

  duration?: number;

  delay?: number;

  y?: number;

  opacity?: number;

  scale?: number;

  amount?: number;

  className?: string;
}

export function ScrollAnimation({
  children,
  animateOnce = true,
  duration = 0.5,
  delay = 0.2,
  y = 60,
  opacity = 0,
  scale = 1,
  amount = 0.3,
  className = '',
}: ScrollAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: animateOnce, amount }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

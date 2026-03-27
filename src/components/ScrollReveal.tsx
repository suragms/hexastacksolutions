import * as React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: keyof typeof motion;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
  as = 'div',
}: ScrollRevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={defaultVariants}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

const staggerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface ScrollRevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function ScrollRevealStagger({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: ScrollRevealStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={staggerItemVariants}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

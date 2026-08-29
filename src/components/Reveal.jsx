import { motion, useReducedMotion } from 'framer-motion';

// Wraps a section so it fades/slides in once scrolled into view. Skips the
// motion entirely for users with prefers-reduced-motion set, per
// framer-motion's built-in hook rather than a manual matchMedia check.
export default function Reveal({ children }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return children;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

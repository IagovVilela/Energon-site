import { Variants } from "framer-motion";

// Ease curves profissionais
export const easeOutCubic = [0.25, 0.46, 0.45, 0.94];
export const easeInOutBack = [0.68, -0.55, 0.265, 1.55];

// Fade variants com blur
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Slide variants
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOutCubic,
    },
  },
};

// Scale variants
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(4px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: easeInOutBack,
    },
  },
};

// Container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

// Hover e interaction variants
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1,
  },
};

// Spring configurations
export const spring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

export const stiffSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export const bounceSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 10,
};

// Smooth transitions
export const smoothTransition = {
  duration: 0.4,
  ease: easeOutCubic,
};

export const quickTransition = {
  duration: 0.2,
  ease: easeOutCubic,
};


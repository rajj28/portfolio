import { Variants } from "framer-motion";

/**
 * Fade in animation variant
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Fade in up animation variant
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Fade in down animation variant
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Slide in from left animation variant
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Slide in from right animation variant
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Scale up animation variant
 */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

/**
 * Stagger container animation variant
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

/**
 * Stagger item animation variant (to be used with staggerContainer)
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

/**
 * Card hover animation variant - Smooth and subtle
 */
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  hover: { 
    scale: 1.02, 
    y: -8,
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

/**
 * Button hover animation variant
 */
export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

/**
 * Expand animation for featured project cards
 */
export const expandCard: Variants = {
  collapsed: { 
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  expanded: { 
    scale: 1.5,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};


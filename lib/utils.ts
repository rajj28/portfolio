import { ClassValue, clsx } from "clsx";

/**
 * Utility function to merge Tailwind CSS classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Smooth scroll to an element by ID
 * @param elementId - ID of the element to scroll to
 */
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Calculate parallax offset based on scroll position
 * @param scrollY - Current scroll Y position
 * @param speed - Parallax speed multiplier
 * @returns Transform value
 */
export function getParallaxOffset(scrollY: number, speed: number = 0.5): number {
  return scrollY * speed;
}


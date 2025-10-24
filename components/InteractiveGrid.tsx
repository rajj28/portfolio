"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const gridCellsRef = useRef<any[]>([]);
  const headingHoverRef = useRef<{ x: number; y: number; active: boolean } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };

    // Grid configuration
    const gridSize = 40; // Match the background grid
    const highlightRadius = 150; // Area around cursor to highlight
    const headingRadius = 200; // Larger area for heading hover
    const maxIntensity = 0.6; // Maximum highlight intensity

    // Initialize grid cells
    const initGrid = () => {
      gridCellsRef.current = [];
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          gridCellsRef.current.push({
            x: i * gridSize,
            y: j * gridSize,
            intensity: 0,
            scale: 1,
          });
        }
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is over the best-work section
      const bestWorkSection = document.getElementById('best-work');
      if (bestWorkSection) {
        const rect = bestWorkSection.getBoundingClientRect();
        const isOverBestWork = 
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        
        // If over best-work section, set mouse position far off-screen to disable effect
        if (isOverBestWork) {
          mouseRef.current = { x: -9999, y: -9999 };
          return;
        }
      }
      
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Heading hover handler (triggered by custom events)
    const handleHeadingHover = (e: CustomEvent) => {
      headingHoverRef.current = {
        x: e.detail.x,
        y: e.detail.y,
        active: e.detail.active,
      };
    };

    window.addEventListener('headingHover', handleHeadingHover as EventListener);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const headingHover = headingHoverRef.current;

      gridCellsRef.current.forEach((cell) => {
        let targetIntensity = 0;

        // Calculate distance from mouse to cell
        const dx = mouse.x - (cell.x + gridSize / 2);
        const dy = mouse.y - (cell.y + gridSize / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse hover intensity
        if (distance < highlightRadius) {
          targetIntensity = Math.max(0, (1 - distance / highlightRadius) * maxIntensity);
        }

        // Heading hover intensity (takes priority if active)
        if (headingHover && headingHover.active) {
          const hdx = headingHover.x - (cell.x + gridSize / 2);
          const hdy = headingHover.y - (cell.y + gridSize / 2);
          const headingDistance = Math.sqrt(hdx * hdx + hdy * hdy);

          if (headingDistance < headingRadius) {
            const headingIntensity = Math.max(
              0,
              (1 - headingDistance / headingRadius) * (maxIntensity * 1.2)
            );
            targetIntensity = Math.max(targetIntensity, headingIntensity);
          }
        }

        // Smooth transition using GSAP-like easing
        cell.intensity += (targetIntensity - cell.intensity) * 0.15;

        // Calculate scale for pop-out effect
        const targetScale = 1 + cell.intensity * 0.2;
        cell.scale += (targetScale - cell.scale) * 0.15;

        if (cell.intensity > 0.01) {
          ctx.save();

          // Apply scale transform for pop-out effect
          const centerX = cell.x + gridSize / 2;
          const centerY = cell.y + gridSize / 2;
          ctx.translate(centerX, centerY);
          ctx.scale(cell.scale, cell.scale);
          ctx.translate(-centerX, -centerY);

          // Draw glowing cell background
          const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            gridSize * 0.7
          );
          gradient.addColorStop(
            0,
            `rgba(14, 165, 233, ${cell.intensity * 0.3})`
          );
          gradient.addColorStop(
            1,
            `rgba(14, 165, 233, ${cell.intensity * 0.05})`
          );

          ctx.fillStyle = gradient;
          ctx.fillRect(cell.x, cell.y, gridSize, gridSize);

          // Draw highlighted grid lines
          ctx.strokeStyle = `rgba(14, 165, 233, ${cell.intensity})`;
          ctx.lineWidth = 2;

          // Vertical line
          ctx.beginPath();
          ctx.moveTo(cell.x, cell.y);
          ctx.lineTo(cell.x, cell.y + gridSize);
          ctx.stroke();

          // Horizontal line
          ctx.beginPath();
          ctx.moveTo(cell.x, cell.y);
          ctx.lineTo(cell.x + gridSize, cell.y);
          ctx.stroke();

          // Add subtle glow effect
          ctx.shadowColor = "rgba(14, 165, 233, 0.5)";
          ctx.shadowBlur = cell.intensity * 20;

          // Draw corner dots for extra detail
          ctx.fillStyle = `rgba(14, 165, 233, ${cell.intensity * 0.8})`;
          ctx.beginPath();
          ctx.arc(cell.x, cell.y, 2 * cell.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      requestAnimationFrame(animate);
    };

    // Initialize
    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('headingHover', handleHeadingHover as EventListener);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}



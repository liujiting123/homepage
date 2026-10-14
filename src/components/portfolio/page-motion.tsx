"use client";

import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const entrance = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            if (!reduced.matches) {
              (entry.target as HTMLElement).style.animationDelay =
                `${Math.min(index, 3) * 70}ms`;
              entry.target.classList.add("research-enter");
            }
            entrance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((node) => entrance.observe(node));
    return () => {
      entrance.disconnect();
    };
  }, []);
  return null;
}

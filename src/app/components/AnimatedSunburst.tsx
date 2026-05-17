"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedSunburst() {
  const sunburstRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const sunburst = sunburstRef.current;
    const section = sunburst?.closest("section");
    const target = section?.querySelector("[data-services-intro]");

    if (!sunburst || !target) {
      return;
    }

    let startTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.98) {
          startTimer = window.setTimeout(() => setIsActive(true), 2000);
          observer.disconnect();
        }
      },
      { threshold: [0.98] },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (startTimer) {
        window.clearTimeout(startTimer);
      }
    };
  }, []);

  return (
    <div
      ref={sunburstRef}
      className="services-sunburst"
      data-active={isActive ? "true" : "false"}
      aria-hidden="true"
    >
      <div className="services-sunburst-shape" />
    </div>
  );
}

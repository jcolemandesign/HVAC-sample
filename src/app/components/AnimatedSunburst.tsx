"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedSunburst() {
  const sunburstRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const sunburst = sunburstRef.current;
    const section = sunburst?.closest("section");

    if (!sunburst || !section) {
      return;
    }

    let startTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTimer = window.setTimeout(() => setIsActive(true), 350);
          observer.disconnect();
        }
      },
      { rootMargin: "35% 0px 0px 0px", threshold: 0.02 },
    );

    observer.observe(section);

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

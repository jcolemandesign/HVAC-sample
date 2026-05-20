"use client";

import { useEffect, useRef, useState } from "react";

type Reason = {
  title: string;
  description: string;
};

type WhyChooseGridProps = {
  reasons: Reason[];
};

const reasonIcons = [
  "icon-recommendations",
  "icon-repair-first",
  "icon-van",
  "icon-team",
];

export function WhyChooseGrid({ reasons }: WhyChooseGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="mt-14 grid gap-[2px] overflow-hidden rounded-[5px] md:grid-cols-2"
      data-visible={isVisible ? "true" : "false"}
    >
      {reasons.map((reason, index) => (
        <article
          key={reason.title}
          className="why-card grid min-h-[19rem] grid-cols-[clamp(4.75rem,9vw,7rem)_minmax(0,1fr)] items-center gap-4 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] px-8 py-12 text-[#273c5b] md:gap-5 lg:px-10"
          style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
        >
          <div className="flex h-full items-center justify-center pl-2 md:pl-4">
            <span
              className={`icon-mask why-card-icon ${reasonIcons[index] ?? reasonIcons[0]}`}
              aria-hidden="true"
            />
          </div>
          <div className="w-full max-w-[35rem] text-left">
            <h3 className="type-card-header text-[#273c5b]">
              {reason.title}
            </h3>
            <p className="type-large-text mt-5 text-[#273c5b]">
              {reason.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

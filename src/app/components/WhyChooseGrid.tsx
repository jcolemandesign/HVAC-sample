"use client";

import { useEffect, useRef, useState } from "react";

type Reason = {
  title: string;
  description: string;
};

type WhyChooseGridProps = {
  reasons: Reason[];
};

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
      className="mt-14 grid gap-[2px] overflow-hidden rounded-[8px] md:grid-cols-2"
      data-visible={isVisible ? "true" : "false"}
    >
      {reasons.map((reason, index) => (
        <article
          key={reason.title}
          className="why-card flex min-h-[19rem] flex-col items-center justify-center bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] px-8 py-12"
          style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
        >
          <div className="w-full max-w-[35rem] text-left">
            <h3 className="text-2xl font-light text-[#273c5b]">
              {reason.title}
            </h3>
            <p className="mt-5 text-lg font-light leading-8 text-[#273c5b]">
              {reason.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

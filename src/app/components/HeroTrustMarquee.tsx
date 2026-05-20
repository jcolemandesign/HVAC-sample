"use client";

import { useEffect, useRef } from "react";

type TrustItem = {
  text: string;
  star?: boolean;
};

type HeroTrustMarqueeProps = {
  items: TrustItem[];
};

export function HeroTrustMarquee({ items }: HeroTrustMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rateRef = useRef(1);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);

  const setPlaybackRate = (rate: number) => {
    rateRef.current = rate;
  };

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let previousTime = performance.now();

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    const tick = (time: number) => {
      const loopWidth = loopWidthRef.current;
      const elapsedSeconds = (time - previousTime) / 1000;

      previousTime = time;

      if (!motionQuery.matches && loopWidth > 0) {
        const basePixelsPerSecond = loopWidth / 32;
        offsetRef.current = (offsetRef.current + basePixelsPerSecond * rateRef.current * elapsedSeconds) % loopWidth;
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);

    resizeObserver.observe(track);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="hero-trust-marquee relative z-20 bg-[#152435] py-[1.375rem] text-white shadow-[0_-18px_34px_rgba(21,36,53,0.22)]"
      onPointerEnter={() => setPlaybackRate(1.15)}
      onPointerLeave={() => setPlaybackRate(1)}
    >
      <div ref={trackRef} className="hero-trust-track flex items-center" style={{ animation: "none" }}>
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className="type-banner flex min-w-max items-center px-8 uppercase tracking-[0.025em]"
            aria-hidden={index >= items.length ? "true" : undefined}
          >
            {item.star ? (
              <>
                <span>4.9</span>
                <span
                  className="icon-mask icon-star mx-2 translate-y-[-0.08em] text-[#ffffff]"
                  aria-hidden="true"
                />
                <span>rating from 180+ local homeowners</span>
              </>
            ) : (
              item.text
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

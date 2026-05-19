"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import vanImage from "../../../public/van-temp.png";

export function AnimatedVan() {
  const vanRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const van = vanRef.current;

    if (!van) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.24 },
    );

    observer.observe(van);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={vanRef}
      className="how-van"
      data-active={isActive ? "true" : "false"}
      aria-hidden="true"
    >
      <Image
        src={vanImage}
        alt=""
        className="h-auto w-full"
        sizes="(min-width: 1024px) 45vw, 92vw"
      />
    </div>
  );
}

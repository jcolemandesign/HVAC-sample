"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    quote:
      "The technician showed up on time, checked the system thoroughly, and found a bad contactor before it turned into a bigger repair. Clear price, quick fix, no surprises.",
    name: "Daniel P.",
    service: "AC Repair",
    city: "Cornelius",
  },
  {
    quote:
      "Our upstairs was staying hot even with the AC running all day. North Star found an airflow issue, explained what was happening, and got the house cooling evenly again.",
    name: "Rachel M.",
    service: "Airflow Issue",
    city: "Davidson",
  },
  {
    quote:
      "We scheduled a tune-up before summer and they caught a worn part that probably would have failed during the first heat wave. Really appreciated the honest explanation.",
    name: "Chris W.",
    service: "AC Tune-Up",
    city: "Huntersville",
  },
  {
    quote:
      "North Star replaced our old heat pump and walked us through the options without making it feel like a sales pitch. The install was clean and the new system is much quieter.",
    name: "Angela T.",
    service: "Heat Pump Replacement",
    city: "Mooresville",
  },
  {
    quote:
      "Our furnace stopped working on a cold morning and they were able to come out the same day. They diagnosed the ignition issue, gave us the cost upfront, and had the heat back on fast.",
    name: "Marcus L.",
    service: "Heating Repair",
    city: "North Charlotte",
  },
  {
    quote:
      "I liked that they explained what needed to be fixed now and what could wait. It made the whole appointment feel straightforward instead of stressful.",
    name: "Emily R.",
    service: "HVAC Service",
    city: "Concord",
  },
  {
    quote:
      "The crew protected the floors, kept the work area clean, and finished the install when they said they would. Everything about the process felt organized.",
    name: "Brian S.",
    service: "System Installation",
    city: "Huntersville",
  },
  {
    quote:
      "We had uneven temperatures between the bedrooms and main floor. North Star adjusted the system, checked the ductwork, and gave us practical next steps without pushing extra work.",
    name: "Lauren B.",
    service: "Comfort Assessment",
    city: "Cornelius",
  },
  {
    quote:
      "The whole visit was easy. I booked online, got a confirmation, and the technician called before arriving. They fixed the issue and explained how to prevent it next time.",
    name: "Kevin J.",
    service: "AC Repair",
    city: "Davidson",
  },
  {
    quote:
      "They came out for a maintenance visit and took the time to explain the condition of our system. It felt like real service, not just someone checking boxes.",
    name: "Hannah C.",
    service: "HVAC Maintenance",
    city: "Huntersville",
  },
  {
    quote:
      "North Star came out after another company couldn't pin down the problem. They found a refrigerant issue, explained the repair clearly, and had the system cooling again that afternoon.",
    name: "Megan S.",
    service: "AC Service",
    city: "Huntersville",
  },
  {
    quote:
      "We needed help getting our older system ready for winter. The technician checked everything, replaced a failing part, and gave us a realistic timeline for when replacement might make sense.",
    name: "Jordan K.",
    service: "Heating Maintenance",
    city: "Cornelius",
  },
];

const desktopReviewsPerSlide = 3;

export function ReviewSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const reviewsPerSlide = isMobile ? 1 : desktopReviewsPerSlide;
  const slideCount = Math.ceil(reviews.length / reviewsPerSlide);
  const activeSlideIndex = Math.min(activeSlide, slideCount - 1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewportState = () => setIsMobile(mediaQuery.matches);

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => mediaQuery.removeEventListener("change", updateViewportState);
  }, []);

  const goToPreviousSlide = () => {
    setActiveSlide((current) => {
      const normalizedCurrent = Math.min(current, slideCount - 1);

      return normalizedCurrent === 0 ? slideCount - 1 : normalizedCurrent - 1;
    });
  };

  const goToNextSlide = () => {
    setActiveSlide((current) => {
      const normalizedCurrent = Math.min(current, slideCount - 1);

      return normalizedCurrent === slideCount - 1 ? 0 : normalizedCurrent + 1;
    });
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchStart = touchStartRef.current;

    if (!touchStart) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    touchStartRef.current = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX > 0) {
      goToPreviousSlide();
    } else {
      goToNextSlide();
    }
  };

  return (
    <div className="mt-16">
      <div
        className="review-slider-viewport overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
        >
          {Array.from({ length: slideCount }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="grid min-w-full gap-10 md:grid-cols-3 md:gap-8 xl:gap-12"
            >
              {reviews
                .slice(slideIndex * reviewsPerSlide, slideIndex * reviewsPerSlide + reviewsPerSlide)
                .map((review) => (
                  <article key={`${review.name}-${review.service}`} className="review-slide-item">
                    <p className="review-quote text-lg font-light leading-8 text-white">
                      <span className="icon-mask icon-review-quote text-[#169bd5]" aria-hidden="true" />
                      {review.quote}
                    </p>
                    <p className="font-semiexpanded mt-10 pl-[2.35rem] text-[1.15rem] font-normal leading-tight text-white">
                      {review.name}
                    </p>
                    <p className="ml-[2.35rem] mt-3 border-t border-white/18 pt-4 text-sm font-semibold uppercase tracking-[0.08em] text-white/62">
                      {review.service} | {review.city}
                    </p>
                  </article>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="review-slider-controls mt-12 flex items-center justify-end gap-6">
        <div className="flex items-center gap-3" aria-label="Review slides">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              className="review-slider-dot"
              data-active={index === activeSlideIndex ? "true" : "false"}
              aria-label={`Show review slide ${index + 1}`}
              aria-current={index === activeSlideIndex ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
        <div className="review-slider-arrows flex items-center gap-0">
          <button
            type="button"
            className="review-slider-button"
            aria-label="Previous reviews"
            onClick={goToPreviousSlide}
          >
            <span className="icon-mask icon-next-arrow rotate-180" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="review-slider-button"
            aria-label="Next reviews"
            onClick={goToNextSlide}
          >
            <span className="icon-mask icon-next-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

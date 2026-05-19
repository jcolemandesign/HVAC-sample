"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function ZipLookup() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
  };

  return (
    <div className="mt-6 max-w-[34rem]">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="zip-code">
          ZIP code lookup
        </label>
        <input
          id="zip-code"
          name="zip-code"
          className="h-16 w-full rounded-[6px] border-2 border-[#d8e8f3] bg-white px-5 text-base font-bold uppercase tracking-[0.08em] text-[#273c5b] outline-none transition focus:border-[#169bd5]"
          defaultValue="ZIPCODE LOOKUP"
          inputMode="numeric"
        />
        <button
          type="submit"
          className="hero-primary-cta inline-flex h-14 w-fit cursor-pointer items-center justify-center rounded-[6px] bg-[#273c5b] px-7 text-base font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-[#152435]"
        >
          CHECK ZIP CODE
        </button>
      </form>

      {hasSubmitted ? (
        <div className="mt-8 rounded-[8px] border border-white/80 bg-[linear-gradient(145deg,#fcfdfc_0%,#e9f0f6_100%)] p-8 shadow-[0_18px_36px_rgba(21,36,53,0.08)]">
          <p className="section-subheader text-[#273c5b]">You&apos;re in our service area</p>
          <p className="mt-4 text-lg font-light leading-8 text-[#273c5b]">
            Schedule your service today!
          </p>
          <Link
            className="service-view-link font-semiexpanded mt-7 inline-flex w-fit items-center pb-[1.1rem] text-[clamp(1.05rem,1vw,1.3rem)] font-medium uppercase leading-none tracking-[0.02em] text-[#152435] transition hover:text-[#273c5b]"
            href="/contact"
          >
            REQUEST SERVICE
          </Link>
        </div>
      ) : null}
    </div>
  );
}

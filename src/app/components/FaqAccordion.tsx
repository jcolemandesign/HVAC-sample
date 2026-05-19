"use client";

import { useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  faqs: Faq[];
};

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (question: string) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(question)) {
        next.delete(question);
      } else {
        next.add(question);
      }

      return next;
    });
  };

  return (
    <div className="mx-auto mt-14 max-w-[96rem]">
      {faqs.map((faq) => {
        const isOpen = openItems.has(faq.question);

        return (
          <article key={faq.question} className="faq-item" data-open={isOpen ? "true" : "false"}>
            <button
              type="button"
              className="faq-summary"
              aria-expanded={isOpen}
              onClick={() => toggleItem(faq.question)}
            >
              <span className="faq-question type-large-text">{faq.question}</span>
              <span className="icon-mask icon-down-arrow" aria-hidden="true" />
            </button>
            <div className="faq-panel">
              <div className="faq-answer">
                <p className="type-regular">{faq.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

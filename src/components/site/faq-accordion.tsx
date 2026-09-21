"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="accordion" data-accordion>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article
            key={item.question}
            className={`accordion-item${isOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <Plus className="icon" />
            </button>
            <div className="accordion-content">
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

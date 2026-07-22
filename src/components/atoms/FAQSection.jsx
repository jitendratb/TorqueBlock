"use client";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";
import FAQSchema from "@/components/seo/FAQSchema";

export default function FAQSection({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl w-full">
      <FAQSchema faqs={faqs} />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex items-center gap-3.5 mb-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
            <FaQuestionCircle className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
        </div>
        <div>
            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                FAQs
            </h2>
            <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                Frequently Asked Questions
            </p>
        </div>
      </div>

      <div className="relative border-t border-white/10 pt-4 mt-2 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-white/5 bg-zinc-900/40 hover:border-white/10 transition-colors overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-3 text-left text-white font-bold text-sm md:text-base focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="shrink-0 ml-4 text-orange-500">
                  {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] border-t border-white/5 p-3" : "max-h-0 overflow-hidden"
                }`}
              >
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

export default function FAQSection({ faqs = [] }) {
  if (!faqs || faqs.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full  space-y-4 pt-4 pb-8">
      <div className="flex items-center gap-3">
        <FiHelpCircle className="text-orange-500" size={22} />
        <h2 className="text-sm lg:text-2xl font-black text-white uppercase tracking-wider">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
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

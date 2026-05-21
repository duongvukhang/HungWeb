import { useState } from "react";

const reasons = [
  {
    title: "Strong and solid",
    content:
      "Established in 2005, deeply rooted in the industry for over 20 years. With multiple subsidiaries and branch offices, we possess nationwide service capabilities you can depend on.",
  },
  {
    title: "Efficient team",
    content:
      "Our team of experienced professionals delivers fast, precise results. Every project is handled with clear communication, structured workflows, and accountability at every step.",
  },
  {
    title: "Improved confidentiality mechanism",
    content:
      "We maintain strict confidentiality across all client engagements. Your ideas, data, and project details are protected by robust protocols and binding agreements.",
  },
  {
    title: "Worry-free after-sales guarantee",
    content:
      "Our commitment doesn't end at delivery. We offer comprehensive after-sales support to ensure every client is fully satisfied with the final outcome.",
  },
  {
    title: "Wide customer base",
    content:
      "Trusted by hundreds of clients across industries, from startups to established enterprises. Our growing base is a testament to the quality and reliability we deliver.",
  },
  {
    title: "Practical application of technology",
    content:
      "We use modern, proven tools to bring ideas to life — from 3D modeling software to mentoring platforms — always choosing technology that serves the real-world goal.",
  },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndexes, setOpenIndexes] = useState(new Set([0]));
  const [exclusiveMode, setExclusiveMode] = useState(true);

  const handleToggle = (index) => {
    if (exclusiveMode) {
      setActiveIndex((prev) => (prev === index ? null : index));
    } else {
      setOpenIndexes((prev) => {
        const next = new Set(prev);
        next.has(index) ? next.delete(index) : next.add(index);
        return next;
      });
    }
  };

  const isOpen = (index) => {
    if (exclusiveMode) return activeIndex === index;
    return openIndexes.has(index);
  };

  return (
    <section className="bg-[#f5f4f2] py-16 px-8">
      {/* Section Title */}
      <h2 className="text-center text-3xl font-black tracking-widest text-gray-900 uppercase mb-12">
        Why Choose Us
      </h2>

      {/* Exclusive Mode Toggle */}
      <div className="max-w-6xl mx-auto flex justify-end mb-4">
        <button
          onClick={() => setExclusiveMode((prev) => !prev)}
          className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-1.5 text-xs text-gray-500 hover:border-orange-600 hover:text-orange-600 transition-colors duration-200"
        >
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              exclusiveMode ? "bg-orange-600" : "bg-gray-400"
            }`}
          />
          Exclusive mode: {exclusiveMode ? "ON" : "OFF"}
        </button>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-20 items-start">
        {/* Left: Image */}
        <div className="w-full h-[380px] rounded overflow-hidden bg-[#a08060] flex items-center justify-center">
          {/* Replace the div below with an <img> tag pointing to your actual image */}
          <div className="w-full h-full flex items-center justify-center opacity-40">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="30" r="16" stroke="white" strokeWidth="2" />
              <path
                d="M12 68c0-15.464 12.536-28 28-28s28 12.536 28 28"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="flex flex-col">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 first:border-t first:border-gray-300"
            >
              {/* Header */}
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center py-4 gap-3 text-left cursor-pointer"
              >
                <span
                  className={`text-sm font-bold font-sans transition-colors duration-200 ${
                    isOpen(index) ? "text-orange-700" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </span>

                {/* Chevron Button */}
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen(index)
                      ? "bg-orange-600 border-orange-600 text-white rotate-180"
                      : "bg-[#ebe9e5] border-gray-300 text-gray-500 rotate-0"
                  }`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {/* Body */}
              <div
                className={`overflow-hidden transition-all duration-350 ease-in-out ${
                  isOpen(index) ? "max-h-48 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-500 leading-relaxed font-sans">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
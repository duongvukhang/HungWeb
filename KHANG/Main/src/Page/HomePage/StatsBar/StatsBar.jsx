// Stats.jsx
// Animated counter statistics section — 4 key metrics displayed prominently

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "NĂM KINH NGHIỆM" },
  { value: 500, suffix: "+", label: "DỰ ÁN HOÀN THÀNH" },
  { value: 50, suffix: "kT", label: "SẢN LƯỢNG HÀNG NĂM" },
  { value: 100, suffix: "%", label: "ĐÚNG HẠN KỸ THUẬT" },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, started }) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="flex flex-col items-start sm:items-center text-left sm:text-center border-l border-white/[0.06] pl-4 sm:pl-0 sm:border-l-0">
      <div className="font-condensed font-mono text-2xl sm:text-3xl md:text-5xl text-black leading-none tracking-tight">
        {count}
        <span className="text-[#f97316]">{suffix}</span>
      </div>
      {/* 🚀 REDUCED: Swapped mt-2 to mt-1 to tuck the label tightly up under the numbers */}
      <div className="font-condensed text-[11px] font-bold tracking-[2.5px] text-[#444] mt-1 uppercase">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-[#f9f9f9] py-8 md:py-10 px-6 "
    >
      <div className="max-w-7xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f97316]/20 to-transparent mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-0">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} started={started} />
          ))}
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f97316]/20 to-transparent mt-8" />
      </div>
    </section>
  );
}
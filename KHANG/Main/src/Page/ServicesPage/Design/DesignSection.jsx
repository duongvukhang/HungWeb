import { Link } from "react-router-dom";
import ServiceProcedures from "./Procedures";
const SPECS = [
    { label: "Áp suất",    value: "0–25 bar",              icon: "⚡" },
    { label: "Công suất",  value: "50–5000 kW",            icon: "🔥" },
    { label: "Nhiên liệu", value: "Gas / Dầu / Sinh khối", icon: "⛽" },
  ];
  
  const FEATURES = [
    "Giải pháp công nghiệp theo yêu cầu riêng",
    "Hiệu suất nhiệt cao, tiết kiệm năng lượng",
    "Hệ thống an toàn tiên tiến đa lớp",
    "Tuân thủ tiêu chuẩn quốc tế ISO / ASME",
  ];
  
  export default function DesignSection() {
    return (
      <>
      <section className="relative bg-stone-50 overflow-hidden py-20 md:py-28"> 
  
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
  
        {/* Soft radial glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-red-100/60 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-stone-200/80 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
  
            {/* LEFT — Content */}
            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-px bg-red-700 block" />
                <p className="text-[10px] font-bold tracking-[0.25em] text-red-700 uppercase">
                  Thiết kế & Kỹ thuật
                </p>
              </div>
  
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-black text-zinc-900 leading-[1.05] mb-6 tracking-tight">
                Thiết Kế Lò Hơi<br />
                <span className="text-red-700">Tùy Chỉnh</span> Theo<br />
                Yêu Cầu
              </h1>
  
              {/* Amber divider */}
              <div className="flex items-center gap-2 mb-6">
                <hr className="flex-grow border-t border-stone-300" />
                <span className="w-2 h-2 bg-amber-500 rotate-45 block flex-shrink-0" />
                <hr className="flex-grow border-t border-stone-300" />
              </div>
  
              {/* Subheading */}
              <p className="text-zinc-500 text-base leading-relaxed mb-8 max-w-md">
                Chúng tôi thiết kế và chế tạo lò hơi công nghiệp với hiệu suất tối ưu, hệ thống an toàn đa lớp và khả năng tùy chỉnh hoàn toàn theo nhu cầu vận hành của bạn.
              </p>
  
              {/* Feature bullets */}
              <ul className="space-y-3 mb-10">
                {FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 font-medium">
                    <span className="w-5 h-5 bg-red-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
  
              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <Link to={"/contactPage"} className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold tracking-widest uppercase px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-700/25">
                  Yêu Cầu Thiết Kế
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <a href="#" className="text-zinc-400 hover:text-red-700 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 flex items-center gap-1.5 group">
                  Xem catalogue
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
  
            {/* RIGHT — 3D viewer */}
            <div className="relative">
             
              {/* Outer red glow */}
              <div className="absolute -inset-4 bg-red-700/5 blur-xl pointer-events-none z-0" />
  
              {/* Viewer box */}
              <div className="relative z-10 bg-white border border-stone-200 shadow-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
  
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 flex items-center px-4 gap-2 z-10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] text-white/40 tracking-widest uppercase ml-2">3D Model Viewer</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[9px] text-red-400/80 tracking-widest uppercase">Live</span>
                  </div>
                </div>
  
                {/* ━━━━━━━━━━━━━━━━━━━━━━━━
                    INSERT YOUR 3D MODEL HERE
                    ━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div className="absolute inset-0 mt-8 bg-stone-50 flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <div className="w-32 h-32 border-2 border-red-200 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                      <div className="w-20 h-20 border border-red-100 rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-full" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">🔥</div>
                  </div>
                  <p className="text-zinc-400 text-xs tracking-widest uppercase">3D Boiler Model Viewer</p>
                  <p className="text-zinc-300 text-[10px]">Chèn model 3D của bạn vào đây</p>
                </div>
  
                {/* Corner accents — red */}
                <div className="absolute top-8 left-0 w-8 h-px bg-red-700/40" />
                <div className="absolute top-8 left-0 w-px h-8 bg-red-700/40" />
                <div className="absolute top-8 right-0 w-8 h-px bg-red-700/40" />
                <div className="absolute top-8 right-0 w-px h-8 bg-red-700/40" />
                <div className="absolute bottom-0 left-0 w-8 h-px bg-red-700/40" />
                <div className="absolute bottom-0 left-0 w-px h-8 bg-red-700/40" />
                <div className="absolute bottom-0 right-0 w-8 h-px bg-red-700/40" />
                <div className="absolute bottom-0 right-0 w-px h-8 bg-red-700/40" />
              </div>
  
              {/* Specs panel */}
              <div className="relative z-10 mt-4 grid grid-cols-3 gap-2">
                {SPECS.map((s, i) => (
                  <div key={i} className="bg-white border border-stone-200 shadow-sm px-3 py-3 text-center hover:border-red-300 hover:shadow-md transition-all duration-200">
                    <p className="text-lg mb-0.5">{s.icon}</p>
                    <p className="text-zinc-900 text-xs font-bold leading-tight">{s.value}</p>
                    <p className="text-zinc-400 text-[9px] tracking-widest uppercase mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
  
          </div>
        </div>
      </section>
      <ServiceProcedures/>
      </>
    );
  }
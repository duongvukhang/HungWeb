
import CompanyHistory from "./CompanyHistory";
import GeneralInfo from "./GeneralInfo";
import ValueAccordion from "./ValueAccordition";
import PolicyTabs from "./PolicyTabs";



export default function CompanyProfile() {
  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── HERO BANNER ── */}
      <div className="relative bg-slate-800 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700" />
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-700 via-amber-500 to-transparent opacity-60" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-700/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-amber-400 block" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">Hồ Sơ Doanh Nghiệp</p>
            <span className="w-5 h-0.5 bg-amber-400 block" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            PROFILE <span className="text-red-400">CÔNG TY</span>
          </h1>
          <div className="flex items-center gap-2 max-w-xs mx-auto mt-4">
            <hr className="flex-grow border-t border-white/20" />
            <span className="w-2 h-2 bg-amber-500 rotate-45 block flex-shrink-0" />
            <hr className="flex-grow border-t border-white/20" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — GENERAL COMPANY INFORMATION
      ══════════════════════════════════════════ */}
      <GeneralInfo/>

      {/* ══════════════════════════════════════
          SECTION 2 — COMPANY HISTORY
      ══════════════════════════════════════ */}
      <CompanyHistory/>
      
      {/* ══════════════════════════════════════
          SECTION 3 — VALUE ACORDiTION
      ══════════════════════════════════════ */}
      <ValueAccordion/>

      {/* ══════════════════════════════════════
          SECTION 4 — VALUE ACORDiTION
      ══════════════════════════════════════ */}
      <PolicyTabs/>
    </div>
  );
}
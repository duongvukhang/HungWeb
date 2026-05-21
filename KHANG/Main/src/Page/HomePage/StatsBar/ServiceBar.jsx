// ProcessWorkflow.jsx
// 5-step process shown as compact light-mode cards with directional arrows between them.
import { useState } from "react";

const steps = [
  { id: "01", name: "KHÁI NIỆM",  desc: "Phân tích yêu cầu từ ảnh hoặc sketch tay.", detail: "Chúng tôi nhận ảnh, sketch hoặc mô tả kỹ thuật, phân tích cấu trúc và tỷ lệ trước khi bắt đầu mô hình hóa.", tags: ["Nhận ảnh / sketch", "Đo đạc tỷ lệ", "Xác nhận yêu cầu"] },
  { id: "02", name: "DẠNG THÔ",   desc: "Xây dựng khối 3D tổng thể, xác định tỷ lệ chuẩn xác.", detail: "Dựng mô hình sơ bộ bằng SolidWorks / Fusion 360 để khách hàng phê duyệt trước khi đi vào chi tiết.", tags: ["SolidWorks", "Khối cơ bản", "Phê duyệt sơ bộ"] },
  { id: "03", name: "TINH CHỈNH", desc: "Hoàn thiện bề mặt và các mặt cắt kỹ thuật.", detail: "Thêm dung sai, bo góc fillets, chamfers, ren vít và thông số bề mặt theo tiêu chuẩn ISO/ANSI.", tags: ["Dung sai ISO", "Fillets & chamfers", "Mô phỏng lắp ráp"] },
  { id: "04", name: "FILE CHUẨN", desc: "Xuất STL/STEP tối ưu cho CNC và in 3D.", detail: "Export STL cho in 3D FDM/SLA/SLS, STEP/IGES cho CNC, DWG/PDF cho bản vẽ kỹ thuật 2D.", tags: ["STL / STEP / IGES", "CNC & in 3D", "Kiểm tra mesh"] },
  { id: "05", name: "BÀN GIAO",   desc: "Hoàn tất hồ sơ và bàn giao dữ liệu sản xuất.", detail: "Gói bàn giao: file gốc chỉnh sửa được, bản vẽ kỹ thuật 2D, hướng dẫn lắp ráp và hỗ trợ sau bàn giao.", tags: ["File nguồn gốc", "Bản vẽ 2D", "Hỗ trợ sau"] },
];

/* ── tiny SVG icons per step (Optimized for light background) ── */
const icons = [
  // 01 gear
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="8" stroke="#f97316" strokeWidth="1.2"/>
    <circle cx="20" cy="20" r="3.5" fill="#f97316" fillOpacity="0.25"/>
    {[0,45,90,135,180,225,270,315].map((a,i)=>{const r=a*Math.PI/180;return<line key={i} x1={20+9*Math.cos(r)} y1={20+9*Math.sin(r)} x2={20+13*Math.cos(r)} y2={20+13*Math.sin(r)} stroke="#f97316" strokeWidth="2.2" strokeLinecap="round"/>;})}
  </svg>,
  // 02 cube
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L32 13V27L20 34L8 27V13L20 6Z" stroke="#f97316" strokeWidth="1.2"/>
    <path d="M20 6V34M8 13L32 13M8 27L32 27" stroke="#f97316" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5"/>
    <circle cx="20" cy="20" r="2" fill="#f97316"/>
  </svg>,
  // 03 ellipse/turbine
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="20" rx="12" ry="7" stroke="#f97316" strokeWidth="1.2"/>
    <ellipse cx="20" cy="20" rx="5" ry="3" stroke="#f97316" fill="#f97316" fillOpacity="0.12" strokeWidth="0.8"/>
    {[0,60,120,180,240,300].map((a,i)=>{const r=a*Math.PI/180;return<line key={i} x1={20+5.5*Math.cos(r)} y1={20+3.3*Math.sin(r)} x2={20+11.5*Math.cos(r)} y2={20+6.8*Math.sin(r)} stroke="#f97316" strokeWidth="0.9" opacity="0.8"/>;})}
  </svg>,
  // 04 file + gear
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="16" height="20" rx="1.5" stroke="#f97316" strokeWidth="1.2"/>
    <path d="M16 4V10H24" stroke="#f97316" strokeWidth="1.2"/>
    <line x1="11" y1="14" x2="21" y2="14" stroke="#f97316" strokeWidth="0.7" opacity="0.55"/>
    <line x1="11" y1="17" x2="21" y2="17" stroke="#f97316" strokeWidth="0.7" opacity="0.55"/>
    <circle cx="27" cy="30" r="6" stroke="#f97316" strokeWidth="1" fill="#f8f9fa"/>
    {[0,60,120,180,240,300].map((a,i)=>{const r=a*Math.PI/180;return<line key={i} x1={27+7*Math.cos(r)} y1={30+7*Math.sin(r)} x2={27+9*Math.cos(r)} y2={30+9*Math.sin(r)} stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>;})}
    <circle cx="27" cy="30" r="2.5" fill="#f97316" opacity="0.8"/>
  </svg>,
  // 05 checkmark
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="28" height="28" rx="2" stroke="#f97316" strokeWidth="1.2"/>
    <polyline points="12,21 18,27 28,15" stroke="#f97316" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="8" r="5" fill="#f97316"/>
    <polyline points="29,8 31.5,10.5 35.5,6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

/* ── Arrow components with fixed padding gaps ── */
function ArrowRight() {
  return (
    <div className="flex items-center justify-center flex-shrink-0 w-12 mx-3">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <line x1="0" y1="8" x2="24" y2="8" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2"/>
        <polyline points="18,3 26,8 18,13" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex items-center justify-center h-12 my-3">
      <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
        <line x1="8" y1="0" x2="8" y2="24" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2"/>
        <polyline points="3,18 8,26 13,18" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
}

/* ── Card Component ── */
function StepCard({ step, idx, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left border transition-all duration-200 group p-5 w-full rounded-sm
        ${active
          ? "bg-white border-[#f97316] shadow-[0_10px_25px_-5px_rgba(249,115,22,0.15)] scale-[1.02] z-10"
          : "bg-white border-zinc-200/80 hover:bg-zinc-50 hover:border-zinc-300"
        }`}
    >
      {/* Dynamic top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-[#f97316] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}/>

      {/* icon */}
      <div className={`w-10 h-10 mb-4 transition-all duration-300 ${active ? "drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)] scale-105" : "opacity-80"}`}>
        {icons[idx]}
      </div>

      {/* step number */}
      <div className="font-condensed text-[10px] font-bold tracking-[2px] text-[#f97316] mb-1 uppercase">
        Step {step.id}
      </div>

      {/* name */}
      <div className="font-condensed text-[14px] sm:text-md font-black uppercase text-zinc-900 tracking-wide leading-tight mb-2">
        {step.name}
      </div>

      {/* desc */}
      <p className="text-[12px] text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
    </button>
  );
}

/* ── Detail panel ── */
function DetailPanel({ step }) {
  return (
    <div className="mt-4 bg-white rounded-sm p-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-1">
          <div className="font-condensed text-[10px] font-bold tracking-[2px] text-[#f97316] mb-1 uppercase">Step {step.id} Detail</div>
          <h3 className="font-condensed text-xl font-black uppercase text-zinc-900 mb-2.5">{step.name}</h3>
          <p className="text-[13.5px] text-zinc-600 leading-relaxed max-w-2xl">{step.detail}</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:pt-6">
          {step.tags.map(t => (
            <span key={t} className="font-condensed text-[10px] font-bold uppercase tracking-wide border border-[#f97316]/20 bg-[#f97316]/5 text-[#f97316] px-3 py-1 rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProcessWorkflow() {
  const [active, setActive] = useState(null);
  const toggle = (i) => setActive(active === i ? null : i);

  return (
    // Changed main background from dark black to harmonic clean light gray (#f8f9fa)
    <section className="bg-[#f9f9f9] py-20 px-6 ">
      <div className="flex flex-col  ">

        {/* Label */}
        <div className="flex items-center gap-5 mb-4">
        <div className="h-px w-5 bg-[#f97316]"/>
        <span className="font-condensed text-[10px] font-bold tracking-[3px] uppercase text-[#f97316]">
          Process Workflow
        </span>
        <div className="h-px w-5 bg-[#f97316]"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-20 md:mb-28">
  
        {/* Left Column: Title */}
        {/* 🚀 FIXED: Removed the max-w constraints so it fills its 50% section perfectly */}
        <h2 className="font-condensed text-lg sm:text-xl md:text-[30px] font-black uppercase text-zinc-900 leading-relaxed tracking-wider word-spacing-wide">
          From <span className="italic">Conceptual Sketches</span>
          <br/>
          To  <span className="italic">Technical Precision</span>
        </h2>

        {/* Right Column: Description */}
       
        <p className="text-zinc-500 text-sm sm:text-md font-medium max-w-xl leading-relaxed md:pb-1">
          We transform your initial ideas into manufacturing-ready technical assets. 
          Our execution model ensures data fidelity, strict compliance with international ISO standards, 
          and optimized production efficiency.
        </p>
        
      </div>

        {/* ── MOBILE: single column ── */}
        <div className="flex flex-col items-center sm:hidden">
          {steps.map((step, idx) => (
            <div key={step.id} className="w-full flex flex-col items-center">
              <StepCard step={step} idx={idx} active={active === idx} onClick={() => toggle(idx)}/>
              {idx < steps.length - 1 && <ArrowDown/>}
            </div>
          ))}
        </div>

        {/* ── TABLET (sm–md): row of 3 layout ── */}
        <div className="hidden sm:flex lg:hidden flex-col items-center gap-0">
          <div className="flex items-center w-full">
            {[0,1,2].map((idx) => (
              <div key={steps[idx].id} className="flex items-center flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <StepCard step={steps[idx]} idx={idx} active={active===idx} onClick={()=>toggle(idx)}/>
                </div>
                {idx < 2 && <ArrowRight/>}
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end" style={{ paddingRight: "16.66%" }}>
            <div className="w-[33.33%] flex justify-center">
              <ArrowDown />
            </div>
          </div>

          <div className="flex items-center justify-end w-full">
            {[3,4].map((idx, pos) => (
              <div key={steps[idx].id} className="flex items-center" style={{flex: "0 0 calc(33.33% - 0.5rem)"}}>
                <div className="flex-1 min-w-0">
                  <StepCard step={steps[idx]} idx={idx} active={active===idx} onClick={()=>toggle(idx)}/>
                </div>
                {pos === 0 && <ArrowRight/>}
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP (lg+): All 5 cards in one row ── */}
        <div className="hidden lg:flex items-center gap-0">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <StepCard step={step} idx={idx} active={active===idx} onClick={()=>toggle(idx)}/>
              </div>
              {idx < steps.length - 1 && <ArrowRight/>}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {active !== null && <DetailPanel step={steps[active]}/>}
      </div>
    </section>
  );
}
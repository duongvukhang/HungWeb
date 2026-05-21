// CTABanner.jsx
// Call-to-action section prompting users to start or download brochure

export default function CTABanner() {
  return (
    // 🚀 FIXED: Increased outer vertical padding from py-20 to py-32 to give the whole block room
    <section className="bg-[#f9f9f9] py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🚀 FIXED: Increased internal card padding (p-10 sm:p-14 md:p-20 modified to vertical md:py-32) */}
        <div className="relative bg-white border border-zinc-200/60 shadow-sm p-10 sm:p-16 md:py-32 md:px-20 overflow-hidden text-center rounded-sm">
          
  

          {/* Light Mode Glow effects (Slightly enlarged blur footprint to match height) */}
          <div className="absolute inset-0 bg-[#f97316]/[0.01] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#f97316]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* Added a tiny bit of extra gap below the title (mb-6) */}
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 uppercase leading-tight mb-6">
              Sẵn Sàng Biến{" "}
              <span className="italic text-[#f97316]">Ý Tưởng</span>
              <br />
              Thành Hiện Thực?
            </h2>
            
            {/* Added a tiny bit of extra gap below description text (mb-12) */}
            <p className="text-zinc-500 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto mb-12">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ các giải
              pháp mô phỏng 3D và hệ thống năng lượng bền vững cho doanh nghiệp bạn.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {/* Primary CTA button */}
              <button className="font-condensed text-[13px] font-black tracking-[2px] uppercase bg-[#f97316] hover:bg-[#ea6a06] text-black px-9 py-3.5 transition-colors shadow-sm rounded-sm">
                BẮT ĐẦU NGAY
              </button>
              
              {/* Secondary CTA button */}
              <button className="font-condensed text-[13px] font-black tracking-[2px] uppercase bg-transparent border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-800 px-9 py-3.5 transition-colors flex items-center gap-2 rounded-sm">
                <DownloadIcon />
                TẢI BROCHURE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
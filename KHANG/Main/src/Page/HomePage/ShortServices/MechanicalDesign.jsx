// Hero.jsx
import images from './images.jpeg'

export default function Hero() {
  return (
    <section className="relative w-full h-[550px] md:h-[650px] flex items-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${images})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 mix-blend-multiply pointer-events-none" />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* Orange glow top-left */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#f97316]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container (FIXED: Added flex structure and text-center to anchor layout middle) */}
      <div className="relative max-w-7xl mx-auto w-full px-6 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-[#f97316]" />
          <span className="font-condensed text-[11px] font-bold tracking-[3px] uppercase text-[#f97316]">
            3D Engineering Excellence
          </span>
          <div className="h-px w-8 bg-[#f97316]" />
        </div>

        {/* Headline */}
        <h1 className="font-condensed font-black uppercase leading-normal tracking-wider word-spacing-wide mb-5">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            TURN YOUR <span className="italic text-white/90">BOLDEST IDEA</span>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            INTO <span className="text-[#f97316]">PHYSICAL REALITY</span>
          </div>
        </h1>

        {/* Subtext (FIXED: Added mx-auto so the constraint is balanced on both sides) */}
        <p className="text-zinc-200 text-md sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Từ concept đến bản vẽ chi tiết và mô hình 3D chính xác. Chúng tôi chuyển
          hóa mọi ý tưởng kỹ thuật thành hồ sơ sản xuất tiêu chuẩn quốc tế.
        </p>

        {/* CTA buttons (FIXED: Added justify-center so buttons stay grouped centered) */}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="font-condensed text-[13px] font-black tracking-[2px] uppercase bg-[#f97316] hover:bg-[#ea6a06] text-black px-7 py-3 transition-colors">
            YÊU CẦU TƯ VẤN
          </button>
          <button className="font-condensed text-[13px] font-black tracking-[2px] uppercase bg-transparent border border-white/25 hover:border-white/50 text-white px-7 py-3 transition-colors">
            XEM PORTFOLIO
          </button>
        </div>
      </div>
    </section>
  );
}
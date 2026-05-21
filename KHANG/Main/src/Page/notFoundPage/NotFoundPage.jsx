import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 flex items-center justify-center overflow-hidden px-6">

      {/* ── Decorative background blobs ── */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-emerald-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* ── Grid texture overlay ── */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* Giant 404 */}
        <div className="relative mb-6 select-none">
          <span
            className="text-[160px] md:text-[220px] font-extrabold leading-none tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #6ee7b7 0%, #2dd4bf 50%, #059669 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 60px rgba(52,211,153,0.25))",
            }}
          >
            404
          </span>
          {/* Glowing underline */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 blur-sm" />
        </div>

        {/* Badge */}
        <span className="inline-block bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          Trang không tồn tại
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Ôi! Trang bạn tìm<br />
          <span className="text-emerald-300">không thể tìm thấy.</span>
        </h1>

        {/* Subtext */}
        <p className="text-emerald-100/70 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10">
          Trang này có thể đã bị xóa, đổi tên hoặc chưa từng tồn tại.
          Hãy quay lại trang chủ để tiếp tục.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            ← Về trang chủ
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/25 hover:border-emerald-400/60 text-white hover:text-emerald-300 px-7 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Liên hệ hỗ trợ
          </Link>
        </div>

        {/* Decorative leaf icons */}
        <div className="mt-16 flex justify-center gap-3 opacity-30">
          {["🌿", "🌱", "🌿"].map((leaf, i) => (
            <span key={i} className="text-2xl">{leaf}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
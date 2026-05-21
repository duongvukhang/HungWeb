// Replace companyImage with your own import
import companyImage from "./cathark.jpg";

const STATS = [
  {
    value: "1000",
    label: "Nhân viên ở tại Việt Nam bao gồm người Việt Nam và Người nước ngoài.",
  },
  {
    value: "12",
    label: "Văn phòng và phòng thí nghiệm trên toàn Việt Nam",
  },
  {
    value: "900+",
    label: "Công nhận và Ủy quyền Quốc tế cũng như của nhà nước Việt Nam, các tổ chức hiệp hội địa phương.",
  },
];

export default function CompanyHero() {
  return (
    <>
    <div className="bg-white">
        
      {/* ── TOP: breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-8 pb-0">
      <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />

        <p className="text-xs text-zinc-400 tracking-wide">
          Home &nbsp;–&nbsp; Thông tin chung
        </p>
      </div>

      {/* ── HERO: text left, image right ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[520px]">

          {/* LEFT — text */}
          <div className="order-2 lg:order-1 flex flex-col justify-center py-10 lg:py-14 pr-0 lg:pr-16">

            {/* Company name */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 leading-[1.08] mb-10 tracking-tight">
              {/* Replace with your company name */}
              CÔNG TY TNHH<br />
              NHIÊN LIỆU SINH KHỐI<br />
              <span className="text-red-700">BÌNH DƯƠNG</span>
            </h1>

            {/* What we do label */}
            <div className="mb-3">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-zinc-400 mb-1">
                Chúng tôi làm việc gì:
              </p>
              <p className="text-sm font-bold tracking-[0.12em] uppercase text-zinc-800">
                {/* Replace with your tagline */}
                Sản xuất, phân phối &amp; tư vấn nhiên liệu sinh khối
              </p>
            </div>

            {/* Red → amber divider */}
            <div className="flex items-center gap-0 mt-6">
              <div className="w-10 h-0.5 bg-red-700" />
              <div className="w-4 h-0.5 bg-amber-500" />
              <div className="w-2 h-0.5 bg-amber-300" />
            </div>

          </div>

          {/* RIGHT — image, full height, no gap */}
          {/* RIGHT — image */}
          <div className="order-1 lg:order-2 relative w-full h-56 sm:h-72 lg:h-auto lg:min-h-0 overflow-hidden">
            {/* Red top strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-700 z-10" />
            <div className="absolute top-1 right-0 w-16 h-1 bg-amber-500 z-10" />

            {/* Replace src with your own image */}
            <img
              src={companyImage}
              alt="Hình ảnh công ty"
              className="w-full h-full object-cover object-center"
            />

            
          </div>

        </div>
      </div>

      {/* ── DESCRIPTION BAND ── */}
      <div className="border-t border-stone-100 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10">
          {/* Replace with your italic description */}
          <p className="text-base md:text-lg font-semibold italic text-zinc-700 leading-relaxed max-w-4xl">
            Chúng tôi giảm thiểu rủi ro và cải thiện hiệu suất của khách hàng, về Chất lượng, Sức khỏe và
            An toàn nghề nghiệp, Bảo vệ môi trường và Trách nhiệm xã hội.
          </p>
        </div>
      </div>

      {/* ── STATS BAND ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14">

        {/* "Chúng tôi có:" heading */}
        <h2 className="text-xl md:text-2xl font-extrabold text-zinc-900 mb-10 tracking-tight">
          CHÚNG TÔI CÓ:
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          {STATS.map((s, i) => (
            <div key={i} className="flex items-start gap-5 px-0 sm:px-8 first:pl-0 last:pr-0 py-6 sm:py-0">
              {/* Left red bar accent */}
              <div className="w-1 self-stretch bg-red-700 flex-shrink-0 rounded-full" />
              <div>
                <p className="text-5xl md:text-6xl font-extrabold text-zinc-900 leading-none mb-3">
                  {s.value}
                </p>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[220px]">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
    </>
  );
}
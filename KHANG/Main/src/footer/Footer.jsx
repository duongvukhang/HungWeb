// Footer.jsx
// Site footer with logo, column links, contact info, and copyright

const columns = [
  {
    title: "KHÁM PHÁ",
    links: ["Dịch vụ thiết kế", "Hệ thống lò hơi", "Dự án 3D"],
  },
  {
    title: "THÔNG TIN",
    links: ["Hồ sơ năng lực", "Đội ngũ kỹ sư", "Tuyển dụng"],
  },
  {
    title: "LIÊN HỆ",
    links: [
      "Lô 24-25, KCN Nhơn Trạch,",
      "Đồng Nai, Việt Nam",
      "+84 (0) 251 123 456",
    ],
    noLink: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#464545] border-t border-white/[0.05] pt-14 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div>
            <a href="#" className="font-condensed text-2xl font-black tracking-widest uppercase inline-block mb-4">
              <span className="text-white">SANGS</span>
              <span className="text-[#f97316]">BOILER</span>
            </a>
            <p className="text-[#fff] text-[12px] leading-relaxed">
              Đơn vị dẫn đầu trong cung cấp giải pháp kỹ thuật 3D và hệ thống lò hơi sinh khối tiêu chuẩn tại Việt Nam.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {["fb", "yt", "li"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-white/10 hover:border-[#f97316]/50 flex items-center justify-center text-[#444] hover:text-[#f97316] transition-colors"
                >
                  <span className="font-condensed text-[9px] font-bold uppercase">{s}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-condensed text-[11px] font-black tracking-[2.5px] uppercase text-[#f97316] mb-5">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    {col.noLink ? (
                      <span className="text-[12px] text-[#fff] leading-relaxed block">{link}</span>
                    ) : (
                      <a
                        href="#"
                        className="text-[12px] text-[#fff] hover:text-white transition-colors leading-relaxed flex items-center gap-1.5 group"
                      >
                        <span className="w-0 group-hover:w-3 h-px bg-[#f97316] transition-all duration-200 inline-block" />
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-condensed text-[10px] tracking-widest text-[#fff] uppercase">
            © 2024 SANGS BOILER. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((t) => (
              <a
                key={t}
                href="#"
                className="font-condensed text-[10px] tracking-widest text-[#fff] hover:text-[#f97316] uppercase transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
import { useState } from "react";

// ── Replace with your own data ──
const STEPS = [
  {
    id: "step-1",
    year: "BƯỚC 1",
    title: "TIẾP NHẬN YÊU CẦU",
    subtitle: "Bước 1 – Khởi đầu của mỗi dự án thành công",
    image: null, // replace with: import img1 from "./img1.jpg" → image: img1
    paragraphs: [
      "Khách hàng liên hệ qua **hotline, email hoặc trực tiếp** tại văn phòng. Đội ngũ tư vấn chuyên nghiệp tiếp nhận và ghi nhận đầy đủ thông tin.",
      "Chúng tôi phân tích **nhu cầu thực tế**, quy mô dự án và các yêu cầu kỹ thuật để chuẩn bị cho bước khảo sát tiếp theo.",
      "Mọi thông tin được **bảo mật tuyệt đối** và xử lý trong vòng 24 giờ làm việc.",
    ],
  },
  {
    id: "step-2",
    year: "BƯỚC 2",
    title: "KHẢO SÁT & ĐÁNH GIÁ",
    subtitle: "Bước 2 – Nền tảng cho thiết kế chính xác",
    image: null,
    paragraphs: [
      "Kỹ sư chuyên môn **trực tiếp khảo sát hiện trường**, đánh giá điều kiện lắp đặt và đo đạc các thông số kỹ thuật cần thiết.",
      "Kết quả khảo sát được lập thành **báo cáo kỹ thuật chi tiết**, làm cơ sở cho việc lập phương án thiết kế tối ưu.",
    ],
  },
  {
    id: "step-3",
    year: "BƯỚC 3",
    title: "LẬP PHƯƠNG ÁN & BÁO GIÁ",
    subtitle: "Bước 3 – Minh bạch và tối ưu chi phí",
    image: null,
    paragraphs: [
      "Đội ngũ kỹ thuật lập **phương án thiết kế tối ưu** dựa trên kết quả khảo sát, kết hợp với kinh nghiệm thực tế hơn 10 năm trong ngành.",
      "Bảng báo giá được trình bày **chi tiết, minh bạch** từng hạng mục, không phát sinh chi phí ẩn.",
    ],
  },
  {
    id: "step-4",
    year: "BƯỚC 4",
    title: "KÝ KẾT HỢP ĐỒNG",
    subtitle: "Bước 4 – Cam kết pháp lý rõ ràng",
    image: null,
    paragraphs: [
      "Sau khi hai bên thống nhất, tiến hành **ký kết hợp đồng chính thức** với đầy đủ điều khoản về chất lượng, tiến độ và chế độ bảo hành.",
      "Hợp đồng được soạn thảo bởi **đội ngũ pháp lý chuyên nghiệp**, bảo vệ quyền lợi tối đa cho khách hàng.",
    ],
  },
  {
    id: "step-5",
    year: "BƯỚC 5",
    title: "TRIỂN KHAI THI CÔNG",
    subtitle: "Bước 5 – Chính xác và đúng tiến độ",
    image: null,
    paragraphs: [
      "Đội ngũ kỹ thuật lành nghề tiến hành **lắp đặt theo đúng bản vẽ kỹ thuật** và tiêu chuẩn an toàn nghiêm ngặt.",
      "Mỗi công đoạn đều có **giám sát chất lượng độc lập**, đảm bảo tiến độ và chất lượng theo đúng cam kết.",
    ],
  },
  {
    id: "step-6",
    year: "BƯỚC 6",
    title: "NGHIỆM THU & BÀN GIAO",
    subtitle: "Bước 6 – Kiểm tra toàn diện trước bàn giao",
    image: null,
    paragraphs: [
      "Tiến hành **kiểm tra và chạy thử toàn bộ hệ thống**, đo đạc xác nhận thông số vận hành đạt yêu cầu thiết kế.",
      "Bàn giao đầy đủ **hồ sơ kỹ thuật, tài liệu hướng dẫn vận hành** và thực hiện đào tạo nhân viên vận hành.",
    ],
  },
  {
    id: "step-7",
    year: "BƯỚC 7",
    title: "BẢO TRÌ & HỖ TRỢ",
    subtitle: "Bước 7 – Đồng hành lâu dài cùng khách hàng",
    image: null,
    paragraphs: [
      "Cung cấp **dịch vụ bảo trì định kỳ** theo lịch cam kết và hỗ trợ kỹ thuật 24/7 qua hotline chuyên dụng.",
      "Đội ngũ kỹ thuật sẵn sàng **can thiệp xử lý sự cố trong vòng 4 giờ**, đảm bảo hệ thống vận hành liên tục.",
    ],
  },
];

/* ── Render **bold** markdown ── */
function RichText({ text, className = "" }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i} className="font-bold text-zinc-800">{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </p>
  );
}

export default function ServiceProcedures() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(STEPS.length - 1, c + 1));

  return (
    <div className="relative bg-stone-100 overflow-hidden">

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-10 lg:px-16 py-16 md:py-20">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-red-700 tracking-tight uppercase mb-3">
            QUY TRÌNH DỊCH VỤ
          </h2>
          <div className="w-12 h-0.5 bg-red-700 mx-auto mb-5" />
          <p className="text-zinc-600 text-sm md:text-base">
            7 bước chuyên nghiệp –{" "}
            <strong className="font-bold text-zinc-800">"Minh bạch – Chất lượng – Đúng tiến độ"</strong>
          </p>
        </div>

        {/* ── Main viewer ── */}
        <div className="relative">

          {/* ← Prev arrow */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-8 lg:-translate-x-10 z-20 w-8 h-8 bg-white border border-stone-300 flex items-center justify-center text-zinc-500 hover:border-red-500 hover:text-red-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* → Next arrow */}
          <button
            onClick={next}
            disabled={current === STEPS.length - 1}
            className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-8 lg:translate-x-10 z-20 w-8 h-8 bg-white border border-stone-300 flex items-center justify-center text-zinc-500 hover:border-red-500 hover:text-red-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Image */}
          <div className="border border-stone-300 overflow-hidden shadow-sm">
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-72 md:h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-72 md:h-[400px] bg-stone-200 flex flex-col items-center justify-center gap-3">
                <div className="text-6xl opacity-20">🏭</div>
                <p className="text-stone-400 text-xs tracking-widest uppercase">Hình ảnh — {step.year}</p>
                <p className="text-stone-300 text-[10px]">Thay bằng ảnh thực tế của bạn</p>
              </div>
            )}
          </div>

          {/* Year + Content panel */}
          <div className="border border-stone-300 border-t-0 bg-white shadow-sm grid md:grid-cols-[180px_1fr]">

            {/* Left: year */}
            <div className="flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-200 py-5 px-4">
              <p className="text-xl md:text-2xl font-black text-red-700 tracking-tight text-center uppercase">
                {step.year}
              </p>
            </div>

            {/* Right: title + paragraphs */}
            <div className="p-6 md:p-8">
              <h3 className="text-sm md:text-base font-black text-red-700 tracking-wide uppercase mb-1 text-center md:text-left">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-xs mb-5 text-center md:text-left italic">
                {step.subtitle}
              </p>
              <div className="space-y-3">
                {step.paragraphs.map((para, i) => (
                  <RichText
                    key={i}
                    text={para}
                    className="text-zinc-600 text-sm leading-relaxed"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom step nav bar ── */}
          <div className="border border-stone-300 border-t-0 bg-white shadow-sm overflow-x-auto">
            <div className="flex min-w-max">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className={`flex-1 min-w-[100px] flex flex-col items-center gap-1.5 py-4 px-3 border-r border-stone-200 last:border-r-0 transition-colors duration-200 ${
                    i === current ? "bg-stone-50" : "hover:bg-stone-50"
                  }`}
                >
                  <span className={`text-xs font-black tracking-widest uppercase transition-colors duration-200 ${
                    i === current ? "text-red-700" : "text-zinc-400"
                  }`}>
                    {s.year}
                  </span>
                  {/* Active arrow indicator */}
                  <div className={`transition-all duration-200 ${
                    i === current
                      ? "w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-red-700"
                      : "w-2 h-2 bg-stone-200 rotate-45"
                  }`} />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
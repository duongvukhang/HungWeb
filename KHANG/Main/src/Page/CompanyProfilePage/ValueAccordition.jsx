import { useState } from "react";

const ITEMS = [
  {
    title: "CUNG CẤP GIẤY PHÉP HOẠT ĐỘNG",
    content: [
      "Đặt nội dung chi tiết cho mục này tại đây. Bạn có thể mô tả dịch vụ, quy trình, lợi ích hoặc bất kỳ thông tin nào liên quan.",
      "Đoạn văn thứ hai nếu cần thiết — có thể bổ sung thêm chi tiết, ví dụ minh họa hoặc cam kết dịch vụ.",
    ],
  },
  {
    title: "NÂNG CAO HIỆU QUẢ VÀ HIỆU SUẤT",
    content: [
      "Kiểm soát rủi ro về chất lượng, sức khỏe, an toàn, môi trường và trách nhiệm xã hội mang đến hiệu quả và hiệu suất cao hơn. Trong suốt lịch sử lâu dài của mình, chúng tôi đã đóng một vai trò không thể thiếu trong sự phát triển của các dịch vụ rủi ro và an toàn.",
      "Chúng tôi sẽ giúp bạn loại bỏ mọi rủi ro có thể xảy ra trong quá trình vận hành cơ sở của bạn để đảm bảo hiệu quả tối đa.",
    ],
  },
  {
    title: "CẢI THIỆN HIỆU SUẤT CHUỖI CUNG ỨNG",
    content: [
      "Đặt nội dung chi tiết cho mục này tại đây. Mô tả cách doanh nghiệp hỗ trợ khách hàng cải thiện chuỗi cung ứng, tối ưu hóa vận hành và giảm chi phí.",
    ],
  },
  {
    title: "TIẾP CẬN THỊ TRƯỜNG TOÀN CẦU",
    content: [
      "Đặt nội dung chi tiết cho mục này tại đây. Chia sẻ về mạng lưới quốc tế, các chứng nhận được công nhận toàn cầu và khả năng hỗ trợ khách hàng mở rộng thị trường.",
    ],
  },
];

export default function ValueAccordion() {
  const [openIndex, setOpenIndex] = useState(1); // second item open by default

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="relative bg-white py-16 md:py-20">
         <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
     

        {/* Section heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight mb-10">
          {/* Replace with your heading */}
          CÁCH CHÚNG TÔI TĂNG THÊM GIÁ TRỊ CHO KHÁCH HÀNG
        </h2>

        {/* Accordion items */}
        <div className="space-y-0">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border border-stone-200 mb-2">

                {/* Header button */}
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 ${
                    isOpen
                      ? "bg-slate-800 text-white"
                      : "bg-white text-zinc-900 hover:bg-stone-50"
                  }`}
                >
                  <span className="text-sm font-extrabold tracking-[0.08em] uppercase pr-4">
                    {item.title}
                  </span>

                  {/* Chevron */}
                  <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg
                      width="16" height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 py-6 border-t border-stone-200 bg-white space-y-4">
                    {/* Red left accent bar */}
                    <div className="flex gap-4">
                      <div className="w-0.5 bg-red-700 flex-shrink-0 self-stretch" />
                      <div className="space-y-4">
                        {item.content.map((para, j) => (
                          <p key={j} className="text-zinc-600 text-sm md:text-base leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
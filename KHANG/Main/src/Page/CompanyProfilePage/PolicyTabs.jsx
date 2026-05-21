import { useState } from "react";

const TABS = [
  {
    id: "chat-luong",
    label: "CHÍNH SÁCH CHẤT LƯỢNG",
    intro: "Công ty cam kết cung cấp đầy đủ các nguồn lực cần thiết để đảm bảo các chính sách chất lượng được thực thi hiệu quả và nhất quán trong toàn bộ hoạt động.",
    content: [
      {
        heading: "I. Cải tiến liên tục hệ thống quản lý chất lượng, hướng tới xây dựng Bản sắc chất lượng",
        points: [
          "Áp dụng và cải tiến liên tục hệ thống quản lý chất lượng đảm bảo phù hợp tiêu chuẩn ISO 9001-2015.",
          "Nâng cao tinh thần triệt để tuân thủ các quy định, quán triệt tinh thần Chất lượng.",
          "Nỗ lực không ngừng các hoạt động cải tiến chất lượng.",
        ],
      },
      {
        heading: "II. Xây dựng công ty có sức cạnh tranh cao về thiết kế – chế tạo máy tự động hóa và thương mại.",
        points: [
          "Thúc đẩy các hoạt động giảm chi phí, tạo ưu thế cạnh tranh về giá thành sản phẩm.",
          "Mở rộng – Phát triển – Nâng cao nghiệp vụ thiết kế và đầu tư công nghệ sản xuất.",
          "Thúc đẩy nghiên cứu phát triển ứng dụng, hướng tới sản phẩm đặc trưng có tính cạnh tranh cao.",
          "Nâng cao trình độ quản lý – điều hành nhằm đáp ứng yêu cầu phát triển bền vững.",
          "Xây dựng môi trường làm việc thân thiện, năng động sáng tạo, phát huy tối đa sức mạnh tập thể.",
        ],
      },
    ],
  },
  {
    id: "an-toan",
    label: "CHÍNH SÁCH AN TOÀN",
    intro: "Công ty cam kết xây dựng văn hóa an toàn, bảo vệ sức khỏe và tính mạng của toàn thể cán bộ nhân viên trong mọi hoạt động sản xuất kinh doanh.",
    content: [
      {
        heading: "I. Đảm bảo môi trường làm việc an toàn cho toàn thể nhân viên.",
        points: [
          "Tuân thủ nghiêm ngặt các quy định về an toàn lao động và phòng cháy chữa cháy.",
          "Trang bị đầy đủ thiết bị bảo hộ cá nhân cho người lao động.",
          "Định kỳ đào tạo và kiểm tra kiến thức an toàn lao động.",
        ],
      },
      {
        heading: "II. Phòng ngừa và kiểm soát rủi ro an toàn.",
        points: [
          "Nhận diện và đánh giá các mối nguy hiểm tiềm ẩn trong quá trình sản xuất.",
          "Xây dựng và thực hiện các biện pháp phòng ngừa tai nạn lao động.",
          "Điều tra và xử lý kịp thời các sự cố, tai nạn xảy ra.",
        ],
      },
    ],
  },
  {
    id: "nguyen-tac",
    label: "NGUYÊN TẮC HOẠT ĐỘNG",
    intro: "Các nguyên tắc hoạt động là nền tảng định hướng mọi quyết định và hành động của công ty, đảm bảo phát triển bền vững và tạo giá trị lâu dài cho tất cả các bên liên quan.",
    content: [
      {
        heading: "I. Trung thực và minh bạch trong mọi hoạt động.",
        points: [
          "Cam kết trung thực với khách hàng, đối tác và cơ quan quản lý nhà nước.",
          "Công khai thông tin hoạt động theo quy định của pháp luật.",
          "Không tham gia vào các hành vi gian lận, tham nhũng dưới mọi hình thức.",
        ],
      },
      {
        heading: "II. Trách nhiệm với cộng đồng và môi trường.",
        points: [
          "Tuân thủ các quy định về bảo vệ môi trường trong sản xuất và kinh doanh.",
          "Tích cực tham gia các hoạt động cộng đồng và từ thiện xã hội.",
          "Sử dụng năng lượng và tài nguyên tiết kiệm, hiệu quả.",
        ],
      },
    ],
  },
];

function TabContent({ tab }) {
  return (
    <div className="pt-6">
      {tab.intro && (
        <p className="text-sm text-zinc-600 leading-relaxed mb-6 italic border-l-4 border-amber-500 pl-4">
          {tab.intro}
        </p>
      )}
      <div className="space-y-6">
        {tab.content.map((section, i) => (
          <div key={i}>
            <h3 className="text-sm font-bold text-red-700 mb-3 leading-snug">
              {section.heading}
            </h3>
            <ol className="space-y-2 ml-1">
              {section.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-zinc-600 leading-relaxed">
                  <span className="flex-shrink-0 text-zinc-400 font-semibold min-w-[1.2rem]">{j + 1}.</span>
                  {point}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

function AllTable() {
  return (
    <div className="pt-6 overflow-x-auto">
      <table className="w-full border-collapse text-xs" style={{ minWidth: "500px" }}>
        <tbody>
          {TABS.map((tab) => (
            <tr key={tab.id}>
              <td className="border border-red-200 bg-stone-50 px-4 py-5 align-top w-[200px]">
                <div className="flex items-start gap-2">
                  <span className="w-1 mt-0.5 min-h-[1.5rem] bg-red-700 flex-shrink-0 rounded-full" />
                  <p className="font-extrabold uppercase tracking-[0.12em] text-zinc-700 leading-snug text-[11px]">
                    {tab.label}
                  </p>
                </div>
              </td>
              <td className="border border-red-200 px-5 py-5 align-top bg-white text-zinc-600">
                {tab.intro && (
                  <p className="italic text-zinc-500 mb-4 leading-relaxed border-l-2 border-amber-400 pl-3">
                    {tab.intro}
                  </p>
                )}
                <div className="space-y-4">
                  {tab.content.map((section, i) => (
                    <div key={i}>
                      <p className="font-bold text-red-700 mb-2 leading-snug">{section.heading}</p>
                      <ol className="space-y-1.5 ml-1">
                        {section.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="flex-shrink-0 text-zinc-400 font-semibold min-w-[1.2rem]">{j + 1}.</span>
                            {point}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PolicyTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll]     = useState(false);

  return (
    /* ✅ single root div — relative so absolute children are contained */
    <div className="relative bg-white py-16 md:py-20 overflow-hidden">

      {/* Grid texture — NOW inside relative parent, won't bleed out */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-red-700 block" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-red-700 uppercase">Chính Sách</p>
            <span className="w-5 h-0.5 bg-red-700 block" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 leading-tight">
            CHÍNH SÁCH CHẤT LƯỢNG – AN TOÀN<br />
            <span className="text-red-700">NGUYÊN TẮC HOẠT ĐỘNG</span>
          </h2>
        </div>

        <div className="border-t border-dashed border-stone-300 mb-6" />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">

          {!showAll ? (
            <div className="flex flex-wrap gap-0 bg-stone-100 p-1 rounded-full">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 text-xs font-bold tracking-[0.08em] uppercase rounded-full transition-all duration-200 whitespace-nowrap
                    ${activeTab === i ? "bg-white text-red-700 shadow-sm" : "text-zinc-500 hover:text-zinc-800"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-zinc-400">Hiển thị tất cả</p>
          )}

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-xs font-semibold transition-colors duration-200 ${!showAll ? "text-red-700" : "text-zinc-400"}`}>
              Dạng tab
            </span>
            <button
              onClick={() => setShowAll(v => !v)}
              aria-label="Toggle view"
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-300 ${
                showAll ? "bg-red-700" : "bg-stone-300"
              }`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                showAll ? "translate-x-7" : "translate-x-1"
              }`} />
            </button>
            <span className={`text-xs font-semibold transition-colors duration-200 ${showAll ? "text-red-700" : "text-zinc-400"}`}>
              Xem tất cả
            </span>
          </div>
        </div>

        <div className="border-t border-dashed border-stone-300 mb-2" />

        {!showAll && <TabContent tab={TABS[activeTab]} />}
        {showAll  && <AllTable />}

      </div>
    </div>
  );
}
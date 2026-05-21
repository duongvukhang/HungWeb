import historyImage   from "./cowlian.jpg";  
export default function CompanyHistory () {
    const HISTORY = {
        label:   "Lịch Sử Hình Thành",
        heading: "Hành Trình Phát Triển",
        caption: "Đặt chú thích hoặc mô tả ngắn cho ảnh lịch sử tại đây — ví dụ: tên địa điểm, sự kiện, hoặc năm chụp.",
        milestones: [
          {
            year: "20XX",
            title: "Thành lập công ty",
            text:  "Đặt nội dung mô tả sự kiện/cột mốc tại đây. Bạn có thể kể câu chuyện sáng lập, bối cảnh ra đời, hay mục tiêu ban đầu của doanh nghiệp.",
          },
          {
            year: "20XX",
            title: "Mở rộng nhà máy",
            text:  "Đặt nội dung mô tả sự kiện/cột mốc tại đây. Ví dụ: đưa vào vận hành dây chuyền sản xuất mới, tăng công suất, mở thêm chi nhánh.",
          },
          {
            year: "20XX",
            title: "Đạt chứng nhận ISO",
            text:  "Đặt nội dung mô tả sự kiện/cột mốc tại đây. Ví dụ: đạt các tiêu chuẩn quốc tế, giải thưởng ngành, hoặc hợp tác chiến lược quan trọng.",
          },
          {
            year: "20XX",
            title: "Xuất khẩu quốc tế",
            text:  "Đặt nội dung mô tả sự kiện/cột mốc tại đây. Ví dụ: ký hợp đồng với đối tác nước ngoài, mở rộng thị trường, hoặc đột phá doanh thu.",
          },
        ],
      };
      
    return (
        <>
       
             <section className="relative py-20 bg-slate-800 overflow-hidden">
        {/* Red → amber gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-700/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

          {/* Section header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-amber-400 block" />
              <p className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">
                {HISTORY.label}
              </p>
              <span className="w-5 h-0.5 bg-amber-400 block" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {HISTORY.heading}
            </h2>
            <div className="flex items-center gap-2 max-w-xs mx-auto mt-4">
              <hr className="flex-grow border-t border-white/20" />
              <span className="w-2 h-2 bg-amber-500 rotate-45 block flex-shrink-0" />
              <hr className="flex-grow border-t border-white/20" />
            </div>
          </div>

          {/* History image + caption */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative overflow-hidden shadow-2xl">
              {/* Red top strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-700 z-10" />
              <div className="absolute top-1 right-0 w-12 h-1 bg-amber-500 z-10" />

              {/* Image — replace src with your own */}
              <img
                src={historyImage}
                alt="Lịch sử công ty"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Caption BENEATH the image */}
            <div className="bg-white border-l-4 border-red-700 px-5 py-4 mt-0 shadow-lg">
              <p className="text-[10px] font-bold tracking-widest uppercase text-red-700 mb-1">Chú thích</p>
              {/* Replace with your caption text */}
              <p className="text-zinc-600 text-sm leading-relaxed">{HISTORY.caption}</p>
            </div>
          </div>

          {/* Timeline milestones */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

              <div className="space-y-8">
                {HISTORY.milestones.map((m, i) => (
                  <div
                    key={i}
                    className={`relative flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Year badge — center */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-14 h-14 bg-red-700 items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/40">
                      <span className="text-white font-extrabold text-xs text-center leading-tight">{m.year}</span>
                    </div>

                    {/* Content card */}
                    <div className={`w-full md:w-[calc(50%-3.5rem)] bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors duration-200 ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                      {/* Mobile year */}
                      <div className="flex items-center gap-2 mb-2 md:hidden">
                        <div className="bg-red-700 px-3 py-1">
                          <span className="text-white font-extrabold text-xs">{m.year}</span>
                        </div>
                      </div>
                      <h4 className="font-extrabold text-white text-sm mb-2">{m.title}</h4>
                      <p className="text-white/55 text-sm leading-relaxed">{m.text}</p>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block w-[calc(50%-3.5rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

        </>
    )
}
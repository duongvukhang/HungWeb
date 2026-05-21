import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [contacted, setContacted] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const sectionRefs = {
    intro:    useRef(null),
    specs:    useRef(null),
    features: useRef(null),
    custom:   useRef(null),
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data.product);
      } catch {
        navigate('/productsPage');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Highlight nav item based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.dataset.section);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, [product]);

  const scrollTo = (key) => {
    sectionRefs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-red-600 font-bold tracking-widest uppercase text-sm">
      Đang tải...
    </div>
  );
  if (!product) return null;

  const imgUrl = product.image_url
    ? `${import.meta.env.VITE_API_URL}${product.image_url}`
    : null;

  const navItems = [
    { id: 'intro',    label: 'Giới Thiệu' },
    { id: 'specs',    label: 'Thông Số' },
    { id: 'features', label: 'Ưu Điểm' },
    { id: 'custom',   label: 'Tùy Chỉnh' },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'sans-serif' }}>

      {/* ── HERO BANNER ── */}
      <div className="relative h-28 bg-slate-800 overflow-hidden flex items-center justify-center">
        {imgUrl && (
          <img src={imgUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-700/60" />
        <div className="relative z-10 text-center">
          <h1 className="text-white font-extrabold text-2xl tracking-wide drop-shadow-lg uppercase">Sản Phẩm</h1>
          <div className="flex items-center justify-center gap-2 mt-1 text-white/60 text-xs">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Trang chủ</button>
            <span>›</span>
            <button onClick={() => navigate('/productsPage')} className="hover:text-white transition-colors">Sản phẩm</button>
            <span>›</span>
            <span className="text-white/90 line-clamp-1 max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── PRODUCT HERO — image + info ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Image */}
          <div className="lg:w-[45%] flex-shrink-0">
            <div className="relative bg-slate-100 overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-red-500 to-amber-400 z-10" />
              {imgUrl ? (
                <img src={imgUrl} alt={product.name} className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-slate-200 to-slate-100">🌿</div>
              )}
              <div className="absolute top-3 left-3 z-10 bg-red-600 text-white px-3 py-1">
                <p className="text-[9px] font-bold tracking-widest uppercase">Chính Hãng</p>
              </div>
              <div className="absolute bottom-3 left-3 z-10 bg-black/50 backdrop-blur-sm border border-white/10 text-amber-400 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                SKU-{String(product.id).padStart(4, '0')}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">{product.name}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description || 'Nhiên liệu sinh khối chất lượng cao, hiệu suất đốt tốt, thân thiện môi trường.'}
              </p>
            </div>

            {/* Quick nav pills */}
            <div className="flex flex-wrap gap-2">
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="px-4 py-1.5 border border-gray-200 text-xs font-semibold text-gray-600 hover:border-red-500 hover:text-red-600 transition-all duration-200">
                  {item.label} ↓
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Số Lượng (tấn)</p>
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-r border-gray-200 transition-colors text-lg">−</button>
                <span className="w-12 text-center text-sm font-bold text-gray-800">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-l border-gray-200 transition-colors text-lg">+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button onClick={() => setContacted(true)}
                className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm tracking-wide py-3.5 transition-colors duration-200">
                {contacted ? '✓ Đã gửi yêu cầu' : 'Liên Hệ Đặt Hàng'}
              </button>
              <button onClick={() => navigate('/productsPage')}
                className="px-6 py-3.5 border border-gray-300 text-gray-600 font-bold text-sm hover:border-red-500 hover:text-red-600 transition-all duration-200">
                ← Quay lại
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              {[
                { icon: '🚚', text: 'Giao hàng toàn quốc' },
                { icon: '✅', text: 'Chất lượng đảm bảo' },
                { icon: '📞', text: 'Hỗ trợ 24/7' },
              ].map((b, i) => (
                <div key={i} className="text-center bg-gray-50 py-3">
                  <div className="text-xl mb-1">{b.icon}</div>
                  <p className="text-[10px] text-gray-500 leading-tight font-medium">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ── */}
      <div className="sticky top-0 z-20 bg-white border-y border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`relative flex-1 px-6 py-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 text-center
                  ${activeSection === item.id ? 'text-red-600' : 'text-gray-500 hover:text-gray-800'}`}>
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE SECTIONS ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro */}
        <section ref={sectionRefs.intro} data-section="intro" className="py-14 border-b border-gray-100">
          <p className="text-[9px] font-bold tracking-widest uppercase text-red-500 mb-3">01 — Giới Thiệu Sản Phẩm</p>
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">Về sản phẩm này</h3>
          <div className="text-sm text-gray-600 leading-relaxed space-y-3 max-w-3xl">
            {product.description
              ? product.description.split('\n').map((line, i) => <p key={i}>{line}</p>)
              : <p>Nhiên liệu sinh khối chất lượng cao, hiệu suất đốt tốt, thân thiện môi trường.</p>
            }
          </div>
        </section>


        {/* Specs */}
        <section ref={sectionRefs.specs} data-section="specs" className="py-14 border-b border-gray-100">
          <p className="text-[9px] font-bold tracking-widest uppercase text-red-500 mb-3">02 — Thông Số Kỹ Thuật</p>
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">Thông số chi tiết</h3>
          {product.technical_performance ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 border border-gray-100 text-sm overflow-hidden max-w-2xl">
              {product.technical_performance
                .split('\n')
                .filter(line => line.trim())
                .map((line, i) => {
                  const [label, ...rest] = line.split(':');
                  const value = rest.join(':').trim();
                  return (
                    <div key={i} className="flex bg-white">
                      <div className="bg-gray-50 px-4 py-3 font-bold text-gray-500 uppercase tracking-wide text-xs w-32 shrink-0 flex items-center">
                        {label.replace('•', '').trim()}
                      </div>
                      <div className="px-4 py-3 text-gray-800 font-semibold flex items-center">
                        {value || '—'}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">Chưa có thông số kỹ thuật.</p>
          )}
        </section>

        {/* Features */}
        <section ref={sectionRefs.features} data-section="features" className="py-14 border-b border-gray-100">
          <p className="text-[9px] font-bold tracking-widest uppercase text-red-500 mb-3">03 — Cấu Trúc Hệ Thống</p>
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">Cấu trúc sản phẩm</h3>
          {product.system_structure ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {product.system_structure
                .split('\n')
                .filter(line => line.trim())
                .map((line, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100">
                    <span className="text-red-500 mt-0.5 flex-shrink-0 font-bold">•</span>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      {line.replace('•', '').trim()}
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">Chưa có thông tin cấu trúc.</p>
          )}
        </section>

        {/* Custom */}
        <section ref={sectionRefs.custom} data-section="custom" className="py-14">
          <p className="text-[9px] font-bold tracking-widest uppercase text-red-500 mb-3">04 — Tùy Chỉnh</p>
          <h3 className="text-xl font-extrabold text-gray-900 mb-5">Đặt hàng theo yêu cầu</h3>
          <div className="max-w-2xl">
            {product.custom_options ? (
              <ul className="space-y-2 mb-6">
                {product.custom_options
                  .split('\n')
                  .filter(line => line.trim())
                  .map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-red-500 mt-0.5 flex-shrink-0 font-bold">•</span>
                      {line.replace('•', '').trim()}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Chúng tôi cung cấp dịch vụ tùy chỉnh sản phẩm theo yêu cầu của khách hàng về kích thước, độ ẩm, và đóng gói.
              </p>
            )}
            <div className="flex gap-3">

              <button onClick={() => navigate('/contactPage')}
                className="px-8 py-3.5 border border-gray-300 text-gray-600 font-bold text-sm hover:border-red-500 hover:text-red-600 transition-all duration-200">
                Trang liên hệ →
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
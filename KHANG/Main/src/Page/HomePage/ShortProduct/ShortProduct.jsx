import { useState, useEffect, useRef, useCallback } from 'react';
import image from "./image123.jpg"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function ShortProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [current, setCurrent]   = useState(0);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const [winW, setWinW]         = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const autoRef    = useRef(null);
  const touchStart = useRef(null);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:4000/api/products/featured', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`Lỗi ${res.status}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setError('Không thể tải sản phẩm. Kiểm tra backend.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const len  = products.length;
  const next = useCallback(() => setCurrent(c => (c + 1) % len), [len]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + len) % len), [len]);

  useEffect(() => {
    if (len < 2 || viewMode === 'grid') return;
    autoRef.current = setInterval(next, 5000);
    return () => clearInterval(autoRef.current);
  }, [next, len, viewMode]);

  const resetAuto = (fn) => {
    clearInterval(autoRef.current);
    fn();
    autoRef.current = setInterval(next, 5000);
  };

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? resetAuto(next) : resetAuto(prev);
    touchStart.current = null;
  };

  const getOffset = (idx) => {
    if (!len) return null;
    const offset = ((idx - current) % len + len) % len;
    const signed = offset > len / 2 ? offset - len : offset;
    if (Math.abs(signed) > 2) return null;
    return signed;
  };

  const isMobile   = winW < 640;
  const isTablet   = winW >= 640 && winW < 1024;
  const cardW      = isMobile ? Math.min(winW - 40, 360) : isTablet ? 380 : 550;
  const sideX      = isTablet ? 300 : 430;
  const farX       = isTablet ? 500 : 720;
  const sideY      = isTablet ? 70  : 80;
  const farY       = isTablet ? 100 : 120;
  const cardH      = isMobile ? 240 : isTablet ? 300 : 400;
  const singleCard = isMobile || winW < cardW * 2.2;
  const stageH     = singleCard ? cardH + 20 : (isTablet ? 400 : 460);

  const cardStyles = (offset) => {
    const base = 'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]';
    if (singleCard) {
      if (offset === 0) return { className: `${base} opacity-100 z-10`, style: { transform: 'translateX(0) scale(1)' } };
      return { className: `${base} opacity-0 pointer-events-none`, style: { transform: 'scale(0.8)' } };
    }
    if (offset === null) return { className: `${base} opacity-0 pointer-events-none`, style: { transform: 'scale(0.5)' } };
    if (offset === 0)    return { className: `${base} opacity-100 z-10`, style: { transform: 'translateX(0) translateY(0) scale(1)' } };
    if (offset === 1)    return { className: `${base} opacity-100 z-[5] blur-[2px] hover:blur-0 hover:opacity-90`, style: { transform: `translateX(${sideX}px) translateY(${sideY}px) scale(0.72)` } };
    if (offset === -1)   return { className: `${base} opacity-100 z-[5] blur-[2px] hover:blur-0 hover:opacity-90`, style: { transform: `translateX(-${sideX}px) translateY(${sideY}px) scale(0.72)` } };
    if (offset === 2)    return { className: `${base} opacity-0 z-[1] pointer-events-none`, style: { transform: `translateX(${farX}px) translateY(${farY}px) scale(0.55)` } };
    if (offset === -2)   return { className: `${base} opacity-0 z-[1] pointer-events-none`, style: { transform: `translateX(-${farX}px) translateY(${farY}px) scale(0.55)` } };
    return { className: `${base} opacity-0 pointer-events-none`, style: {} };
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20 text-amber-400 text-xs font-bold tracking-widest uppercase">
      Đang tải sản phẩm...
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center py-20 text-red-400 text-sm">{error}</div>
  );
  if (!len) return (
    <div className="flex items-center justify-center py-20 text-stone-400 text-sm">
      Chưa có sản phẩm nổi bật
    </div>
  );
  
  return (
    <section id="products" className="relative py-14 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={image} alt="" className="w-full h-full object-cover scale-110" />
      </div>
      <div className="absolute inset-0 z-0 bg-slate-900/50" />
     
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="relative text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3"/>
          
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
            Nhiên Liệu Sinh Khối{" "}
            <span className="text-red-400">Chất Lượng Cao</span>
          </h2>

          {/* ── View toggle — top right ── */}
          <div className="absolute top-0 right-0 flex items-center gap-1 p-1 bg-white/10 backdrop-blur-sm">
            {/* Carousel button */}
            <button
              onClick={() => setViewMode('carousel')}
              title="Carousel"
              className={`flex items-center justify-center w-8 h-8 transition-all duration-200
                ${viewMode === 'carousel' ? 'bg-red-700 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
            >
              {/* Carousel icon: 3 vertical rects */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1"  y="6" width="5" height="12" rx="1"/>
                <rect x="9"  y="3" width="6" height="18" rx="1"/>
                <rect x="18" y="6" width="5" height="12" rx="1"/>
              </svg>
            </button>
            {/* Grid button */}
            <button
              onClick={() => setViewMode('grid')}
              title="Lưới"
              className={`flex items-center justify-center w-8 h-8 transition-all duration-200
                ${viewMode === 'grid' ? 'bg-red-700 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
            >
              {/* Grid icon: 2x2 squares */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3"  y="3"  width="8" height="8" rx="1"/>
                <rect x="13" y="3"  width="8" height="8" rx="1"/>
                <rect x="3"  y="13" width="8" height="8" rx="1"/>
                <rect x="13" y="13" width="8" height="8" rx="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── CAROUSEL VIEW ── */}
        {viewMode === 'carousel' && (
          <>
            <div
              className="relative flex items-start justify-center pt-4"
              style={{ height: stageH }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {products.map((product, idx) => {
                const offset   = getOffset(idx);
                const isCenter = offset === 0;
                return (
                  <div
                    key={product.id}
                    onClick={() => !isCenter && resetAuto(() => setCurrent(idx))}
                    className={`absolute ${cardStyles(offset).className} ${!isCenter ? 'cursor-pointer' : ''}`}
                    style={{ width: cardW, ...cardStyles(offset).style }}
                  >
                    <div
                      className={`flex flex-row bg-white overflow-hidden transition-transform duration-300 ease-out ${isCenter ? 'shadow-2xl hover:scale-[1.03]' : 'shadow-lg'}`}
                      style={{ height: cardH }}
                    >
                      <ProductCardInner product={product} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-7">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => resetAuto(() => setCurrent(idx))}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-none border-none cursor-pointer p-0 transition-all duration-300
                    ${idx === current ? 'w-6 opacity-100 bg-amber-400' : 'w-1.5 opacity-30 bg-white'}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* ── GRID VIEW ── */}
        {viewMode === 'grid' && (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 bg-slate-900 group"
              style={{ height: '360px' }}
            >
              {/* ── FULL-BLEED IMAGE ── */}
              {product.image_url ? (
                <img
                  src={`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${product.image_url}`}
                  alt={product.name || 'Sản phẩm'}
                  crossOrigin="anonymous"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-7xl gap-2">
                  🔥
                  <span className="text-xs text-slate-400 font-medium tracking-wide">Chưa có ảnh</span>
                </div>
              )}

              {/* ── SKU badge ── */}
              <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-sm border border-white/10 text-amber-400 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                SKU-{String(product.id).padStart(4, '0')}
              </div>
        
              {/* ── BOTTOM info panel ── */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col gap-2">
                <h3 className="text-white font-extrabold text-base leading-snug line-clamp-2 drop-shadow-md">
                  {product.name || 'Sản Phẩm'}
                </h3>
        
                <p
                  className="text-white/60 text-[11px] leading-relaxed"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {product.description || 'Nhiên liệu sinh khối sạch, hiệu suất cao, thân thiện môi trường.'}
                </p>
                  
                <button
                  onClick={() => navigate(`/productsPage/${product.id}`)}
                  className="block w-full text-center bg-red-700 hover:bg-red-600 active:bg-red-800 text-white text-xs font-bold tracking-widest uppercase py-3 mt-1 transition-colors duration-200"
                >
                  Xem sản phẩm →
                </button>
                
              </div>
            </div>
          ))}
        </div>
        
        )}

        {/* Bottom CTA */}
        <div className="flex items-center gap-3 mt-10 max-w-sm mx-auto">
          <hr className="flex-grow border-t border-white/20" />
          <Link
            to="/productsPage"
            className="inline-flex items-center gap-1.5 px-4 py-1.5  text-amber-400 hover:text-amber-300 hover:border-amber-300/60 hover:bg-amber-400/5 font-semibold text-sm transition-all duration-200 whitespace-nowrap group rounded-sm"
          >
            Xem tất cả sản phẩm
            <span className="transition-transform duration-200 group-hover:translate-x-1 text-base leading-none">»</span>
          </Link>
          <hr className="flex-grow border-t border-white/20" />
        </div>

      </div>
    </section>
  );
}

/* ── Shared carousel card interior ── */
function ProductCardInner({ product }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const description = product.description
    || 'Nhiên liệu sinh khối sạch, hiệu suất cao, thân thiện môi trường.';

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900 group">

      {/* ── FULL-BLEED IMAGE ── */}
      {product.image_url ? (
        <img
          src={`${API_URL}${product.image_url}`}
          alt={product.name || 'Sản phẩm'}
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-7xl">
          🔥
        </div>
      )}
     
      {/* ── SKU badge ── */}
      <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-sm border border-white/10 text-amber-400 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
        SKU-{String(product.id).padStart(4, '0')}
      </div>

      {/* ── BOTTOM info panel ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col gap-2">

        {/* Name */}
        <h3 className="text-white font-extrabold text-base leading-snug line-clamp-2 drop-shadow-md">
          {product.name || 'Sản Phẩm'}
        </h3>

        {/* Description — max 2 lines then ... */}
        <p
          className="text-white/60 text-[11px] leading-relaxed"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate(`/productsPage/${product.id}`)}
          className="block w-full text-center bg-red-700 hover:bg-red-600 active:bg-red-800 text-white text-xs font-bold tracking-widest uppercase py-3 mt-1 transition-colors duration-200"
        >
          Xem sản phẩm →
        </button>
        
      </div>
    </div>
  );
}
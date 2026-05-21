import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'vien-nen', label: 'Viên Nén Gỗ' },
  { id: 'mun-cua', label: 'Mùn Cưa' },
  { id: 'than-sinh-hoc', label: 'Than Sinh Học' },
  { id: 'vo-trau', label: 'Vỏ Trấu' },
  { id: 'cui', label: 'Củi Sinh Khối' },
];

const PRICE_RANGES = [
  { id: 'under-1m', label: 'Dưới 1 triệu', min: 0, max: 1000000 },
  { id: '1m-2m', label: '1 - 2 triệu', min: 1000000, max: 2000000 },
  { id: '2m-3m', label: '2 - 3 triệu', min: 2000000, max: 3000000 },
  { id: 'over-3m', label: 'Trên 3 triệu', min: 3000000, max: Infinity },
];

const ORIGINS = ['Bình Dương', 'Đồng Nai', 'Long An', 'Tây Ninh'];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'name-asc', label: 'Tên A-Z' },
];

function CheckItem({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-150 cursor-pointer
          ${checked ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white group-hover:border-red-400'}`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors">{label}</span>
    </label>
  );
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-bold text-gray-800 text-sm tracking-wide">{title}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && <div className="mt-3 space-y-2.5">{children}</div>}
    </div>
  );
}
function SidebarContent ({filtered,selectedCat,setSelectedCat,selectedPrices,togglePrice,selectedOrigins,toggleOrigin,activeFilterCount,clearAll}) {
    return (
    <div className="w-full">
      <p className="text-sm font-bold text-gray-800 mb-4">
        {filtered.length} <span className="font-normal text-gray-500">sản phẩm</span>
      </p>
      <FilterSection title="Danh Mục">
        <div className="space-y-1">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
              className={`w-full text-left text-sm px-3 py-2 transition-all duration-150
                ${selectedCat === cat.id
                  ? 'bg-red-600 text-white font-semibold'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-700'}`}>
              {cat.label}
            </button>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Khoảng Giá">
        {PRICE_RANGES.map(r => (
          <CheckItem key={r.id} label={r.label}
            checked={selectedPrices.includes(r.id)} onChange={() => togglePrice(r.id)} />
        ))}
      </FilterSection>
      <FilterSection title="Xuất Xứ" defaultOpen={false}>
        {ORIGINS.map(o => (
          <CheckItem key={o} label={o}
            checked={selectedOrigins.includes(o)} onChange={() => toggleOrigin(o)} />
        ))}
      </FilterSection>
      {activeFilterCount > 0 && (
        <button onClick={clearAll}
          className="mt-4 w-full py-2.5 border border-gray-300 text-sm text-gray-600 hover:border-red-400 hover:text-red-500 transition-colors duration-200 font-medium">
          Xóa tất cả bộ lọc ({activeFilterCount})
        </button>
      )}
    </div>)
  
};

export default function ProductPage() {
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [sortBy, setSortBy]           = useState('newest');
  const [search, setSearch]           = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`Lỗi ${res.status}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch(err) {
        console.error('Fetch error:', err);
        setError('Không thể tải sản phẩm.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const togglePrice  = (id) => setSelectedPrices(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleOrigin = (o)  => setSelectedOrigins(p => p.includes(o)  ? p.filter(x => x !== o)  : [...p, o]);

  const activeFilterCount =
    (selectedCat !== 'all' ? 1 : 0) +
    selectedPrices.length +
    selectedOrigins.length +
    (search ? 1 : 0);

  const clearAll = () => {
    setSelectedCat('all');
    setSelectedPrices([]);
    setSelectedOrigins([]);
    setSearch('');
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    if (selectedPrices.length) {
      list = list.filter(p => {
        const price = Number(p.price) || 0;
        return selectedPrices.some(id => {
          const range = PRICE_RANGES.find(r => r.id === id);
          return range && price >= range.min && price < range.max;
        });
      });
    }if (selectedCat !== 'all') {list = list.filter(p => p.category_slug === selectedCat);}
    if (selectedOrigins.length) {list = list.filter(p => selectedOrigins.includes(p.origin))}
    if (sortBy === 'price-asc')  list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    if (sortBy === 'price-desc') list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    if (sortBy === 'name-asc')   list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (sortBy === 'newest')     list.sort((a, b) => b.id - a.id);
    return list;
  }, [products, search, selectedPrices, selectedCat, selectedOrigins, sortBy]);
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-red-600 uppercase mb-1" style={{ fontFamily: 'sans-serif' }}>
                Cửa Hàng
              </p>
              <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: 'sans-serif' }}>
                Nhiên Liệu Sinh Khối
              </h1>
            </div>
            <div className="relative w-full sm:w-80">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-red-400 transition-colors"
                style={{ fontFamily: 'sans-serif' }} />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-gray-100 shadow-sm p-5 sticky top-6">
            <SidebarContent
              filtered={filtered}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              selectedPrices={selectedPrices}
              togglePrice={togglePrice}
              selectedOrigins={selectedOrigins}
              toggleOrigin={toggleOrigin}
              activeFilterCount={activeFilterCount}
              clearAll={clearAll}
            />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              <button onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-red-400 transition-colors"
                style={{ fontFamily: 'sans-serif' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
                </svg>
                Bộ lọc {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              <div className="flex flex-wrap gap-2 flex-1">
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold" style={{ fontFamily: 'sans-serif' }}>
                    "{search}"
                    <button onClick={() => setSearch('')} className="ml-1 hover:text-red-500">×</button>
                  </span>
                )}
                {selectedPrices.map(id => (
                  <span key={id} className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold" style={{ fontFamily: 'sans-serif' }}>
                    {PRICE_RANGES.find(r => r.id === id)?.label}
                    <button onClick={() => togglePrice(id)} className="ml-1 hover:text-red-500">×</button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-gray-500 hidden sm:block" style={{ fontFamily: 'sans-serif' }}>Sắp xếp:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-200 bg-white text-sm px-3 py-2 focus:outline-none focus:border-red-400 cursor-pointer"
                  style={{ fontFamily: 'sans-serif' }}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-24 text-red-600 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'sans-serif' }}>
                Đang tải...
              </div>
            ) : error ? (
              <div className="text-center py-24 text-red-500 text-sm" style={{ fontFamily: 'sans-serif' }}>{error}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24" style={{ fontFamily: 'sans-serif' }}>
                <div className="text-5xl mb-4">🌿</div>
                <p className="text-gray-500 text-sm">Không tìm thấy sản phẩm phù hợp</p>
                <button onClick={clearAll} className="mt-4 text-red-600 text-sm font-semibold hover:underline">Xóa bộ lọc</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800" style={{ fontFamily: 'sans-serif' }}>Bộ lọc</h3>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
            </div>
            <SidebarContent
              filtered={filtered}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              selectedPrices={selectedPrices}
              togglePrice={togglePrice}
              selectedOrigins={selectedOrigins}
              toggleOrigin={toggleOrigin}
              activeFilterCount={activeFilterCount}
              clearAll={clearAll}
            />
          </div>
        </div>
      )}

      
    </div>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate()
  return (
    <div
      className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group h-[450px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-gray-100 h-48">
        {product.image_url ? (
          <img
          src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🌿</div>
        )}

        {/* Badge */}
        <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1">
          <p className="text-[9px] font-bold tracking-widest uppercase" style={{ fontFamily: 'sans-serif' }}>Chính hãng</p>
        </div>

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-red-900/20 flex items-end justify-center pb-4 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => navigate(`/productsPage/${product.id}`)}
            className="bg-white text-emerald-700 text-xs font-bold tracking-widest uppercase px-5 py-2.5 shadow-lg hover:bg-red-600 hover:text-white transition-colors duration-200"
            style={{ fontFamily: 'sans-serif' }}
          >
            Xem chi tiết
          </button>
          
          
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1" style={{ fontFamily: 'sans-serif' }}>
          SKU-{String(product.id).padStart(4, '0')}
        </p>
        <h3 className="font-extrabold text-gray-900 text-sm leading-tight mb-1 line-clamp-2" style={{ fontFamily: 'sans-serif' }}>
          {product.name || 'Sản Phẩm'}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
          {product.description || 'Nhiên liệu sinh khối chất lượng cao.'}
        </p>

        <div className="flex items-center justify-between">
          <div>
            {product.price ? (
              <p className="text-red-600 font-extrabold text-base" style={{ fontFamily: 'sans-serif' }}>
                {Number(product.price).toLocaleString('vi-VN')}
                <span className="text-xs font-normal text-gray-400 ml-1">₫/tấn</span>
              </p>
            ) : (
              <p className="text-red-600 font-bold text-sm" style={{ fontFamily: 'sans-serif' }}>Liên hệ báo giá</p>
            )}
            <p className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: 'sans-serif' }}>Trả góp 0%</p>
          </div>

          <button
            onClick={() => navigate(`/productsPage/${product.id}`)}
            className="w-9 h-9 border border-red-200 flex items-center justify-center text-red-600 hover:bg-emrederald-600 hover:text-white hover:border-red-600 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
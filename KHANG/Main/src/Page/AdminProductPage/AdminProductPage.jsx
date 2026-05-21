import { useState, useEffect, useCallback } from "react";
import { useAuth } from '../../context/AuthContext.jsx';

const PRODUCT_API = `${import.meta.env.VITE_API_URL}/api`;

const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  trash:  "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  plus:   "M12 5v14M5 12h14",
  edit:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  back:   "M19 12H5M12 5l-7 7 7 7",
  save:   "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  check:  "M20 6L9 17l-5-5",
  image:  "M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8z",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
};

// ── ProductForm ───────────────────────────────────────────────────────────────
function ProductForm({ initial, onSave, onCancel }) {
  const [name,                 setName]                 = useState(initial?.name                  || "");
  const [description,          setDescription]          = useState(initial?.description           || "");
  const [price,                setPrice]                = useState(initial?.price                 || "");
  const [categoryId,           setCategoryId]           = useState(initial?.category_id           || "");
  const [systemStructure,      setSystemStructure]      = useState(initial?.system_structure      || "");
  const [technicalPerformance, setTechnicalPerformance] = useState(initial?.technical_performance || "");
  const [customOptions,        setCustomOptions]        = useState(initial?.custom_options        || "");
  const [imageFile,            setImageFile]            = useState(null);
  const [preview,              setPreview]              = useState(
    initial?.image_url ? `${import.meta.env.VITE_API_URL}${initial.image_url}` : null
  );
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);

  const { token } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("Product name is required."); return; }
    setSaving(true); setError("");

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", categoryId);
    formData.append("system_structure", systemStructure);
    formData.append("technical_performance", technicalPerformance);
    formData.append("custom_options", customOptions);
    if (imageFile) formData.append("image", imageFile);

    try {
      const url    = initial ? `${PRODUCT_API}/products/${initial.id}` : `${PRODUCT_API}/products`;
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onSave(); }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };



  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <button onClick={onCancel}
        className="flex items-center gap-2 text-zinc-400 hover:text-red-700 text-sm mb-8 transition-colors font-medium">
        <Ic d={ICONS.back} size={14} /> Back to Products
      </button>
      <div className="h-1 w-16 bg-gradient-to-r from-red-700 to-amber-500 rounded-full mb-6" />
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">
        {initial ? "Edit Product" : "Add New Product"}
      </h1>
      {error && (
        <div className="bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm mb-6 rounded-lg">{error}</div>
      )}


      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
            {/* ── BASIC INFO ── */}
            <div>
            <h2 className="text-lg font-bold text-zinc-800 mb-4">Basic Info</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Product Name *</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Biomass Pellets Grade A"
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-zinc-300" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Price (₫/tấn)</label>
                    <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="e.g. 2500000"
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-zinc-300" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Category ID</label>
                    <input value={categoryId} onChange={e => setCategoryId(e.target.value)} type="number" placeholder="1 or 2"
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-zinc-300" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Short product description…"
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none placeholder:text-zinc-300" />
                </div>
                </div>
                <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Product Image</label>
                <label className="block cursor-pointer">
                    <div className={`border-2 border-dashed rounded-xl overflow-hidden transition-colors ${preview ? "border-zinc-200" : "border-zinc-200 hover:border-red-300"}`}>
                    {preview ? (
                        <div className="relative group">
                        <img src={preview} alt="" className="w-full h-64 object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-medium flex items-center gap-2"><Ic d={ICONS.image} size={16} /> Change image</span>
                        </div>
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center gap-3 text-zinc-400">
                        <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center"><Ic d={ICONS.image} size={22} /></div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-zinc-500">Click to upload image</p>
                            <p className="text-xs text-zinc-400 mt-0.5">JPG, PNG up to 5MB</p>
                        </div>
                        </div>
                    )}
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                </div>
            </div>
            </div>

            {/* ── SYSTEM STRUCTURE ── */}
            <div>
            <h2 className="text-lg font-bold text-zinc-800 mb-2">System Structure</h2>
            <p className="text-xs text-zinc-400 mb-3">Describe the system structure — components, assembly, how parts connect, etc.</p>
            <textarea value={systemStructure} onChange={e => setSystemStructure(e.target.value)} rows={8}
                placeholder={`e.g.\n• Raw material hopper\n• Conveyor system\n• Pellet press unit`}
                className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none placeholder:text-zinc-300 leading-relaxed" />
            </div>

            {/* ── TECHNICAL PERFORMANCE ── */}
            <div>
            <h2 className="text-lg font-bold text-zinc-800 mb-2">Technical Performance</h2>
            <p className="text-xs text-zinc-400 mb-3">Enter technical specs — moisture, calorific value, dimensions, etc.</p>
            <textarea value={technicalPerformance} onChange={e => setTechnicalPerformance(e.target.value)} rows={8}
                placeholder={`e.g.\nĐộ ẩm: ≤ 12%\nNhiệt trị: ≥ 4.000 kcal/kg\nTro: ≤ 3%\nKích thước: 6mm / 8mm`}
                className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none placeholder:text-zinc-300 leading-relaxed font-mono" />
            </div>

            {/* ── CUSTOM OPTIONS ── */}
            <div>
            <h2 className="text-lg font-bold text-zinc-800 mb-2">Custom Options</h2>
            <p className="text-xs text-zinc-400 mb-3">Describe customization options — sizes, packaging, MOQ, etc.</p>
            <textarea value={customOptions} onChange={e => setCustomOptions(e.target.value)} rows={8}
                placeholder={`e.g.\n• Kích thước tùy chỉnh: 6mm, 8mm, 10mm\n• Đóng gói: bao 25kg, 50kg\n• MOQ: 5 tấn`}
                className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none placeholder:text-zinc-300 leading-relaxed" />
            </div>
        </div>

        {/* ── SAVE BAR ── */}
        <div className="flex gap-3 pt-6 mt-8 border-t border-zinc-100">
            <button type="submit" disabled={saving || !name.trim()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                success     ? "bg-green-600 text-white" :
                name.trim() ? "bg-red-700 hover:bg-red-800 text-white" :
                            "bg-zinc-100 text-zinc-300 cursor-not-allowed"}`}>
            {saving  ? "Saving…" :
            success ? <><Ic d={ICONS.check} size={14} /> Saved!</> :
                        <><Ic d={ICONS.save} size={14} /> {initial ? "Update Product" : "Add Product"}</>}
            </button>
            <button type="button" onClick={onCancel}
            className="px-5 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-500 text-sm hover:border-zinc-300 hover:text-zinc-700 transition-colors">
            Cancel
            </button>
        </div>
        </form>
    </div>
  );
}

// ── ProductRow ────────────────────────────────────────────────────────────────
function ProductRow({ product, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-zinc-100 hover:border-red-200 rounded-xl p-4 transition-all group">
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-emerald-50 shrink-0 border border-zinc-100">
        {product.image_url ? (
          <img src={`${import.meta.env.VITE_API_URL}${product.image_url}`} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.style.display = "none"; }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🌿</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-zinc-800 text-sm truncate">{product.name}</span>
          {product.category_id && (
            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase tracking-wide">
              Cat. {product.category_id}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400 line-clamp-1 mb-1">{product.description || "No description"}</p>
        <p className="text-sm font-extrabold text-emerald-600">
          {product.price
            ? `${Number(product.price).toLocaleString("vi-VN")} ₫/tấn`
            : <span className="text-zinc-400 font-normal">No price set</span>}
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => onEdit(product)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-semibold transition-colors">
          <Ic d={ICONS.edit} size={12} /> Edit
        </button>
        <button onClick={() => onDelete(product.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-lg text-xs font-semibold transition-colors">
          <Ic d={ICONS.trash} size={12} /> Delete
        </button>
      </div>
    </div>
  );
}

// ── AdminProductPage ──────────────────────────────────────────────────────────
export default function AdminProductPage() {
  const { admin, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [view,     setView]     = useState("list");
  const [editing,  setEditing]  = useState(null);
  const [search,   setSearch]   = useState("");
  const [error,    setError]    = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${PRODUCT_API}/products`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      const res = await fetch(`${PRODUCT_API}/products/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    } catch (err) { alert(err.message); }
  };

  const handleSaved = async () => {
    await load();
    setView("list");
    setEditing(null);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(search.toLowerCase())
  );

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {view === "list" && (
        <>
          <div className="bg-white border-b border-zinc-100">
            <div className="max-w-5xl mx-auto px-6 py-10">
              <div className="h-1 w-12 bg-gradient-to-r from-red-700 to-amber-500 rounded-full mb-5" />
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-zinc-800 tracking-tight">Products</h1>
                  <p className="text-zinc-400 mt-1 text-sm">{products.length} total products</p>
                </div>
                <button onClick={() => setView("create")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shrink-0">
                  <Ic d={ICONS.plus} size={14} /> Add Product
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="relative mb-6">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"><Ic d={ICONS.search} size={15} /></span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
                className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all bg-white placeholder:text-zinc-300" />
            </div>
            {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm mb-6">{error}</div>}
            {loading ? (
              <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="bg-white rounded-xl h-24 animate-pulse border border-zinc-100" />)}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-5xl mb-4">🌿</div>
                <p className="text-zinc-400 font-medium">{search ? "No products match your search" : "No products yet"}</p>
                {!search && (
                  <button onClick={() => setView("create")} className="mt-4 px-5 py-2 bg-red-700 text-white text-sm font-semibold rounded-xl hover:bg-red-800 transition-colors">
                    Add first product
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(product => (
                  <ProductRow key={product.id} product={product}
                    onEdit={(p) => { setEditing(p); setView("edit"); }}
                    onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {view === "create" && (
        <ProductForm onSave={handleSaved} onCancel={() => setView("list")} />
      )}

      {view === "edit" && editing && (
        <ProductForm initial={editing} onSave={handleSaved} onCancel={() => { setView("list"); setEditing(null); }} />
      )}
    </div>
  );
}
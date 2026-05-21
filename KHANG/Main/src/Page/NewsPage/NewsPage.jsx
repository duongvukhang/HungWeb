import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx"
import { newsAPI } from "../../api.js";

const uid = () => Math.random().toString(36).slice(2, 9);

const Ic = ({ d, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

const ICONS = {
    trash:  "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    plus:   "M12 5v14M5 12h14",
    text:   "M4 6h16M4 12h16M4 18h10",
    image:  "M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8z",
    up:     "M12 19V5M5 12l7-7 7 7",
    down:   "M12 5v14M5 12l7 7 7-7",
    back:   "M19 12H5M12 5l-7 7 7 7",
    edit:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
    save:   "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
    check:  "M20 6L9 17l-5-5",
    close:  "M18 6L6 18M6 6l12 12",
};

// ── Add Block Row ─────────────────────────────────────────────────────────────
function AddBlockRow({ onAdd }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-zinc-200" />
            <div className="relative">
                <button onClick={() => setOpen(!open)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs border transition-all ${open ? "bg-red-700 text-white border-red-700" : "bg-white text-zinc-400 border-zinc-200 hover:border-red-300 hover:text-red-600"}`}>
                    <Ic d={ICONS.plus} size={11} /> Add block
                </button>
                {open && (
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white border border-zinc-100 rounded-xl shadow-xl overflow-hidden z-20 min-w-[140px]">
                        {[
                            { type: "text",  icon: ICONS.text,  label: "Text block" },
                            { type: "image", icon: ICONS.image, label: "Image block" },
                        ].map(({ type, icon, label }) => (
                            <button key={type} onClick={() => { onAdd(type); setOpen(false); }}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-zinc-600 hover:bg-stone-50 hover:text-red-700 transition-colors text-left border-b border-zinc-50 last:border-none">
                                <Ic d={icon} size={13} /> {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex-1 h-px bg-zinc-200" />
        </div>
    );
}

// ── Block Editor Cell ─────────────────────────────────────────────────────────
function BlockCell({ block, index, total, onChange, onDelete, onMove, onAddAfter }) {
    const [imgMode, setImgMode] = useState("url");
    return (
        <div>
            <div className="bg-stone-50 border border-zinc-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-100 bg-white">
                    <span className="flex items-center gap-1.5 flex-1 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                        <Ic d={block.type === "text" ? ICONS.text : ICONS.image} size={11} />
                        {block.type} · {index + 1}
                    </span>
                    <div className="flex gap-1">
                        {index > 0 && <button onClick={() => onMove(index, -1)} className="p-1 text-zinc-300 hover:text-zinc-600 rounded transition-colors"><Ic d={ICONS.up} size={12} /></button>}
                        {index < total - 1 && <button onClick={() => onMove(index, 1)} className="p-1 text-zinc-300 hover:text-zinc-600 rounded transition-colors"><Ic d={ICONS.down} size={12} /></button>}
                        <button onClick={() => onDelete(block.id)} className="p-1 text-red-300 hover:text-red-600 rounded transition-colors"><Ic d={ICONS.trash} size={12} /></button>
                    </div>
                </div>
                <div className="p-4">
                    {block.type === "text" ? (
                        <textarea value={block.content} onChange={(e) => onChange(block.id, e.target.value)}
                            placeholder="Write something…" rows={4}
                            className="w-full bg-transparent border-none outline-none resize-y text-zinc-700 text-sm leading-relaxed placeholder:text-zinc-300" />
                    ) : (
                        <div>
                            <div className="flex gap-2 mb-3">
                                {["url", "upload"].map((m) => (
                                    <button key={m} onClick={() => setImgMode(m)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${imgMode === m ? "bg-red-700 text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}>
                                        {m === "url" ? "Paste URL" : "Upload"}
                                    </button>
                                ))}
                            </div>
                            {imgMode === "url" ? (
                                <input value={block.content} onChange={(e) => onChange(block.id, e.target.value)}
                                    placeholder="https://…"
                                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-zinc-700 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-zinc-300" />
                            ) : (
                                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-zinc-200 rounded-lg p-6 cursor-pointer text-zinc-400 text-sm hover:border-red-300 hover:text-red-500 transition-colors">
                                    <Ic d={ICONS.image} size={14} /> Click to upload
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        const file = e.target.files[0]; if (!file) return;
                                        const reader = new FileReader();
                                        reader.onload = (ev) => onChange(block.id, ev.target.result);
                                        reader.readAsDataURL(file);
                                    }} />
                                </label>
                            )}
                            {block.content && (
                                <div className="mt-3 rounded-lg overflow-hidden">
                                    <img src={block.content} alt="" className="w-full max-h-48 object-cover" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <AddBlockRow onAdd={(type) => onAddAfter(index, type)} />
        </div>
    );
}

// ── Article Editor ────────────────────────────────────────────────────────────
function ArticleEditor({ initial, onSave, onCancel }) {
    const [title,   setTitle]   = useState(initial?.title || "");
    const [blocks,  setBlocks]  = useState(
        initial?.blocks?.length
            ? [...initial.blocks].sort((a, b) => a.position - b.position)
            : [{ id: uid(), type: "text", content: "", position: 0 }]
    );
    const [saving,  setSaving]  = useState(false);
    const [success, setSuccess] = useState(false);
    const [error,   setError]   = useState("");

    const addBlock    = (afterIndex, type) => {
        const nb = { id: uid(), type, content: "", position: afterIndex + 1 };
        const updated = [...blocks];
        updated.splice(afterIndex + 1, 0, nb);
        setBlocks(updated.map((b, i) => ({ ...b, position: i })));
    };
    const deleteBlock = (id) => {
        if (blocks.length === 1) return;
        setBlocks(blocks.filter(b => b.id !== id).map((b, i) => ({ ...b, position: i })));
    };
    const updateBlock = (id, content) => setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    const moveBlock   = (index, dir) => {
        const arr = [...blocks]; const t = index + dir;
        if (t < 0 || t >= arr.length) return;
        [arr[index], arr[t]] = [arr[t], arr[index]];
        setBlocks(arr.map((b, i) => ({ ...b, position: i })));
    };

    const handleSave = async () => {
        if (!title.trim()) { setError("Title is required."); return; }
        setSaving(true); setError("");
        try {
            await onSave({ title, blocks: blocks.map((b, i) => ({ ...b, position: i })) });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Save failed.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <button onClick={onCancel} className="flex items-center gap-2 text-zinc-400 hover:text-red-700 text-sm mb-8 transition-colors font-medium">
                <Ic d={ICONS.back} size={14} /> Back to News
            </button>

            {/* Red top accent — matches your site's style */}
            <div className="h-1 w-16 bg-gradient-to-r from-red-700 to-amber-500 rounded-full mb-6" />

            <h1 className="text-2xl font-bold text-zinc-800 mb-6">
                {initial ? "Edit Article" : "Create New Article"}
            </h1>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm mb-6">{error}</div>
            )}

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title…"
                className="w-full border-none outline-none text-2xl font-bold text-zinc-800 mb-6 border-b-2 border-zinc-100 focus:border-amber-400 pb-3 placeholder:text-zinc-200 transition-colors"
            />

            <AddBlockRow onAdd={(type) => addBlock(-1, type)} />

            {blocks.map((block, i) => (
                <BlockCell key={block.id} block={block} index={i} total={blocks.length}
                    onChange={updateBlock} onDelete={deleteBlock} onMove={moveBlock} onAddAfter={addBlock} />
            ))}

            <div className="flex gap-3 mt-8">
                <button onClick={handleSave} disabled={saving || !title.trim()}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${success ? "bg-green-600 text-white" : title.trim() ? "bg-red-700 hover:bg-red-800 text-white" : "bg-zinc-100 text-zinc-300 cursor-not-allowed"}`}>
                    {saving ? "Saving…" : success ? <><Ic d={ICONS.check} size={14} /> Saved!</> : <><Ic d={ICONS.save} size={14} /> {initial ? "Update Article" : "Publish Article"}</>}
                </button>
                <button onClick={onCancel} className="px-5 py-2.5 bg-white border border-zinc-200 rounded-lg text-zinc-500 text-sm hover:border-zinc-300 hover:text-zinc-700 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
}

// ── Article Card (Public) ─────────────────────────────────────────────────────
function ArticleCard({ article, onOpen, isAdmin, onEdit, onDelete }) {
    const preview = article.blocks?.find(b => b.type === "image");
    const textPreview = article.blocks?.find(b => b.type === "text");

    return (
        <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
            {preview && (
                <div className="h-48 overflow-hidden bg-zinc-50">
                    <img src={preview.content} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
            )}
            <div className="p-6">
                {/* Red accent line — matches your site */}
                <div className="w-8 h-0.5 bg-gradient-to-r from-red-700 to-amber-500 mb-3" />

                <p className="text-xs text-zinc-400 font-mono mb-2">
                    {new Date(article.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <h3 className="font-bold text-zinc-800 text-lg mb-2 leading-tight group-hover:text-red-700 transition-colors">
                    {article.title}
                </h3>
                {textPreview && (
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-4">
                        {textPreview.content}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <button onClick={() => onOpen(article)}
                        className="text-sm font-semibold text-red-700 hover:text-amber-600 transition-colors flex items-center gap-1">
                        Read more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Admin controls on card */}
                    {isAdmin && (
                        <div className="flex gap-1">
                            <button onClick={() => onEdit(article)}
                                className="p-1.5 rounded-lg text-zinc-300 hover:text-amber-600 hover:bg-amber-50 transition-all" title="Edit">
                                <Ic d={ICONS.edit} size={14} />
                            </button>
                            <button onClick={() => onDelete(article.id)}
                                className="p-1.5 rounded-lg text-zinc-300 hover:text-red-600 hover:bg-red-50 transition-all" title="Delete">
                                <Ic d={ICONS.trash} size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Full Article View ─────────────────────────────────────────────────────────
function ArticleView({ article, onBack }) {
    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-red-700 text-sm mb-8 transition-colors font-medium">
                <Ic d={ICONS.back} size={14} /> Back to News
            </button>
            <div className="h-1 w-16 bg-gradient-to-r from-red-700 to-amber-500 rounded-full mb-6" />
            <p className="text-xs text-zinc-400 font-mono mb-3">
                {new Date(article.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 leading-tight mb-10">
                {article.title}
            </h1>
            <div className="flex flex-col gap-7">
                {[...article.blocks].sort((a, b) => a.position - b.position).map((block) =>
                    block.type === "text"
                        ? <p key={block.id} className="text-zinc-600 leading-relaxed text-base">{block.content}</p>
                        : <div key={block.id} className="rounded-2xl overflow-hidden shadow-sm">
                            <img src={block.content} alt="" className="w-full object-cover" />
                          </div>
                )}
            </div>
        </div>
    );
}

// ── Main NewsPage ─────────────────────────────────────────────────────────────
export default function NewsPage() {
    const { admin } = useAuth();
    const [articles, setArticles] = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [view,     setView]     = useState("list"); // "list" | "article" | "create" | "edit"
    const [selected, setSelected] = useState(null);
    const [editing,  setEditing]  = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try { const { data } = await newsAPI.getAll(); setArticles(data); }
        catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleCreate = async (payload) => { await newsAPI.create(payload); await load(); setView("list"); };
    const handleUpdate = async (payload) => { await newsAPI.update(editing.id, payload); await load(); setView("list"); setEditing(null); };
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this article?")) return;
        await newsAPI.delete(id); await load();
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-20">

            {/* Page Header */}
            {view === "list" && (
                <div className="bg-white border-b border-zinc-100">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <div className="h-1 w-12 bg-gradient-to-r from-red-700 to-amber-500 rounded-full mb-5" />
                        <div className="flex items-end justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-zinc-800 tracking-tight">Latest News</h1>
                                <p className="text-zinc-400 mt-2 text-sm">Stay up to date with our latest updates</p>
                            </div>
                            {/* Admin: Create button */}
                            {admin && (
                                <button onClick={() => setView("create")}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
                                    <Ic d={ICONS.plus} size={14} />
                                    New Article
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6">
                {view === "list" && (
                    <div className="py-10">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1,2,3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-zinc-100" />
                                ))}
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center py-24">
                                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-zinc-300">
                                    <Ic d={ICONS.text} size={28} />
                                </div>
                                <p className="text-zinc-400 font-medium">No articles yet</p>
                                {admin && (
                                    <button onClick={() => setView("create")}
                                        className="mt-4 px-5 py-2 bg-red-700 text-white text-sm font-semibold rounded-xl hover:bg-red-800 transition-colors">
                                        Create first article
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.map(article => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        onOpen={(a) => { setSelected(a); setView("article"); }}
                                        isAdmin={!!admin}
                                        onEdit={(a) => { setEditing(a); setView("edit"); }}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {view === "article" && selected && (
                    <ArticleView article={selected} onBack={() => setView("list")} />
                )}

                {view === "create" && admin && (
                    <ArticleEditor onSave={handleCreate} onCancel={() => setView("list")} />
                )}

                {view === "edit" && editing && admin && (
                    <ArticleEditor initial={editing} onSave={handleUpdate} onCancel={() => { setView("list"); setEditing(null); }} />
                )}
            </div>
        </div>
    );
}
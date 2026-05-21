import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminBar() {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!admin) return null;

    const isNews     = location.pathname === "/newsPage";
    const isProducts = location.pathname === "/adminProducts";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-zinc-900 border-t-2 border-amber-500 shadow-2xl">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">Admin Mode</span>
                </div>
                <span className="text-xs text-zinc-400 hidden sm:block">
                    Logged in as <span className="text-zinc-200 font-medium">{admin.username}</span>
                </span>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => navigate("/newsPage")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${isNews ? "bg-amber-500 text-zinc-900" : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-amber-400 hover:border-amber-500/50"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
                    News
                </button>
                <button onClick={() => navigate("/adminProducts")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${isProducts ? "bg-amber-500 text-zinc-900" : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-amber-400 hover:border-amber-500/50"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
                    Products
                </button>
                <button onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-red-900/50 border border-zinc-700 hover:border-red-700/50 text-zinc-400 hover:text-red-400 text-xs font-medium rounded-lg transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                    Sign out
                </button>
            </div>
        </div>
    );
}
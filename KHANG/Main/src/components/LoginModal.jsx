import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Ic = ({ d, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

const ICONS = {
    eye:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    eyeOff: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22",
    lock:   "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    close:  "M18 6L6 18M6 6l12 12",
    alert:  "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
};

export default function LoginModal({ onClose }) {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd,  setShowPwd]  = useState(false);
    const [error,    setError]    = useState("");
    const [loading,  setLoading]  = useState(false);
    const usernameRef = useRef(null);

    useEffect(() => {
        usernameRef.current?.focus();
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password) { setError("Both fields are required."); return; }
        setError(""); setLoading(true);
        try {
            await login(username.trim(), password);
            onClose();
        } catch (err) {
            // Change this line in handleSubmit:
           setError(err.message || "Login failed. Check your credentials.");
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 border border-stone-100">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-300 hover:text-zinc-500 transition-colors"
                >
                    <Ic d={ICONS.close} size={18} />
                </button>

                {/* Header */}
                <div className="text-center mb-7">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-red-50 border border-red-100 text-red-600 mb-4">
                        <Ic d={ICONS.lock} size={18} />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-800 tracking-tight">Admin Sign In</h2>
                    <p className="text-xs text-zinc-400 mt-1">Restricted access only</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 mb-5 text-red-600 text-sm">
                        <Ic d={ICONS.alert} size={14} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                            Username
                        </label>
                        <input
                            ref={usernameRef}
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(""); }}
                            placeholder="admin"
                            disabled={loading}
                            spellCheck={false}
                            className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-zinc-300 disabled:opacity-50"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPwd ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                placeholder="••••••••"
                                disabled={loading}
                                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 pr-10 text-sm text-zinc-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-zinc-300 disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd(!showPwd)}
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 transition-colors"
                            >
                                <Ic d={showPwd ? ICONS.eyeOff : ICONS.eye} size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-red-700 hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="animate-spin">
                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                </svg>
                                Verifying…
                            </>
                        ) : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authAPI } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin]       = useState(null);
  const [checking, setChecking] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { setChecking(false); return; }

    authAPI.me()
      .then(({ data }) => setAdmin(data.admin))
      .catch(() => localStorage.removeItem("access_token"))
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    const handler = () => { setAdmin(null); };
    window.addEventListener("auth:logout", handler);
    return () => window.removeEventListener("auth:logout", handler);
  }, []);

  const login = useCallback(async (username, password) => {
    const { data } = await authAPI.login({ username, password });
    localStorage.setItem("access_token", data.accessToken);
    setToken(data.accessToken);  // ← this is missing
    setAdmin(data.admin);
    return data.admin;
  }, []);

  const logout = useCallback(async () => {
    try { await authAPI.logout(); } catch (_) {}
    localStorage.removeItem("access_token");
    setToken(null);  // ← add this
    setAdmin(null);
  }, []);
  return (
    <AuthContext.Provider value={{ admin,token, login, logout, checking }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
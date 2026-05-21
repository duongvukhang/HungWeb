import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

let refreshing = false;
let pendingQueue = [];

const flushQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  pendingQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const data = err.response?.data;

    if (err.response?.status === 401 && data?.error === "TOKEN_EXPIRED" && !original._retry) {
      original._retry = true;

      if (refreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers["Authorization"] = `Bearer ${token}`;
          return api(original);
        });
      }

      refreshing = true;
      try {
        const { data: refreshData } = await api.post("/auth/refresh");
        const newToken = refreshData.accessToken;
        localStorage.setItem("access_token", newToken);
        flushQueue(null, newToken);
        original.headers["Authorization"] = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshErr) {
        flushQueue(refreshErr);
        localStorage.removeItem("access_token");
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(refreshErr);
      } finally {
        refreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export const authAPI = {

  login:   (credentials) => api.post("/auth/login", credentials),
  logout:  ()            => api.post("/auth/logout"),
  me:      ()            => api.get("/auth/me"),
  refresh: ()            => api.post("/auth/refresh"),
};

export const newsAPI = {
  getAll:  ()            => api.get("/news"),
  getOne:  (id)          => api.get(`/news/${id}`),
  create:  (payload)     => api.post("/news", payload),
  update:  (id, payload) => api.put(`/news/${id}`, payload),
  delete:  (id)          => api.delete(`/news/${id}`),
};

export default api;
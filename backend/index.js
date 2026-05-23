require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const productsRoutes = require("./routes/Features");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const contactRoutes = require("./contactForm");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },   // ← This fixes your image error!
  contentSecurityPolicy: false,                            // Optional: disable if you have issues with inline styles
}));

const allowedOrigins = [
  "http://localhost:5173",
  "https://hungwebdemo.netlify.app",
  "https://hung-web-294j.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Static files for product images ───────────────────────────────────────────
app.use('/ProductImage',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(__dirname, 'ProductsImage'), { maxAge: '1d', etag: true })
);

// ── Routes ─────────────────────────z───────────────────────────────────────────
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok", timestamp: new Date() }));

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "NOT_FOUND" }));

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Products: http://localhost:${PORT}/api/products`);
  console.log(`📍 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`📍 News: http://localhost:${PORT}/api/news`);
  console.log("Serving images from:", path.join(__dirname, 'ProductsImage'));
});

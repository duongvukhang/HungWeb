const express = require("express");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const db = require("../db");
const { signAccessToken, signRefreshToken, verifyToken } = require("../jwt");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "TOO_MANY_REQUESTS", message: "Too many login attempts. Try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "MISSING_FIELDS", message: "Username and password are required." });
  }

  try {
    const { rows } = await db.query(
      "SELECT id, username, password FROM admins WHERE LOWER(username) = LOWER($1)",
        [username.trim()]
    );

    const admin = rows[0];
    const dummyHash = "$2b$12$invalidsaltinvalidhashXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    console.log("DB Admin Found:", admin ? "YES" : "NO");
    if (admin) {
      console.log("Input Username:", `"${username.trim()}"`);
      console.log("DB Username:", `"${admin.username}"`);
    }
    const isValid = await bcrypt.compare(password, admin?.password ?? dummyHash);

    if (!admin || !isValid) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS", message: "Invalid username or password." });
    }

    const payload = { id: admin.id, username: admin.username, role: "admin" };
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.query(
      "INSERT INTO refresh_tokens (admin_id, token, expires_at) VALUES ($1, $2, $3)",
      [admin.id, refreshToken, expiresAt]
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in prod!
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth",
    });

    return res.json({
      accessToken,
      admin: { id: admin.id, username: admin.username, role: "admin" },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "SERVER_ERROR", message: "An unexpected error occurred." });
  }
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ error: "NO_REFRESH_TOKEN" });

  try {
    const decoded = verifyToken(token);
    const { rows } = await db.query(
      "SELECT id, admin_id FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()",
      [token]
    );

    if (!rows.length) {
      return res.status(401).json({ error: "REFRESH_TOKEN_INVALID_OR_EXPIRED" });
    }

    const payload = { id: decoded.id, username: decoded.username, role: "admin" };
    const newAccessToken = signAccessToken(payload);
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ error: "INVALID_REFRESH_TOKEN" });
  }
});

router.post("/logout", requireAuth, async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (token) {
    await db.query("DELETE FROM refresh_tokens WHERE token = $1", [token]).catch(() => {});
  }
  res.clearCookie("refresh_token", { path: "/api/auth" });
  return res.json({ message: "Logged out successfully." });
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, username, created_at FROM admins WHERE id = $1",
      [req.admin.id]
    );
    if (!rows.length) return res.status(404).json({ error: "ADMIN_NOT_FOUND" });
    return res.json({ admin: { ...rows[0], role: "admin" } });
  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
});

module.exports = router;
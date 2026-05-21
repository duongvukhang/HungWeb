const { verifyToken } = require("../jwt");

function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "NO_TOKEN", message: "Authorization header missing." });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "MALFORMED_TOKEN", message: "Use 'Bearer <token>' format." });
  }

  const token = parts[1];

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "FORBIDDEN", message: "Insufficient privileges." });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "TOKEN_EXPIRED", message: "Access token has expired." });
    }
    return res.status(401).json({ error: "INVALID_TOKEN", message: "Token verification failed." });
  }
}

module.exports = { requireAuth };
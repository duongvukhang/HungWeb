const express = require("express");
const db = require("../db");                    // ← fixed: no .js extension
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// ==================== MULTER CONFIG ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../ProductsImage");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `product_${Date.now()}${ext}`);        // always lowercase + timestamp
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// ==================== ROUTES ====================
router.get("/featured", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC LIMIT 6");
    res.json({ products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load featured products" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json({ products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products WHERE id = $1", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Not found" });
    res.json({ product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Protected routes
router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  console.log('req.body:', req.body); // ← ADD THIS
  const { name, description = "", category_id, price, system_structure = "", technical_performance = "", custom_options = "" } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const image_url = req.file ? `/ProductImage/${req.file.filename}` : null;

  try {
    const result = await db.query(
      `INSERT INTO products (name, description, image_url, category_id, price, system_structure, technical_performance, custom_options)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, description, image_url, category_id || null, price || null, system_structure, technical_performance, custom_options]
    );
    res.status(201).json({ product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.put("/:id", requireAuth, upload.single("image"), async (req, res) => {
  const { name, description, category_id, price, system_structure, technical_performance, custom_options } = req.body;
  const { id } = req.params;

  try {
    const existing = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    if (!existing.rows.length) return res.status(404).json({ error: "Not found" });

    const old = existing.rows[0];
    let image_url = old.image_url;

    if (req.file) {
      // Delete old image if exists
      if (old.image_url) {
        const oldPath = path.join(__dirname, "../ProductsImage", path.basename(old.image_url));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image_url = `/ProductImage/${req.file.filename}`;
    }

    const result = await db.query(
      `UPDATE products
       SET name=$1, description=$2, image_url=$3, category_id=$4, price=$5,
           system_structure=$6, technical_performance=$7, custom_options=$8
       WHERE id=$9 RETURNING *`,
      [name || old.name, description ?? old.description, image_url,
       category_id ?? old.category_id, price ?? old.price,
       system_structure ?? old.system_structure,
       technical_performance ?? old.technical_performance,
       custom_options ?? old.custom_options, id]
    );
    res.json({ product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const existing = await db.query("SELECT * FROM products WHERE id = $1", [req.params.id]);
    if (!existing.rows.length) return res.status(404).json({ error: "Not found" });

    const product = existing.rows[0];

    // Delete physical image
    if (product.image_url?.includes("product_")) {
      const imgPath = path.join(__dirname, "../ProductsImage", path.basename(product.image_url));
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await db.query("DELETE FROM products WHERE id = $1", [req.params.id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
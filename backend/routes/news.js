const express = require("express");
const db = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows: articles } = await db.query(
      "SELECT id, title, created_at, updated_at FROM news ORDER BY created_at DESC"
    );

    if (!articles.length) return res.json([]);

    const ids = articles.map((a) => a.id);
    const { rows: blocks } = await db.query(
      `SELECT id, news_id, type, content, position
       FROM blocks WHERE news_id = ANY($1::int[])
       ORDER BY news_id, position`,
      [ids]
    );

    const blockMap = {};
    blocks.forEach((b) => {
      if (!blockMap[b.news_id]) blockMap[b.news_id] = [];
      blockMap[b.news_id].push(b);
    });

    const result = articles.map((a) => ({ ...a, blocks: blockMap[a.id] || [] }));
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM news WHERE id = $1", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });

    const { rows: blocks } = await db.query(
      "SELECT * FROM blocks WHERE news_id = $1 ORDER BY position",
      [req.params.id]
    );

    return res.json({ ...rows[0], blocks });
  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const { title, blocks = [] } = req.body;
  if (!title?.trim()) {
    return res.status(400).json({ error: "MISSING_TITLE" });
  }

  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      "INSERT INTO news (title) VALUES ($1) RETURNING *",
      [title.trim()]
    );
    const article = rows[0];

    if (blocks.length) {
      for (const [i, b] of blocks.entries()) {
        await client.query(
          "INSERT INTO blocks (news_id, type, content, position) VALUES ($1, $2, $3, $4)",
          [article.id, b.type, b.content ?? "", b.position ?? i]
        );
      }
    }

    await client.query("COMMIT");

    const { rows: savedBlocks } = await db.query(
      "SELECT * FROM blocks WHERE news_id = $1 ORDER BY position",
      [article.id]
    );

    return res.status(201).json({ ...article, blocks: savedBlocks });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
  } finally {
    client.release();
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { title, blocks = [] } = req.body;
  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");

    if (title?.trim()) {
      await client.query("UPDATE news SET title = $1 WHERE id = $2", [title.trim(), req.params.id]);
    }

    await client.query("DELETE FROM blocks WHERE news_id = $1", [req.params.id]);

    for (const [i, b] of blocks.entries()) {
      await client.query(
        "INSERT INTO blocks (news_id, type, content, position) VALUES ($1, $2, $3, $4)",
        [req.params.id, b.type, b.content ?? "", b.position ?? i]
      );
    }

    await client.query("COMMIT");

    const { rows } = await db.query("SELECT * FROM news WHERE id = $1", [req.params.id]);
    const { rows: savedBlocks } = await db.query(
      "SELECT * FROM blocks WHERE news_id = $1 ORDER BY position",
      [req.params.id]
    );

    return res.json({ ...rows[0], blocks: savedBlocks });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({ error: "SERVER_ERROR" });
  } finally {
    client.release();
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { rowCount } = await db.query("DELETE FROM news WHERE id = $1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "NOT_FOUND" });
    return res.json({ message: "Deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
});

module.exports = router;
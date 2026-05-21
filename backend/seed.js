require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("./db");

async function seed() {
  const username = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "chronicle2026";

  const hash = await bcrypt.hash(password, 12);
  if (!password) {
    console.error("❌ ADMIN_PASSWORD environment variable is not set.");
    process.exit(1);
  }
  await db.query(
    `INSERT INTO admins (username, password)
     VALUES ($1, $2)
     ON CONFLICT (username) DO NOTHING`,  // ← don't overwrite, just skip
    [username, hash]
  );

  console.log(`✅ Admin seeded: username="${username}"`);
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
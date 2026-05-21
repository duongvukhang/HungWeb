require("dotenv").config();
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const readline = require("readline");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function main() {
  console.log("\n🔐 Admin Credential Manager\n");

  const username = await ask("New username (press Enter to keep current): ");
  const password = await ask("New password (press Enter to keep current): ");

  if (!username.trim() && !password.trim()) {
    console.log("Nothing changed.");
    rl.close();
    pool.end();
    return;
  }

  const updates = [];
  const values  = [];
  let i = 1;

  if (username.trim()) {
    updates.push(`username = $${i++}`);
    values.push(username.trim());
  }

  if (password.trim()) {
    if (password.trim().length < 8) {
      console.log("❌ Password must be at least 8 characters.");
      rl.close();
      pool.end();
      return;
    }
    const hash = await bcrypt.hash(password.trim(), 12);
    updates.push(`password = $${i++}`);
    values.push(hash);
  }

  values.push(1); // admin id
  await pool.query(
    `UPDATE admins SET ${updates.join(", ")} WHERE id = $${i}`,
    values
  );

  console.log("\n✅ Credentials updated successfully!");
  console.log("   Remember your new credentials — they are not stored anywhere.");
  rl.close();
  pool.end();
}

main().catch((err) => {
  console.error("Error:", err.message);
  rl.close();
  pool.end();
});
require("dotenv").config();
const { Pool } = require("pg");

console.log("Reading connection from string:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function diagnostic() {
  try {
    // 1. Check current database context name
    const currentDbRes = await pool.query("SELECT current_database(), current_user;");
    console.log("\n================ DIAGNOSTIC INFO ================");
    console.log(`Connected to Database: "${currentDbRes.rows[0].current_database}"`);
    console.log(`Connected as User:      "${currentDbRes.rows[0].current_user}"`);

    // 2. List all tables available to this connection
    const tablesRes = await pool.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
      ORDER BY table_name;
    `);

    console.log("\nTables actually visible to this app connection:");
    if (tablesRes.rows.length === 0) {
      console.log("❌ ZERO TABLES FOUND! The database is completely empty.");
    } else {
      tablesRes.rows.forEach(row => {
        console.log(`   - [Schema: ${row.table_schema}] Table Name: "${row.table_name}"`);
      });
    }
    console.log("=================================================\n");

  } catch (err) {
    console.error("❌ Diagnostic query failed entirely:", err.message);
  } finally {
    await pool.end();
  }
}

diagnostic();
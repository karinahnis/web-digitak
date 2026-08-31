const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function inspectDatabase() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "123456",
      database: process.env.DB_NAME || "web_digitak"
    });
    
    const [tables] = await conn.query("SHOW TABLES;");
    console.log("=== LIVE TABLES IN web_digitak ===");
    for (const t of tables) {
      const tableName = Object.values(t)[0];
      console.log(`\n--- TABLE: ${tableName} ---`);
      const [cols] = await conn.query(`DESCRIBE \`${tableName}\`;`);
      cols.forEach(c => {
        console.log(`  ${c.Field} | ${c.Type} | Null:${c.Null} | Key:${c.Key} | Default:${c.Default} | Extra:${c.Extra}`);
      });
    }
    await conn.end();
  } catch (err) {
    console.error("Error inspecting database:", err);
  }
}

inspectDatabase();

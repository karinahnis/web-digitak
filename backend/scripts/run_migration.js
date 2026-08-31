const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function runMigration() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "123456",
      database: process.env.DB_NAME || "web_digitak",
    });

    console.log("Connected to web_digitak database for migration...");

    // Helper to add column if not exists
    const addCol = async (table, colDef) => {
      try {
        await conn.query(`ALTER TABLE \`${table}\` ADD COLUMN ${colDef}`);
        console.log(`Added column to ${table}: ${colDef}`);
      } catch (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          console.log(`Column in ${table} already exists.`);
        } else {
          console.error(`Error adding column to ${table}:`, err.message);
        }
      }
    };

    await addCol("layanan", "status TINYINT DEFAULT 1");
    await addCol("testimoni", "status TINYINT DEFAULT 1");
    await addCol("portofolio", "status TINYINT DEFAULT 1");
    await addCol("pesan_kontak", "read_at TIMESTAMP NULL");
    await addCol("pesan_kontak", "read_by INT NULL");
    await addCol("nilai_nilai", "deleted_at TIMESTAMP NULL");

    // Ensure admin user exists with bcrypt password
    const [admins] = await conn.query("SELECT * FROM admins WHERE email = 'admin@company.com' OR username = 'admin01'");
    const hashedPassword = await bcrypt.hash("Passw0rd!", 10);

    if (admins.length === 0) {
      await conn.query(
        "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)",
        ["admin01", "admin@company.com", hashedPassword]
      );
      console.log("Created admin user admin@company.com with password 'Passw0rd!'");
    } else {
      await conn.query(
        "UPDATE admins SET password = ? WHERE id = ?",
        [hashedPassword, admins[0].id]
      );
      console.log(`Updated password for admin user ID ${admins[0].id} to 'Passw0rd!'`);
    }

    await conn.end();
    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

runMigration();

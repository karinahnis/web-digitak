const pool = require("../config/database");

const findAdminByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM admins WHERE email = ? LIMIT 1", [email]);
  return rows[0];
};

const findAdminById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, username, email, created_at, updated_at FROM admins WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
};

module.exports = {
  findAdminByEmail,
  findAdminById,
};

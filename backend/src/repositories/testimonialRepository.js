const pool = require("../config/database");

const getAllTestimonials = async () => {
  const [rows] = await pool.query(
    "SELECT id, nama_klien, foto, rating, kutipan, status, created_at FROM testimoni ORDER BY id DESC"
  );
  return rows;
};

const createTestimonial = async ({ nama_klien, foto, rating, kutipan }) => {
  const [result] = await pool.query(
    "INSERT INTO testimoni (nama_klien, foto, rating, kutipan, status) VALUES (?, ?, ?, ?, 1)",
    [nama_klien, foto || null, rating, kutipan || null]
  );
  return result.insertId;
};

const toggleStatus = async (id) => {
  const [result] = await pool.query(
    "UPDATE testimoni SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  toggleStatus,
};

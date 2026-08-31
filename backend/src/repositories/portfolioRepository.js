const pool = require("../config/database");

const getAllPortfolios = async ({ kategori, search, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  let query = "SELECT id, judul_proyek, klien, deskripsi, kategori, gambar, status, created_at FROM portofolio";
  let countQuery = "SELECT COUNT(*) as total FROM portofolio";
  const conditions = [];
  const params = [];

  if (kategori) {
    conditions.push("kategori LIKE ?");
    params.push(`%${kategori}%`);
  }

  if (search) {
    conditions.push("(judul_proyek LIKE ? OR deskripsi LIKE ? OR klien LIKE ?)");
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  if (conditions.length > 0) {
    const whereClause = " WHERE " + conditions.join(" AND ");
    query += whereClause;
    countQuery += whereClause;
  }

  query += " ORDER BY id DESC LIMIT ? OFFSET ?";
  const queryParams = [...params, parseInt(limit, 10), parseInt(offset, 10)];

  const [rows] = await pool.query(query, queryParams);
  const [countResult] = await pool.query(countQuery, params);

  return {
    data: rows,
    total: countResult[0].total,
  };
};

const getPortfolioById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, judul_proyek, klien, deskripsi, kategori, gambar, status, created_at, updated_at FROM portofolio WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
};

const createPortfolio = async (data, adminId) => {
  const { judul_proyek, klien, deskripsi, kategori, gambar } = data;
  const [result] = await pool.query(
    "INSERT INTO portofolio (judul_proyek, klien, deskripsi, kategori, gambar, updated_by, status) VALUES (?, ?, ?, ?, ?, ?, 1)",
    [judul_proyek, klien || null, deskripsi || null, kategori || null, gambar || null, adminId]
  );
  return result.insertId;
};

const updatePortfolio = async (id, data, adminId) => {
  const { judul_proyek, klien, deskripsi, kategori, gambar } = data;
  const [result] = await pool.query(
    `UPDATE portofolio 
     SET judul_proyek = ?, klien = ?, deskripsi = ?, kategori = ?, gambar = ?, updated_by = ?
     WHERE id = ?`,
    [judul_proyek, klien || null, deskripsi || null, kategori || null, gambar || null, adminId, id]
  );
  return result.affectedRows;
};

const toggleStatus = async (id) => {
  const [result] = await pool.query(
    "UPDATE portofolio SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  toggleStatus,
};

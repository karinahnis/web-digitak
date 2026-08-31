const pool = require("../config/database");

const getAllServices = async ({ page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;
  let query = "SELECT id, nama_layanan, deskripsi_singkat, deskripsi_detail, ikon, status, created_at FROM layanan";
  let countQuery = "SELECT COUNT(*) as total FROM layanan";
  const params = [];
  const countParams = [];

  if (search) {
    query += " WHERE nama_layanan LIKE ? OR deskripsi_singkat LIKE ?";
    countQuery += " WHERE nama_layanan LIKE ? OR deskripsi_singkat LIKE ?";
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern);
    countParams.push(searchPattern, searchPattern);
  }

  query += " ORDER BY id DESC LIMIT ? OFFSET ?";
  params.push(parseInt(limit, 10), parseInt(offset, 10));

  const [rows] = await pool.query(query, params);
  const [countResult] = await pool.query(countQuery, countParams);

  return {
    data: rows,
    total: countResult[0].total,
  };
};

const getServiceById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, nama_layanan, deskripsi_singkat, deskripsi_detail, ikon, status, created_at, updated_at FROM layanan WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
};

const createService = async (data, adminId) => {
  const { nama_layanan, deskripsi_singkat, deskripsi_detail, ikon } = data;
  const [result] = await pool.query(
    "INSERT INTO layanan (nama_layanan, deskripsi_singkat, deskripsi_detail, ikon, updated_by, status) VALUES (?, ?, ?, ?, ?, 1)",
    [nama_layanan, deskripsi_singkat, deskripsi_detail, ikon, adminId]
  );
  return result.insertId;
};

const updateService = async (id, data, adminId) => {
  const { nama_layanan, deskripsi_singkat, deskripsi_detail, ikon } = data;
  const [result] = await pool.query(
    `UPDATE layanan 
     SET nama_layanan = ?, deskripsi_singkat = ?, deskripsi_detail = ?, ikon = ?, updated_by = ?
     WHERE id = ?`,
    [nama_layanan, deskripsi_singkat, deskripsi_detail, ikon, adminId, id]
  );
  return result.affectedRows;
};

const toggleServiceStatus = async (id) => {
  const [result] = await pool.query(
    "UPDATE layanan SET status = CASE WHEN status = 1 THEN 0 ELSE 1 END WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  toggleServiceStatus,
};

const pool = require("../config/database");

const createMessage = async ({ nama, email, perusahaan, pesan }) => {
  const [result] = await pool.query(
    "INSERT INTO pesan_kontak (nama, email, perusahaan, pesan, status) VALUES (?, ?, ?, ?, 'pending')",
    [nama, email, perusahaan || null, pesan]
  );
  return result.insertId;
};

const getAllMessages = async ({ status, is_read, search, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  let query = "SELECT id, nama, email, perusahaan, pesan, status, read_at, read_by, created_at FROM pesan_kontak";
  let countQuery = "SELECT COUNT(*) as total FROM pesan_kontak";
  const conditions = [];
  const params = [];

  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }

  if (is_read !== undefined && is_read !== null) {
    if (is_read === "true" || is_read === true) {
      conditions.push("read_at IS NOT NULL");
    } else if (is_read === "false" || is_read === false) {
      conditions.push("read_at IS NULL");
    }
  }

  if (search) {
    conditions.push("(nama LIKE ? OR email LIKE ? OR perusahaan LIKE ? OR pesan LIKE ?)");
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  if (conditions.length > 0) {
    const whereClause = " WHERE " + conditions.join(" AND ");
    query += whereClause;
    countQuery += whereClause;
  }

  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  const queryParams = [...params, parseInt(limit, 10), parseInt(offset, 10)];

  const [rows] = await pool.query(query, queryParams);
  const [countResult] = await pool.query(countQuery, params);

  return {
    data: rows,
    total: countResult[0].total,
  };
};

const getMessageById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, nama, email, perusahaan, pesan, status, read_at, read_by, created_at FROM pesan_kontak WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
};

const updateStatus = async (id, status) => {
  const [result] = await pool.query(
    "UPDATE pesan_kontak SET status = ? WHERE id = ?",
    [status, id]
  );
  return result.affectedRows;
};

const markAsRead = async (id, adminId) => {
  const [result] = await pool.query(
    "UPDATE pesan_kontak SET read_at = CURRENT_TIMESTAMP, read_by = ? WHERE id = ?",
    [adminId, id]
  );
  return result.affectedRows;
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateStatus,
  markAsRead,
};

const pool = require("../config/database");

const getCompanyInfo = async () => {
  const [rows] = await pool.query("SELECT * FROM info_perusahaan LIMIT 1");
  return rows[0];
};

const getCompanyValues = async (companyInfoId) => {
  const [rows] = await pool.query(
    "SELECT id, judul, deskripsi FROM nilai_nilai WHERE info_perusahaan_id = ? AND deleted_at IS NULL",
    [companyInfoId]
  );
  return rows;
};

const updateCompanyInfo = async (id, data, adminId) => {
  const { tentang_kami, visi, misi, email, telepon, alamat } = data;
  await pool.query(
    `UPDATE info_perusahaan 
     SET tentang_kami = ?, visi = ?, misi = ?, email = ?, telepon = ?, alamat = ?, updated_by = ?
     WHERE id = ?`,
    [tentang_kami, visi, misi, email, telepon, alamat, adminId, id]
  );
};

const createCompanyValue = async (companyInfoId, judul, deskripsi) => {
  const [result] = await pool.query(
    "INSERT INTO nilai_nilai (info_perusahaan_id, judul, deskripsi) VALUES (?, ?, ?)",
    [companyInfoId, judul, deskripsi]
  );
  return result.insertId;
};

const updateCompanyValue = async (valueId, judul, deskripsi) => {
  const [result] = await pool.query(
    "UPDATE nilai_nilai SET judul = ?, deskripsi = ? WHERE id = ? AND deleted_at IS NULL",
    [judul, deskripsi, valueId]
  );
  return result.affectedRows;
};

const softDeleteCompanyValue = async (valueId) => {
  const [result] = await pool.query(
    "UPDATE nilai_nilai SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
    [valueId]
  );
  return result.affectedRows;
};

module.exports = {
  getCompanyInfo,
  getCompanyValues,
  updateCompanyInfo,
  createCompanyValue,
  updateCompanyValue,
  softDeleteCompanyValue,
};

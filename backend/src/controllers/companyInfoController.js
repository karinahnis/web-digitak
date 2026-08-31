const companyInfoService = require("../services/companyInfoService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const getCompanyInfo = async (req, res) => {
  try {
    const data = await companyInfoService.getCompanyInfo();
    return sendSuccess(res, "Berhasil mengambil data", data);
  } catch (error) {
    return sendError(res, error.message || "Internal server error", null, error.statusCode || 500);
  }
};

const updateCompanyInfo = async (req, res) => {
  try {
    const adminId = req.user ? req.user.id : null;
    await companyInfoService.updateCompanyInfo(req.body, adminId);
    return sendSuccess(res, "Berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui info perusahaan", null, error.statusCode || 500);
  }
};

const addValue = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    await companyInfoService.addCompanyValue(judul, deskripsi);
    return sendSuccess(res, "Berhasil ditambahkan", null, 201);
  } catch (error) {
    return sendError(res, error.message || "Gagal menambahkan nilai perusahaan", null, error.statusCode || 500);
  }
};

const updateValue = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi } = req.body;
    await companyInfoService.updateCompanyValue(id, judul, deskripsi);
    return sendSuccess(res, "Berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui nilai perusahaan", null, error.statusCode || 500);
  }
};

const deleteValue = async (req, res) => {
  try {
    const { id } = req.params;
    await companyInfoService.deleteCompanyValue(id);
    return sendSuccess(res, "Berhasil dihapus");
  } catch (error) {
    return sendError(res, error.message || "Gagal menghapus nilai perusahaan", null, error.statusCode || 500);
  }
};

module.exports = {
  getCompanyInfo,
  updateCompanyInfo,
  addValue,
  updateValue,
  deleteValue,
};

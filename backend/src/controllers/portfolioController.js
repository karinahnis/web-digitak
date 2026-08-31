const portfolioService = require("../services/portfolioService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const getAllPortfolios = async (req, res) => {
  try {
    const result = await portfolioService.getAllPortfolios(req.query);
    return sendSuccess(res, "Berhasil mengambil data portofolio", result.data, 200, result.meta);
  } catch (error) {
    return sendError(res, error.message || "Gagal mengambil data portofolio", null, error.statusCode || 500);
  }
};

const getPortfolioById = async (req, res) => {
  try {
    const data = await portfolioService.getPortfolioById(req.params.id);
    return sendSuccess(res, "Berhasil mengambil detail portofolio", data);
  } catch (error) {
    return sendError(res, error.message || "Data tidak ditemukan", null, error.statusCode || 404);
  }
};

const createPortfolio = async (req, res) => {
  try {
    const adminId = req.user ? req.user.id : null;
    const payload = req.body;
    if (req.file) {
      payload.gambar = req.file.filename;
    }
    await portfolioService.createPortfolio(payload, adminId);
    return sendSuccess(res, "Berhasil ditambahkan", null, 201);
  } catch (error) {
    return sendError(res, error.message || "Gagal menambahkan portofolio", null, error.statusCode || 500);
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const adminId = req.user ? req.user.id : null;
    const payload = req.body;
    if (req.file) {
      payload.gambar = req.file.filename;
    }
    await portfolioService.updatePortfolio(req.params.id, payload, adminId);
    return sendSuccess(res, "Berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui portofolio", null, error.statusCode || 500);
  }
};

const toggleStatus = async (req, res) => {
  try {
    await portfolioService.toggleStatus(req.params.id);
    return sendSuccess(res, "Berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui status portofolio", null, error.statusCode || 500);
  }
};

module.exports = {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  toggleStatus,
};

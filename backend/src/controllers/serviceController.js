const serviceService = require("../services/serviceService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const getAllServices = async (req, res) => {
  try {
    const result = await serviceService.getAllServices(req.query);
    return sendSuccess(res, "Berhasil mengambil data layanan", result.data, 200, result.meta);
  } catch (error) {
    return sendError(res, error.message || "Gagal mengambil data layanan", null, error.statusCode || 500);
  }
};

const getServiceById = async (req, res) => {
  try {
    const data = await serviceService.getServiceById(req.params.id);
    return sendSuccess(res, "Berhasil mengambil detail layanan", data);
  } catch (error) {
    return sendError(res, error.message || "Layanan tidak ditemukan", null, error.statusCode || 404);
  }
};

const createService = async (req, res) => {
  try {
    const adminId = req.user ? req.user.id : null;
    await serviceService.createService(req.body, adminId);
    return sendSuccess(res, "Berhasil ditambahkan", null, 201);
  } catch (error) {
    return sendError(res, error.message || "Gagal menambahkan layanan", null, error.statusCode || 500);
  }
};

const updateService = async (req, res) => {
  try {
    const adminId = req.user ? req.user.id : null;
    await serviceService.updateService(req.params.id, req.body, adminId);
    return sendSuccess(res, "Berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui layanan", null, error.statusCode || 500);
  }
};

const toggleStatus = async (req, res) => {
  try {
    await serviceService.toggleServiceStatus(req.params.id);
    return sendSuccess(res, "Berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui status layanan", null, error.statusCode || 500);
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  toggleStatus,
};

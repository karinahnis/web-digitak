const testimonialService = require("../services/testimonialService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const getAllTestimonials = async (req, res) => {
  try {
    const data = await testimonialService.getAllTestimonials();
    return sendSuccess(res, "Berhasil mengambil data testimoni", data);
  } catch (error) {
    return sendError(res, error.message || "Gagal mengambil data testimoni", null, error.statusCode || 500);
  }
};

const createTestimonial = async (req, res) => {
  try {
    const payload = req.body;
    if (req.file) {
      payload.foto = req.file.filename;
    }
    await testimonialService.createTestimonial(payload);
    return sendSuccess(res, "Berhasil ditambahkan", null, 201);
  } catch (error) {
    return sendError(res, error.message || "Gagal menambahkan testimoni", null, error.statusCode || 500);
  }
};

const toggleStatus = async (req, res) => {
  try {
    await testimonialService.toggleStatus(req.params.id);
    return sendSuccess(res, "Berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui status testimoni", null, error.statusCode || 500);
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  toggleStatus,
};

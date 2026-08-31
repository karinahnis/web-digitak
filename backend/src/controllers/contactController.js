const contactService = require("../services/contactService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const createMessage = async (req, res) => {
  try {
    await contactService.createMessage(req.body);
    return sendSuccess(res, "Pesan berhasil dikirim", null, 201);
  } catch (error) {
    return sendError(res, error.message || "Gagal mengirim pesan", null, error.statusCode || 500);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const result = await contactService.getAllMessages(req.query);
    return sendSuccess(res, "Berhasil mengambil data pesan kontak", result.data, 200, result.meta);
  } catch (error) {
    return sendError(res, error.message || "Gagal mengambil data pesan kontak", null, error.statusCode || 500);
  }
};

const getMessageById = async (req, res) => {
  try {
    const data = await contactService.getMessageById(req.params.id);
    return sendSuccess(res, "Berhasil mengambil detail pesan kontak", data);
  } catch (error) {
    return sendError(res, error.message || "Pesan kontak tidak ditemukan", null, error.statusCode || 404);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await contactService.updateStatus(req.params.id, status);
    return sendSuccess(res, "Status berhasil diperbarui");
  } catch (error) {
    return sendError(res, error.message || "Gagal memperbarui status", null, error.statusCode || 500);
  }
};

const markAsRead = async (req, res) => {
  try {
    const adminId = req.user ? req.user.id : null;
    await contactService.markAsRead(req.params.id, adminId);
    return sendSuccess(res, "Pesan ditandai sudah dibaca");
  } catch (error) {
    return sendError(res, error.message || "Gagal menandai pesan", null, error.statusCode || 500);
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateStatus,
  markAsRead,
};

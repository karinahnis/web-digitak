const { sendError } = require("../utils/responseHelper");
const logger = require("../utils/logger");

/**
 * Middleware untuk menangani request ke endpoint yang tidak ada (404 Not Found)
 */
const notFoundHandler = (req, res, next) => {
  return sendError(res, `Route ${req.originalUrl} tidak ditemukan`, null, 404);
};

/**
 * Global Error Handling Middleware untuk menangkap semua kesalahan (500/Multer/Uncaught)
 */
const errorHandler = (err, req, res, next) => {
  logger.error("Unhandled Server Error:", err.message || err);

  // Menangani error bawaan Multer (Upload)
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return sendError(res, "Ukuran file terlalu besar! Maksimal 5MB.", null, 400);
    }
    return sendError(res, `Gagal mengunggah berkas: ${err.message}`, null, 400);
  }

  // Menangani custom error dari filter upload
  if (err.message && err.message.includes("Tipe file tidak didukung")) {
    return sendError(res, err.message, null, 400);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Terjadi kesalahan internal pada server";
  const errors = err.errors || null;

  return sendError(res, message, errors, statusCode);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};

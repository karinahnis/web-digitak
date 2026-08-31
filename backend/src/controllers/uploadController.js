const { sendSuccess, sendError } = require("../utils/responseHelper");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, "File gambar wajib diunggah", null, 400);
    }

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    return sendSuccess(res, "Berhasil diunggah", {
      url: fileUrl,
      path: req.file.filename,
    }, 201);
  } catch (error) {
    return sendError(res, error.message || "Gagal mengunggah gambar", null, error.statusCode || 500);
  }
};

module.exports = {
  uploadImage,
};

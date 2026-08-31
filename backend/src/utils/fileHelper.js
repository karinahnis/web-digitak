const fs = require("fs");
const path = require("path");

/**
 * Menghapus berkas fisik dari direktori uploads/ secara aman
 * @param {string} fileUrlOrPath - URL lengkap, path relatif, atau nama berkas
 */
const deleteUploadedFile = (fileUrlOrPath) => {
  if (!fileUrlOrPath) return;

  try {
    // Mengambil nama berkas dari URL atau path
    let filename = fileUrlOrPath;
    if (fileUrlOrPath.includes("/uploads/")) {
      filename = fileUrlOrPath.split("/uploads/").pop();
    } else if (fileUrlOrPath.includes("uploads\\")) {
      filename = fileUrlOrPath.split("uploads\\").pop();
    } else {
      filename = path.basename(fileUrlOrPath);
    }

    // Hindari path traversal attacks
    filename = path.basename(filename);

    const filePath = path.join(__dirname, "../../uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Gagal menghapus berkas (${fileUrlOrPath}):`, error.message);
  }
};

module.exports = {
  deleteUploadedFile,
};

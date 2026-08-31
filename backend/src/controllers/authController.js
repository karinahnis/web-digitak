const authService = require("../services/authService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    return sendSuccess(res, "Login berhasil", data);
  } catch (error) {
    return sendError(res, error.message || "Terjadi kesalahan saat login", error.errors || null, error.statusCode || 500);
  }
};

const me = async (req, res) => {
  try {
    const data = await authService.getProfile(req.user.id);
    return sendSuccess(res, "Berhasil mengambil data profil", data);
  } catch (error) {
    return sendError(res, error.message || "Terjadi kesalahan", null, error.statusCode || 500);
  }
};

const logout = async (req, res) => {
  return sendSuccess(res, "Logout berhasil");
};

module.exports = {
  login,
  me,
  logout,
};

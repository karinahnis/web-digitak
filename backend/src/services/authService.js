const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/authRepository");

const login = async (email, password) => {
  if (!email || !password) {
    throw { statusCode: 400, message: "Email dan password wajib diisi" };
  }

  const admin = await authRepository.findAdminByEmail(email);
  if (!admin) {
    throw { statusCode: 401, message: "Email atau password salah" };
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw { statusCode: 401, message: "Email atau password salah" };
  }

  const expiresIn = parseInt(process.env.JWT_EXPIRES_IN || "14400", 10);
  const secret = process.env.JWT_SECRET || "your_strong_random_secret_here_change_this_in_production";

  const token = jwt.sign(
    { id: admin.id, email: admin.email, username: admin.username },
    secret,
    { expiresIn }
  );

  return {
    token,
    expires_in: expiresIn,
  };
};

const getProfile = async (id) => {
  const admin = await authRepository.findAdminById(id);
  if (!admin) {
    throw { statusCode: 404, message: "Data admin tidak ditemukan" };
  }
  return admin;
};

module.exports = {
  login,
  getProfile,
};

const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/responseHelper");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return sendError(res, "Unauthorized — token tidak ditemukan", null, 401);
  }

  const secret = process.env.JWT_SECRET || "your_strong_random_secret_here_change_this_in_production";

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return sendError(res, "Unauthorized — token tidak valid atau kadaluwarsa", null, 401);
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  authenticateToken,
};

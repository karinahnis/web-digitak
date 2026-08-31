const rateLimit = require("express-rate-limit");

// Limiter umum untuk seluruh API (100 request / 15 menit)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Max 100 request per IP dalam windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak permintaan dari IP ini. Silakan coba lagi setelah 15 menit.",
  },
});

// Limiter khusus untuk Login (10 percobaan / 15 menit)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login gagal. Silakan coba lagi setelah 15 menit.",
  },
});

// Limiter khusus untuk pengiriman pesan kontak (5 pesan / 15 menit)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Anda telah mengirim pesan terlalu banyak. Silakan tunggu 15 menit lagi.",
  },
});

module.exports = {
  globalLimiter,
  authLimiter,
  contactLimiter,
};

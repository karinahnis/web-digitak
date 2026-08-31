const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

const { authLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validateMiddleware");
const { loginSchema } = require("../validations/authValidation");

router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.get("/me", authenticateToken, authController.me);
router.post("/logout", authenticateToken, authController.logout);

module.exports = router;

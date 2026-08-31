const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const { authenticateToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const validate = require("../middleware/validateMiddleware");
const { portfolioSchema } = require("../validations/portfolioValidation");

// Public endpoints
router.get("/", portfolioController.getAllPortfolios);
router.get("/:id", portfolioController.getPortfolioById);

// Protected endpoints
router.post("/", authenticateToken, upload.single("gambar"), validate(portfolioSchema), portfolioController.createPortfolio);
router.put("/:id", authenticateToken, upload.single("gambar"), validate(portfolioSchema), portfolioController.updatePortfolio);
router.patch("/:id/status", authenticateToken, portfolioController.toggleStatus);

module.exports = router;

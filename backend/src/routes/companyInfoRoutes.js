const express = require("express");
const router = express.Router();
const companyInfoController = require("../controllers/companyInfoController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Public endpoint
router.get("/", companyInfoController.getCompanyInfo);

// Protected endpoints
router.put("/", authenticateToken, companyInfoController.updateCompanyInfo);
router.post("/values", authenticateToken, companyInfoController.addValue);
router.put("/values/:id", authenticateToken, companyInfoController.updateValue);
router.delete("/values/:id", authenticateToken, companyInfoController.deleteValue);

module.exports = router;

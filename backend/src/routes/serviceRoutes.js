const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { authenticateToken } = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");
const { serviceSchema } = require("../validations/serviceValidation");

// Public endpoints
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);

// Protected endpoints
router.post("/", authenticateToken, validate(serviceSchema), serviceController.createService);
router.put("/:id", authenticateToken, validate(serviceSchema), serviceController.updateService);
router.patch("/:id/status", authenticateToken, serviceController.toggleStatus);

module.exports = router;

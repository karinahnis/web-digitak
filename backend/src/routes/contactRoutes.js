const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { authenticateToken } = require("../middleware/authMiddleware");

const { contactLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validateMiddleware");
const { createContactSchema, updateContactStatusSchema } = require("../validations/contactValidation");

// Public endpoint
router.post("/", contactLimiter, validate(createContactSchema), contactController.createMessage);

// Protected admin endpoints
router.get("/", authenticateToken, contactController.getAllMessages);
router.get("/:id", authenticateToken, contactController.getMessageById);
router.patch("/:id/status", authenticateToken, validate(updateContactStatusSchema), contactController.updateStatus);
router.patch("/:id/read", authenticateToken, contactController.markAsRead);

module.exports = router;

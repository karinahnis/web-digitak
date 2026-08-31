const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const { authenticateToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const validate = require("../middleware/validateMiddleware");
const { testimonialSchema } = require("../validations/testimonialValidation");

// Protected list endpoint
router.get("/", authenticateToken, testimonialController.getAllTestimonials);

// Public create endpoint (supports optional file upload under field 'foto' or JSON)
router.post("/", upload.single("foto"), validate(testimonialSchema), testimonialController.createTestimonial);

// Protected status toggle
router.patch("/:id/status", authenticateToken, testimonialController.toggleStatus);

module.exports = router;

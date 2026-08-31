const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const { authenticateToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/image", authenticateToken, upload.single("image"), uploadController.uploadImage);

module.exports = router;

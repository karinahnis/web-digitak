const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const companyInfoRoutes = require("./routes/companyInfoRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const setupSwagger = require("./config/swagger");
const { globalLimiter } = require("./middleware/rateLimiter");
const { notFoundHandler, errorHandler } = require("./middleware/errorMiddleware");
const { requestLogger } = require("./utils/logger");

const app = express();

// Security HTTP Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Cross-Origin Resource Sharing
app.use(cors());

// HTTP Request Logger
app.use(requestLogger);

// Global Rate Limiter
app.use(globalLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger UI Documentation
setupSwagger(app);

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "BE Web Digitak API Server Running", version: "v1" });
});

// API Routes (v1 prefix matching api_contract.md)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company-info", companyInfoRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/contact-messages", contactRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);
app.use("/api/v1/upload", uploadRoutes);

// Backward compatibility alias without /v1
app.use("/api/auth", authRoutes);
app.use("/api/company-info", companyInfoRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact-messages", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/upload", uploadRoutes);

// 404 Not Found Handler
app.use(notFoundHandler);

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;

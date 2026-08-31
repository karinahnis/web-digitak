/**
 * Modul Logger Terpusat sederhana dengan format Timestamp dan Level Log
 */

const formatMessage = (level, message, meta = null) => {
  const timestamp = new Date().toISOString();
  let logStr = `[${timestamp}] [${level}] ${message}`;
  if (meta) {
    logStr += ` | Meta: ${JSON.stringify(meta)}`;
  }
  return logStr;
};

const info = (message, meta = null) => {
  console.log(formatMessage("INFO", message, meta));
};

const warn = (message, meta = null) => {
  console.warn(formatMessage("WARN", message, meta));
};

const error = (message, meta = null) => {
  console.error(formatMessage("ERROR", message, meta));
};

/**
 * Middleware HTTP Request Logger
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    info(`${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`);
  });
  next();
};

module.exports = {
  info,
  warn,
  error,
  requestLogger,
};

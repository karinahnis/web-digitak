/**
 * Response Helper Utilities for Standardized API Responses
 */

const sendSuccess = (res, message, data = null, statusCode = 200, meta = null) => {
  const responseObj = {
    success: true,
  };

  if (message) {
    responseObj.message = message;
  }

  if (data !== null) {
    responseObj.data = data;
  }

  if (meta !== null) {
    responseObj.meta = meta;
  }

  return res.status(statusCode).json(responseObj);
};

const sendError = (res, message, errors = null, statusCode = 400) => {
  const responseObj = {
    success: false,
    message: message || "Terjadi kesalahan",
  };

  if (errors !== null) {
    responseObj.errors = errors;
  }

  return res.status(statusCode).json(responseObj);
};

module.exports = {
  sendSuccess,
  sendError,
};

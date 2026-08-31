const { sendError } = require("../utils/responseHelper");

/**
 * Middleware generik untuk memvalidasi request (body, query, params) menggunakan skema Joi
 * @param {Object} schema - Skema Joi
 * @param {string} source - Sumber data ('body' | 'query' | 'params')
 */
const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message.replace(/"/g, ""),
      }));
      return sendError(res, "Validasi data gagal", errorDetails, 400);
    }

    // Mengganti req[source] dengan nilai ter-sanitize (stripped unknown properties)
    req[source] = value;
    next();
  };
};

module.exports = validate;

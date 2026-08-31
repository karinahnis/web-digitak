const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Format email tidak valid",
    "string.empty": "Email tidak boleh kosong",
    "any.required": "Email wajib diisi",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password tidak boleh kosong",
    "any.required": "Password wajib diisi",
  }),
});

module.exports = {
  loginSchema,
};

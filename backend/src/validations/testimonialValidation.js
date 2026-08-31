const Joi = require("joi");

const testimonialSchema = Joi.object({
  nama_klien: Joi.string().trim().max(100).required().messages({
    "string.empty": "Nama klien wajib diisi",
    "any.required": "Nama klien wajib diisi",
  }),
  rating: Joi.number().integer().min(1).max(5).allow("", null),
  kutipan: Joi.string().trim().allow("", null),
  foto: Joi.string().trim().allow("", null),
});

module.exports = {
  testimonialSchema,
};

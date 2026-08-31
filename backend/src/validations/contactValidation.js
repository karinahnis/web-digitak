const Joi = require("joi");

const createContactSchema = Joi.object({
  nama: Joi.string().trim().max(100).required().messages({
    "string.empty": "Nama wajib diisi",
    "string.max": "Nama maksimal 100 karakter",
    "any.required": "Nama wajib diisi",
  }),
  email: Joi.string().trim().email().max(100).required().messages({
    "string.email": "Format email tidak valid",
    "string.empty": "Email wajib diisi",
    "string.max": "Email maksimal 100 karakter",
    "any.required": "Email wajib diisi",
  }),
  perusahaan: Joi.string().trim().max(100).allow("", null),
  pesan: Joi.string().trim().min(5).required().messages({
    "string.min": "Pesan minimal 5 karakter",
    "string.empty": "Pesan wajib diisi",
    "any.required": "Pesan wajib diisi",
  }),
});

const updateContactStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "diteruskan", "selesai").required().messages({
    "any.only": "Status harus berupa 'pending', 'diteruskan', atau 'selesai'",
    "any.required": "Status wajib diisi",
  }),
});

module.exports = {
  createContactSchema,
  updateContactStatusSchema,
};

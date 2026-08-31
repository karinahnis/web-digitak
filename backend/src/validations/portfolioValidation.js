const Joi = require("joi");

const portfolioSchema = Joi.object({
  judul_proyek: Joi.string().trim().max(255).required().messages({
    "string.empty": "Judul proyek wajib diisi",
    "any.required": "Judul proyek wajib diisi",
  }),
  klien: Joi.string().trim().max(100).allow("", null),
  deskripsi: Joi.string().trim().allow("", null),
  kategori: Joi.string().trim().max(100).allow("", null),
  gambar: Joi.string().trim().max(255).allow("", null),
});

module.exports = {
  portfolioSchema,
};

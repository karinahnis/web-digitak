const Joi = require("joi");

const serviceSchema = Joi.object({
  nama_layanan: Joi.string().trim().max(255).required().messages({
    "string.empty": "Nama layanan wajib diisi",
    "any.required": "Nama layanan wajib diisi",
  }),
  deskripsi_singkat: Joi.string().trim().max(255).allow("", null),
  deskripsi_detail: Joi.string().trim().allow("", null),
  ikon: Joi.string().trim().max(255).allow("", null),
});

module.exports = {
  serviceSchema,
};

const testimonialRepository = require("../repositories/testimonialRepository");

const getAllTestimonials = async () => {
  return await testimonialRepository.getAllTestimonials();
};

const createTestimonial = async (data) => {
  const { nama_klien, rating } = data;
  if (!nama_klien) {
    throw { statusCode: 400, message: "Nama klien wajib diisi" };
  }
  const parsedRating = parseInt(rating, 10);
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    throw { statusCode: 400, message: "Rating harus bernilai angka antara 1 dan 5" };
  }

  return await testimonialRepository.createTestimonial({
    ...data,
    rating: parsedRating,
  });
};

const toggleStatus = async (id) => {
  const affected = await testimonialRepository.toggleStatus(id);
  if (affected === 0) {
    throw { statusCode: 404, message: "Testimoni tidak ditemukan" };
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  toggleStatus,
};

const portfolioRepository = require("../repositories/portfolioRepository");
const { deleteUploadedFile } = require("../utils/fileHelper");

const getAllPortfolios = async (queryParams) => {
  const page = parseInt(queryParams.page || "1", 10);
  const limit = parseInt(queryParams.limit || "10", 10);
  const kategori = queryParams.kategori;
  const search = queryParams.search;

  const { data, total } = await portfolioRepository.getAllPortfolios({ kategori, search, page, limit });

  return {
    data,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getPortfolioById = async (id) => {
  const portfolio = await portfolioRepository.getPortfolioById(id);
  if (!portfolio) {
    throw { statusCode: 404, message: "Data tidak ditemukan" };
  }
  return portfolio;
};

const createPortfolio = async (data, adminId) => {
  if (!data.judul_proyek) {
    throw { statusCode: 400, message: "Judul proyek wajib diisi" };
  }
  return await portfolioRepository.createPortfolio(data, adminId);
};

const updatePortfolio = async (id, data, adminId) => {
  if (!data.judul_proyek) {
    throw { statusCode: 400, message: "Judul proyek wajib diisi" };
  }

  const oldPortfolio = await portfolioRepository.getPortfolioById(id);
  if (!oldPortfolio) {
    throw { statusCode: 404, message: "Data tidak ditemukan" };
  }

  // Hapus berkas gambar lama jika gambar diperbarui
  if (data.gambar && oldPortfolio.gambar && data.gambar !== oldPortfolio.gambar) {
    deleteUploadedFile(oldPortfolio.gambar);
  }

  const affected = await portfolioRepository.updatePortfolio(id, data, adminId);
  if (affected === 0) {
    throw { statusCode: 404, message: "Data tidak ditemukan" };
  }
};

const toggleStatus = async (id) => {
  const affected = await portfolioRepository.toggleStatus(id);
  if (affected === 0) {
    throw { statusCode: 404, message: "Data tidak ditemukan" };
  }
};

module.exports = {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  toggleStatus,
};

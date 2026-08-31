const serviceRepository = require("../repositories/serviceRepository");

const getAllServices = async (queryParams) => {
  const page = parseInt(queryParams.page || "1", 10);
  const limit = parseInt(queryParams.limit || "10", 10);
  const search = queryParams.search || "";

  const { data, total } = await serviceRepository.getAllServices({ page, limit, search });

  return {
    data,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getServiceById = async (id) => {
  const service = await serviceRepository.getServiceById(id);
  if (!service) {
    throw { statusCode: 404, message: "Layanan tidak ditemukan" };
  }
  return service;
};

const createService = async (data, adminId) => {
  if (!data.nama_layanan) {
    throw { statusCode: 400, message: "Nama layanan wajib diisi" };
  }
  return await serviceRepository.createService(data, adminId);
};

const updateService = async (id, data, adminId) => {
  if (!data.nama_layanan) {
    throw { statusCode: 400, message: "Nama layanan wajib diisi" };
  }
  const affected = await serviceRepository.updateService(id, data, adminId);
  if (affected === 0) {
    throw { statusCode: 404, message: "Layanan tidak ditemukan" };
  }
};

const toggleServiceStatus = async (id) => {
  const affected = await serviceRepository.toggleServiceStatus(id);
  if (affected === 0) {
    throw { statusCode: 404, message: "Layanan tidak ditemukan" };
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  toggleServiceStatus,
};

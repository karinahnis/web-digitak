const contactRepository = require("../repositories/contactRepository");

const createMessage = async (data) => {
  const { nama, email, pesan } = data;
  if (!nama || !email || !pesan) {
    throw { statusCode: 400, message: "Nama, email, dan pesan wajib diisi" };
  }
  return await contactRepository.createMessage(data);
};

const getAllMessages = async (queryParams) => {
  const page = parseInt(queryParams.page || "1", 10);
  const limit = parseInt(queryParams.limit || "10", 10);
  const status = queryParams.status;
  const is_read = queryParams.is_read;
  const search = queryParams.search;

  const { data, total } = await contactRepository.getAllMessages({ status, is_read, search, page, limit });

  return {
    data,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getMessageById = async (id) => {
  const msg = await contactRepository.getMessageById(id);
  if (!msg) {
    throw { statusCode: 404, message: "Pesan kontak tidak ditemukan" };
  }
  return msg;
};

const updateStatus = async (id, status) => {
  const validStatuses = ["pending", "diteruskan", "selesai"];
  if (!status || !validStatuses.includes(status)) {
    throw { statusCode: 400, message: "Status tidak valid. Gunakan 'pending', 'diteruskan', atau 'selesai'" };
  }
  const affected = await contactRepository.updateStatus(id, status);
  if (affected === 0) {
    throw { statusCode: 404, message: "Pesan kontak tidak ditemukan" };
  }
};

const markAsRead = async (id, adminId) => {
  const affected = await contactRepository.markAsRead(id, adminId);
  if (affected === 0) {
    throw { statusCode: 404, message: "Pesan kontak tidak ditemukan" };
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateStatus,
  markAsRead,
};

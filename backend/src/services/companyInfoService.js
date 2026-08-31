const companyInfoRepository = require("../repositories/companyInfoRepository");

const getCompanyInfo = async () => {
  const info = await companyInfoRepository.getCompanyInfo();
  if (!info) {
    return null;
  }
  const values = await companyInfoRepository.getCompanyValues(info.id);
  
  return {
    id: info.id,
    tentang_kami: info.tentang_kami,
    visi: info.visi,
    misi: info.misi,
    email: info.email,
    telepon: info.telepon,
    alamat: info.alamat,
    values: values || [],
    updated_at: info.updated_at,
  };
};

const updateCompanyInfo = async (data, adminId) => {
  const info = await companyInfoRepository.getCompanyInfo();
  if (!info) {
    throw { statusCode: 404, message: "Data info perusahaan tidak ditemukan" };
  }
  await companyInfoRepository.updateCompanyInfo(info.id, data, adminId);
};

const addCompanyValue = async (judul, deskripsi) => {
  if (!judul || !deskripsi) {
    throw { statusCode: 400, message: "Judul dan deskripsi wajib diisi" };
  }
  const info = await companyInfoRepository.getCompanyInfo();
  const companyInfoId = info ? info.id : 1;
  await companyInfoRepository.createCompanyValue(companyInfoId, judul, deskripsi);
};

const updateCompanyValue = async (valueId, judul, deskripsi) => {
  if (!judul || !deskripsi) {
    throw { statusCode: 400, message: "Judul dan deskripsi wajib diisi" };
  }
  const affected = await companyInfoRepository.updateCompanyValue(valueId, judul, deskripsi);
  if (affected === 0) {
    throw { statusCode: 404, message: "Nilai perusahaan tidak ditemukan" };
  }
};

const deleteCompanyValue = async (valueId) => {
  const affected = await companyInfoRepository.softDeleteCompanyValue(valueId);
  if (affected === 0) {
    throw { statusCode: 404, message: "Nilai perusahaan tidak ditemukan" };
  }
};

module.exports = {
  getCompanyInfo,
  updateCompanyInfo,
  addCompanyValue,
  updateCompanyValue,
  deleteCompanyValue,
};

const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Company Profile & CMS Backend API",
    version: "1.0.0",
    description: "Dokumentasi API backend untuk Digitak Company Profile & CMS Backend",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local Development Server (v1)",
    },
    {
      url: "http://localhost:3000/api",
      description: "Local Development Server (Default)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Masukkan Token JWT dari response POST /auth/login",
      },
    },
  },
  tags: [
    { name: "Authentication", description: "Endpoint Login, Profile Admin, dan Logout" },
    { name: "Info Perusahaan", description: "Endpoint Profil Perusahaan & Nilai-Nilai Perusahaan" },
    { name: "Layanan", description: "Endpoint Manajemen Layanan Perusahaan" },
    { name: "Pesan Kontak", description: "Endpoint Form Kontak Publik & Inbox Admin" },
    { name: "Testimoni", description: "Endpoint Testimoni Klien & Moderasi Admin" },
    { name: "Portofolio", description: "Endpoint Portofolio Proyek" },
    { name: "Upload", description: "Utility Upload File Gambar" },
  ],
  paths: {
    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login Admin",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "admin@company.com" },
                  password: { type: "string", example: "Passw0rd!" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login berhasil, mengembalikan Bearer Token" },
          401: { description: "Email atau password salah" },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get Admin Profile",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Berhasil mengambil profil admin" },
          401: { description: "Unauthorized - Token tidak valid/tidak ada" },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout Admin",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Logout berhasil" },
        },
      },
    },
    "/company-info": {
      get: {
        tags: ["Info Perusahaan"],
        summary: "Get Info Perusahaan (Publik)",
        responses: {
          200: { description: "Berhasil mengambil data info perusahaan" },
        },
      },
      put: {
        tags: ["Info Perusahaan"],
        summary: "Update Info Perusahaan",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  tentang_kami: { type: "string", example: "Kami adalah perusahaan..." },
                  visi: { type: "string", example: "Menjadi terdepan..." },
                  misi: { type: "string", example: "Memberikan layanan..." },
                  email: { type: "string", example: "info@company.com" },
                  telepon: { type: "string", example: "+62812xxxxxxx" },
                  alamat: { type: "string", example: "Jl. Contoh No. 1" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Berhasil diperbarui" },
        },
      },
    },
    "/company-info/values": {
      post: {
        tags: ["Info Perusahaan"],
        summary: "Tambah Nilai Perusahaan",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["judul"],
                properties: {
                  judul: { type: "string", example: "Integritas" },
                  deskripsi: { type: "string", example: "Menjunjung kejujuran" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Berhasil ditambahkan" },
        },
      },
    },
    "/company-info/values/{id}": {
      put: {
        tags: ["Info Perusahaan"],
        summary: "Update Nilai Perusahaan",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  judul: { type: "string", example: "Integritas" },
                  deskripsi: { type: "string", example: "Menjunjung kejujuran tinggi" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Berhasil diperbarui" },
        },
      },
      delete: {
        tags: ["Info Perusahaan"],
        summary: "Hapus Nilai Perusahaan (Soft Delete)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Berhasil dihapus" },
        },
      },
    },
    "/services": {
      get: {
        tags: ["Layanan"],
        summary: "Get All Layanan (Publik)",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
          { name: "search", in: "query", schema: { type: "string" } },
        ],
        responses: { 200: { description: "Berhasil mengambil data layanan" } },
      },
      post: {
        tags: ["Layanan"],
        summary: "Tambah Layanan Baru",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nama_layanan"],
                properties: {
                  nama_layanan: { type: "string", example: "Web Development" },
                  deskripsi_singkat: { type: "string", example: "Website profesional" },
                  deskripsi_detail: { type: "string", example: "Kami membangun website modern..." },
                  ikon: { type: "string", example: "web.svg" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Berhasil ditambahkan" } },
      },
    },
    "/services/{id}": {
      get: {
        tags: ["Layanan"],
        summary: "Get Detail Layanan",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Detail Layanan" }, 404: { description: "Tidak ditemukan" } },
      },
      put: {
        tags: ["Layanan"],
        summary: "Update Layanan",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nama_layanan: { type: "string" },
                  deskripsi_singkat: { type: "string" },
                  deskripsi_detail: { type: "string" },
                  ikon: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Berhasil diperbarui" } },
      },
    },
    "/services/{id}/status": {
      patch: {
        tags: ["Layanan"],
        summary: "Toggle Status Layanan (Show/Hide)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Status berhasil diperbarui" } },
      },
    },
    "/contact-messages": {
      post: {
        tags: ["Pesan Kontak"],
        summary: "Kirim Pesan Kontak (Publik)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nama", "email", "pesan"],
                properties: {
                  nama: { type: "string", example: "Budi Santoso" },
                  email: { type: "string", example: "budi@example.com" },
                  perusahaan: { type: "string", example: "PT Contoh" },
                  pesan: { type: "string", example: "Saya ingin bertanya..." },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Pesan berhasil dikirim" } },
      },
      get: {
        tags: ["Pesan Kontak"],
        summary: "Get All Pesan Kontak (Admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "status", in: "query", schema: { type: "string", enum: ["pending", "diteruskan", "selesai"] } },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        ],
        responses: { 200: { description: "Daftar pesan kontak" } },
      },
    },
    "/contact-messages/{id}": {
      get: {
        tags: ["Pesan Kontak"],
        summary: "Get Detail Pesan Kontak",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Detail pesan" } },
      },
    },
    "/contact-messages/{id}/status": {
      patch: {
        tags: ["Pesan Kontak"],
        summary: "Update Status Pesan Kontak",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: { type: "string", enum: ["pending", "diteruskan", "selesai"], example: "diteruskan" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Status berhasil diperbarui" } },
      },
    },
    "/contact-messages/{id}/read": {
      patch: {
        tags: ["Pesan Kontak"],
        summary: "Tandai Pesan Sudah Dibaca",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Pesan ditandai sudah dibaca" } },
      },
    },
    "/testimonials": {
      get: {
        tags: ["Testimoni"],
        summary: "Get All Testimoni (Admin)",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Daftar testimoni" } },
      },
      post: {
        tags: ["Testimoni"],
        summary: "Kirim Testimoni (Publik)",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["nama_klien", "rating", "kutipan"],
                properties: {
                  nama_klien: { type: "string", example: "Ani Wijaya" },
                  rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
                  kutipan: { type: "string", example: "Sangat puas dengan layanannya" },
                  foto: { type: "string", format: "binary" },
                },
              },
            },
            "application/json": {
              schema: {
                type: "object",
                required: ["nama_klien", "rating", "kutipan"],
                properties: {
                  nama_klien: { type: "string", example: "Ani Wijaya" },
                  rating: { type: "integer", example: 5 },
                  kutipan: { type: "string", example: "Sangat puas dengan layanannya" },
                  foto: { type: "string", example: "ani.jpg" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Berhasil ditambahkan" } },
      },
    },
    "/testimonials/{id}/status": {
      patch: {
        tags: ["Testimoni"],
        summary: "Toggle Status Testimoni (Show/Hide)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Status berhasil diperbarui" } },
      },
    },
    "/portfolios": {
      get: {
        tags: ["Portofolio"],
        summary: "Get All Portofolio (Publik)",
        parameters: [
          { name: "kategori", in: "query", schema: { type: "string" } },
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        ],
        responses: { 200: { description: "Daftar portofolio" } },
      },
      post: {
        tags: ["Portofolio"],
        summary: "Tambah Portofolio",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["judul_proyek"],
                properties: {
                  judul_proyek: { type: "string", example: "Sistem Kasir" },
                  klien: { type: "string", example: "Toko Makmur" },
                  deskripsi: { type: "string", example: "Aplikasi kasir..." },
                  kategori: { type: "string", example: "Mobile Development" },
                  gambar: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Berhasil ditambahkan" } },
      },
    },
    "/portfolios/{id}": {
      get: {
        tags: ["Portofolio"],
        summary: "Get Detail Portofolio",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Detail portofolio" } },
      },
      put: {
        tags: ["Portofolio"],
        summary: "Update Portofolio",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  judul_proyek: { type: "string" },
                  klien: { type: "string" },
                  deskripsi: { type: "string" },
                  kategori: { type: "string" },
                  gambar: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Berhasil diperbarui" } },
      },
    },
    "/portfolios/{id}/status": {
      patch: {
        tags: ["Portofolio"],
        summary: "Toggle Status Portofolio (Show/Hide)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Status berhasil diperbarui" } },
      },
    },
    "/upload/image": {
      post: {
        tags: ["Upload"],
        summary: "Upload Gambar Utility",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["image"],
                properties: {
                  image: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Berhasil diunggah" } },
      },
    },
  },
};

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  // Endpoint JSON spesifikasi Swagger untuk Import ke Postman
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(swaggerDocument);
  });
};

module.exports = setupSwagger;

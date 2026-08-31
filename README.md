# Web Digitak - Company Profile & CMS

Repository utama untuk website Digitak: company profile dan Content Management System (CMS). Proyek ini menggunakan arsitektur monorepo yang memisahkan backend API, frontend, dan dokumentasi.

## Fitur Utama

- **Autentikasi Admin (JWT)**: Login admin terproteksi, get profile (`/api/v1/auth/me`), dan logout.
- **Info Perusahaan & Nilai**: CRUD informasi tentang kami, visi, misi, dan nilai-nilai perusahaan.
- **Layanan (Services)**: Manajemen daftar layanan dengan pagination dan keyword search.
- **Portofolio**: Manajemen proyek portofolio (upload gambar, pagination, filter kategori, keyword search).
- **Testimoni**: Manajemen testimoni klien dengan rating (1-5) dan upload foto.
- **Pesan Kontak**: Pengiriman pesan kontak publik dan manajemen status pesan oleh admin.
- **Keamanan**: Helmet HTTP security headers, rate limiting (proteksi brute-force), dan filtering MIME-type upload.
- **Penanganan Error Terstruktur**: Global error handler middleware dan validasi input Joi.
- **Pembersihan Berkas Otomatis**: Gambar lama dihapus dari direktori `uploads/` saat gambar diperbarui.
- **Dokumentasi Interaktif**: Swagger UI di `/api-docs`.

## Teknologi

| Area | Teknologi |
|---|---|
| Runtime | Node.js v18+ (CommonJS) |
| Backend Framework | Express 5 |
| Database | MySQL 8.0.x / MariaDB (driver `mysql2` pool) |
| Autentikasi | JWT (`jsonwebtoken`) + `bcryptjs` |
| Validasi | Joi |
| Upload File | Multer |
| Dokumentasi API | Swagger UI (`swagger-jsdoc` + `swagger-ui-express`) |

## Struktur Proyek

```
web-digitak/
├── backend/          # REST API backend (Node.js + Express + MySQL)
│   ├── server.js     # Entry point server
│   ├── src/
│   │   ├── app.js    # Konfigurasi aplikasi Express
│   │   ├── routes/       # Definisi route API
│   │   ├── controllers/  # Handler request/response
│   │   ├── services/     # Logika bisnis
│   │   ├── repositories/ # Akses database (query)
│   │   ├── validations/  # Schema validasi Joi
│   │   ├── middleware/   # auth, validate, upload, rateLimiter, error
│   │   ├── utils/        # logger, fileHelper, responseHelper
│   │   └── config/       # database pool, swagger
│   ├── scripts/      # Skrip migrasi & inspeksi DB
│   ├── tests/        # Pengujian E2E API
│   ├── docs/         # DDL, migrasi SQL
│   └── uploads/      # Penyimpanan gambar (disajikan statis di /uploads)
├── frontend/         # Aplikasi frontend (akan dikembangkan)
└── docs/             # Dokumentasi proyek (kontrak API)
```

Arsitektur backend menggunakan pendekatan berlapis: `routes/` → `controllers/` → `services/` → `repositories/`.

## Persyaratan Sistem

- **Node.js**: v18.x atau lebih baru
- **MySQL**: v8.0.x atau MariaDB

## Cara Menjalankan (Backend)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Pengaturan Variabel Lingkungan

Salin `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Sesuaikan konfigurasi database dan JWT secret pada berkas `.env`:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=web_digitak

JWT_SECRET=your_strong_random_secret_here_change_this_in_production
JWT_EXPIRES_IN=14400

BASE_URL=http://localhost:3000
```

### 3. Persiapan Database

Buat database `web_digitak`, lalu jalankan DDL dari `backend/docs/ddl_query.sql`. Kemudian jalankan skrip migrasi untuk menambahkan kolom yang dibutuhkan dan membuat akun admin default (`admin@company.com` / `Passw0rd!`):

```bash
npm run migrate
```

### 4. Menjalankan Server

```bash
npm run dev
```

Server backend akan berjalan pada **http://localhost:3000**. Health check tersedia di `GET /`.

## Dokumentasi API

Setelah server berjalan, akses Swagger UI:

- Local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Kontrak API lengkap: [`docs/api_contract.md`](docs/api_contract.md)

Base URL API: `/api/v1`

## Pengujian

```bash
cd backend

# Test E2E API
npm run test:api

# Test fitur prioritas tinggi & menengah
node tests/test_high_priority_features.js
node tests/test_medium_priority_features.js
```

## Perintah yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server development |
| `npm run migrate` | Migrasi kolom DB & seed admin default |
| `npm run inspect:db` | Inspeksi struktur database |
| `npm run test:api` | Menjalankan test suite E2E API |

## Status Pengembangan

- [x] Backend API
- [ ] Frontend (belum dimulai)

# BE Web Digitak - Company Profile & CMS Backend API

Backend RESTful API untuk Digitak Company Profile & Content Management System (CMS), dibangun menggunakan Node.js, Express.js, MySQL, Joi, JWT, dan Swagger UI.

## 🚀 Fitur Utama
- **Autentikasi Admin (JWT)**: Login admin terproteksi, get profile (`/api/v1/auth/me`), & logout.
- **Info Perusahaan & Value**: CRUD Informasi tentang kami, visi, misi, dan nilai-nilai perusahaan.
- **Layanan (Services)**: Manajemen daftar layanan dengan pagination & keyword search.
- **Portofolio**: Manajemen proyek portofolio (upload gambar, pagination, filter kategori & keyword search).
- **Testimoni**: Manajemen testimoni klien dengan rating & upload foto.
- **Pesan Kontak**: Pengiriman pesan kontak publik dan manajemen status pesan oleh admin.
- **Keamanan (Security)**: Helmet HTTP Security Headers, Express Rate Limiting (Brute-force & DDoS protection), dan MIME-type file upload filtering.
- **Penanganan Error Terstruktur**: Global error handler middleware dan Joi input schema validator.
- **Pembersihan Berkas Sampah**: Hapus gambar lama dari direktori `uploads/` secara otomatis saat gambar diperbarui.
- **Interactive Documentation**: Swagger UI interaktif di `/api-docs`.

---

## 🛠️ Persyaratan Sistem (Prerequisites)
- **Node.js**: v18.x atau yang lebih baru
- **MySQL Database**: v8.0.x atau MariaDB

---

## ⚙️ Cara Instalasi & Memulai

### 1. Install Dependencies
```bash
npm install
```

### 2. Pengaturan Variabel Lingkungan (.env)
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

### 3. Migrasi Database & Admin Default
Jalankan skrip berikut untuk membuat kolom/tabel yang dibutuhkan dan membuat akun admin default (`admin@company.com` / `Passw0rd!`):
```bash
npm run migrate
```

### 4. Menjalankan Server Development
```bash
npm run dev
```
Server backend akan berjalan pada **http://localhost:3000**.

---

## 📖 Dokumentasi API (Swagger UI)
Setelah server dinyalakan, buka browser dan akses:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 🧪 Menjalankan Pengujian Otomatis
```bash
# Test E2E API & Security Suite
node tests/test_high_priority_features.js
node tests/test_medium_priority_features.js
```

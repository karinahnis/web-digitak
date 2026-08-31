# API Contract — Company Profile & CMS Backend

## Informasi Umum

| Item        | Detail                                                          |
| ----------- | --------------------------------------------------------------- |
| Base URL    | `https://api.digitak.com/api/v1`                                |
| Format      | JSON (`Content-Type: application/json`)                         |
| Autentikasi | Bearer Token (JWT) — hanya untuk endpoint admin (create/update) |
| Header Auth | `Authorization: Bearer <token>`                                 |

### Format Response Standar

**Sukses**

```json
{
  "success": true,
  "message": "Berhasil mengambil data",
  "data": {}
}
```

**Gagal**

```json
{
  "success": false,
  "message": "Pesan error",
  "errors": {
    "field_x": ["Field ini wajib diisi"]
  }
}
```

### Kode Status HTTP

| Kode | Arti                                                |
| ---- | --------------------------------------------------- |
| 200  | OK — request berhasil                               |
| 201  | Created — data berhasil dibuat                      |
| 400  | Bad Request — validasi gagal                        |
| 401  | Unauthorized — token tidak ada/invalid              |
| 403  | Forbidden — tidak punya akses                       |
| 404  | Not Found — data tidak ditemukan                    |
| 409  | Conflict — data duplikat (mis. email sudah dipakai) |
| 500  | Internal Server Error                               |

---

## 1. Authentication (`admins`)

### 1.1 Login

`POST /auth/login`

**Request Body**

```json
{
  "email": "admin@company.com",
  "password": "Passw0rd!"
}
```

**Response 200**

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 14400 // 4 jam dalam detik
  }
}
```

### 1.2 Get Profile Admin (Me)

`GET /auth/me`

**Response 200**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin01",
    "email": "admin@company.com",
    "created_at": "2026-08-22T09:00:00Z",
    "updated_at": "2026-08-22T09:00:00Z"
  }
}
```

### 1.3 Logout

`POST /auth/logout`

**Response 200**

```json
{ "success": true, "message": "Logout berhasil" }
```

---

## 2. Info Perusahaan (`info_perusahaan` + `nilai_nilai`)

> `nilai_nilai` selalu dikembalikan sebagai array nested (`values`) di dalam response `info_perusahaan`.

### 2.1 Get Info Perusahaan (Publik)

`GET /company-info`

**Response 200**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "tentang_kami": "Kami adalah perusahaan ...",
    "visi": "Menjadi perusahaan terdepan ...",
    "misi": "Memberikan layanan terbaik ...",
    "email": "info@company.com",
    "telepon": "+62812xxxxxxx",
    "alamat": "Jl. Contoh No. 1, Bandung",
    "values": [
      {
        "id": 1,
        "judul": "Integritas",
        "deskripsi": "Menjunjung tinggi kejujuran"
      },
      { "id": 2, "judul": "Inovasi", "deskripsi": "Selalu berinovasi" }
    ],
    "updated_at": "2026-08-22T09:00:00Z"
  }
}
```

### 2.2 Update Info Perusahaan

`PUT /company-info`

**Request Body**

```json
{
  "tentang_kami": "Kami adalah perusahaan ...",
  "visi": "Menjadi perusahaan terdepan ...",
  "misi": "Memberikan layanan terbaik ...",
  "email": "info@company.com",
  "telepon": "+62812xxxxxxx",
  "alamat": "Jl. Contoh No. 1, Bandung"
}
```

**Response 200**

```json
{
  "success": true,
  "message": "Berhasil diperbarui"
}
```

### 2.3 Tambah Nilai Perusahaan

`POST /company-info/values`

**Request Body**

```json
{
  "judul": "Kolaborasi",
  "deskripsi": "Bekerja sama untuk hasil terbaik"
}
```

**Response 201**

```json
{
  "success": true,
  "message": "Berhasil ditambahkan"
}
```

### 2.4 Update Nilai Perusahaan

`PUT /company-info/values/{id}`

**Request Body**

```json
{ "judul": "Kolaborasi Tim", "deskripsi": "Bekerja sama lintas divisi" }
```

**Response 200**

```json
{
  "success": true,
  "message": "Berhasil diperbarui"
}
```

### 2.5 Hapus Nilai Perusahaan

`DELETE /company-info/values/{id}`

> **Soft delete** — record tidak dihapus permanen dari database, hanya ditandai terhapus (mis. kolom `deleted_at` diisi timestamp). Data tetap ada di database untuk keperluan audit/pemulihan; query normal otomatis mengecualikan record yang sudah soft-deleted. Belum ada kebutuhan hard delete di sistem ini.

**Response 200**

```json
{ "success": true, "message": "Berhasil dihapus" }
```

---

## 3. Layanan (`layanan`)

### 3.1 Get All Layanan

`GET /services`

Query params opsional: `?page=1&limit=10&search=keyword`

**Response 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama_layanan": "Web Development",
      "deskripsi_singkat": "Pembuatan website profesional",
      "deskripsi_detail": "Kami membangun website ...",
      "ikon": "https://cdn.domain.com/icons/web.svg",
      "status": 1,
      "created_at": "2026-08-22T09:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 5 }
}
```

### 3.2 Get Detail Layanan

`GET /services/{id}`

**Response 200** — satu objek layanan seperti di atas
**Response 404** jika tidak ditemukan

### 3.3 Tambah Layanan

`POST /services` 🔒

**Request Body**

```json
{
  "nama_layanan": "UI/UX Design",
  "deskripsi_singkat": "Desain antarmuka yang menarik",
  "deskripsi_detail": "Kami merancang pengalaman pengguna ...",
  "ikon": "https://cdn.domain.com/icons/uiux.svg"
}
```

**Response 201**

```json
{
  "success": true,
  "message": "Berhasil ditambahkan"
}
```

### 3.4 Update Layanan

`PUT /services/{id}` 🔒

**Request Body** — sama seperti 3.3 (field opsional/partial diperbolehkan jika pakai `PATCH`)

**Response 200**

```json
{
  "success": true,
  "message": "Berhasil diperbarui"
}
```

### 3.5 Update Status Layanan (Show/Hide)

`PATCH /services/{id}/status` 🔒

> Menggantikan endpoint delete — layanan tidak pernah dihapus permanen, hanya diaktifkan/dinonaktifkan. Kolom di tabel: `status` (0 = hide, 1 = show). **Tidak butuh request body** — BE membalik (reverse) nilai `status` yang tersimpan saat ini, jadi aman dipanggil berulang kali karena transaksinya di database.

**Response 200**

```json
{
  "success": true,
  "message": "Berhasil diperbarui"
}
```

---

## 4. Pesan Kontak (`pesan_kontak`)

### 4.1 Kirim Pesan Kontak (Publik)

`POST /contact-messages`

**Request Body**

```json
{
  "nama": "Budi Santoso",
  "email": "budi@example.com",
  "perusahaan": "PT Contoh Jaya",
  "pesan": "Saya ingin bertanya mengenai layanan Anda."
}
```

**Response 201**

```json
{
  "success": true,
  "message": "Pesan berhasil dikirim"
}
```

### 4.2 Get All Pesan Kontak

`GET /contact-messages` 🔒

Query params opsional: `?status=pending&is_read=false&page=1&limit=10`

**Response 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 10,
      "nama": "Budi Santoso",
      "email": "budi@example.com",
      "perusahaan": "PT Contoh Jaya",
      "pesan": "Saya ingin bertanya mengenai layanan Anda.",
      "status": "pending",
      "read_at": null,
      "read_by": null,
      "created_at": "2026-08-22T09:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 1 }
}
```

### 4.3 Get Detail Pesan Kontak

`GET /contact-messages/{id}` 🔒

**Response 200** — satu objek pesan kontak

### 4.4 Update Status Pesan Kontak

`PATCH /contact-messages/{id}/status` 🔒

**Request Body**

```json
{ "status": "diteruskan" }
```

> Nilai `status` yang valid: `pending`, `diteruskan`, `selesai` (status "dibaca" tidak dipakai lagi — lihat 4.5)

**Response 200**

```json
{
  "success": true,
  "message": "Status berhasil diperbarui"
}
```

### 4.5 Tandai Dibaca

`PATCH /contact-messages/{id}/read` 🔒

> Menandai pesan sudah dibaca, terpisah dari alur `status` di atas. Tidak perlu request body — `read_at` diisi waktu saat ini dan `read_by` diisi dari admin yang sedang login (dari token).

**Response 200**

```json
{
  "success": true,
  "message": "Pesan ditandai sudah dibaca"
}
```

---

## 5. Testimoni (`testimoni`)

### 5.1 Get All Testimoni

`GET /testimonials` 🔒

**Response 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama_klien": "Ani Wijaya",
      "foto": "https://cdn.domain.com/testimoni/ani.jpg",
      "rating": 5,
      "kutipan": "Pelayanan sangat memuaskan!",
      "status": 1,
      "created_at": "2026-08-22T09:00:00Z"
    }
  ]
}
```

### 5.2 Tambah Testimoni

`POST /testimonials` (multipart/form-data jika upload foto)
🔓 Publik — tidak wajib login (diisi langsung oleh klien di halaman publik)

**Request Body**

```json
{
  "nama_klien": "Ani Wijaya",
  "foto": "ani.jpg",
  "rating": 5,
  "kutipan": "Pelayanan sangat memuaskan!"
}
```

> `rating` harus bernilai 1–5

**Response 201**

```json
{
  "success": true,
  "message": "Berhasil ditambahkan"
}
```

### 5.3 Update Status Testimoni (Show/Hide)

`PATCH /testimonials/{id}/status` 🔒

> Kolom di tabel: `status` (0 = hide, 1 = show). **Tidak butuh request body** — BE membalik (reverse) nilai `status` yang tersimpan saat ini, aman dipanggil berulang kali karena transaksinya di database.

**Response 200**

```json
{
  "success": true,
  "message": "Berhasil diperbarui"
}
```

---

## 6. Portofolio (`portofolio`)

### 6.1 Get All Portofolio (Publik)

`GET /portfolios`

Query params opsional: `?kategori=Web&page=1&limit=10`

**Response 200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "judul_proyek": "Sistem Informasi Akademik",
      "klien": "Universitas Contoh",
      "deskripsi": "Pengembangan sistem informasi akademik terintegrasi.",
      "kategori": "Web Development",
      "gambar": "https://cdn.domain.com/portofolio/siakad.jpg",
      "status": 1,
      "created_at": "2026-08-22T09:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 8 }
}
```

### 6.2 Get Detail Portofolio

`GET /portfolios/{id}`

**Response 200**

```json
{
  "success": true,
  "data": {
    "judul_proyek": "Sistem Informasi Akademik",
    "klien": "Universitas Contoh",
    "deskripsi": "Pengembangan sistem informasi akademik terintegrasi.",
    "kategori": "Web Development",
    "gambar": "https://cdn.domain.com/portofolio/siakad.jpg",
    "status": 1,
    "created_at": "2026-08-22T09:00:00Z",
    "updated_at": "2026-08-22T09:00:00Z"
  }
}
```

**Response 404** jika tidak ditemukan

```json
{
  "success": false,
  "message": "Data tidak ditemukan"
}
```

### 6.3 Tambah Portofolio

`POST /portfolios` 🔒 (multipart/form-data jika upload gambar)

**Request Body**

```json
{
  "judul_proyek": "Aplikasi Mobile Kasir",
  "klien": "Toko Makmur",
  "deskripsi": "Aplikasi kasir berbasis mobile.",
  "kategori": "Mobile Development",
  "gambar": "kasir.jpg"
}
```

**Response 201**

```json
{
  "success": true,
  "message": "Berhasil ditambahkan"
}
```

### 6.4 Update Portofolio

`PUT /portfolios/{id}` 🔒

**Request Body**

```json
{
  "judul_proyek": "Aplikasi Mobile Kasir Pro",
  "klien": "Toko Makmur Jaya",
  "deskripsi": "Aplikasi kasir berbasis mobile dengan fitur loyalty.",
  "kategori": "Mobile Development",
  "gambar": "kasir-updated.jpg"
}
```

**Response 200**

```json
{
  "success": true,
  "message": "Berhasil diperbarui"
}
```

### 6.5 Update Status Portofolio (Show/Hide)

`PATCH /portfolios/{id}/status` 🔒

> Kolom di tabel: `status` (0 = hide, 1 = show). **Tidak butuh request body** — BE membalik (reverse) nilai `status` yang tersimpan saat ini, aman dipanggil berulang kali karena transaksinya di database.

**Response 200**

```json
{
  "success": true,
  "message": "Berhasil diperbarui"
}
```

---

## 7. Upload Gambar (Utility)

### 7.1 Upload Gambar

`POST /upload/image` 🔒

> Endpoint umum untuk upload gambar, dipakai saat form butuh gambar yang sudah ter-hosting (mis. field `ikon` pada Layanan). FE upload gambar dulu ke endpoint ini, lalu dapat `url` dan `path`. `url` dipakai FE untuk preview gambar; `path` yang dikirim balik ke BE sebagai bagian dari payload create/update entity terkait — jadi FE tidak perlu memotong-motong `url` untuk dapat path-nya.

**Request Body** (`multipart/form-data`)

| Field   | Tipe | Keterangan                 |
| ------- | ---- | -------------------------- |
| `image` | file | File gambar (jpg/png/webp) |

**Response 201**

```json
{
  "success": true,
  "message": "Berhasil diunggah",
  "data": {
    "url": "https://cdn.domain.com/uploads/abc123.jpg",
    "path": "path_for_db"
  }
}
```

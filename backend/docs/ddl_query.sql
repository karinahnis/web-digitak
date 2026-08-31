-- Pilih database
USE web_digitak;

-- Tabel admins
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel info_perusahaan
CREATE TABLE info_perusahaan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tentang_kami TEXT,
    visi TEXT,
    misi TEXT,
    email VARCHAR(100),
    telepon VARCHAR(20),
    alamat TEXT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES admins(id) ON DELETE SET NULL
);

-- Tabel nilai_nilai
CREATE TABLE nilai_nilai (
    id INT PRIMARY KEY AUTO_INCREMENT,
    info_perusahaan_id INT,
    judul VARCHAR(255),
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (info_perusahaan_id) REFERENCES info_perusahaan(id) ON DELETE CASCADE
);

-- Tabel layanan
CREATE TABLE layanan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_layanan VARCHAR(255) NOT NULL,
    deskripsi_singkat VARCHAR(255),
    deskripsi_detail TEXT,
    ikon VARCHAR(255),
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES admins(id) ON DELETE SET NULL
);

-- Tabel pesan_kontak
CREATE TABLE pesan_kontak (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    perusahaan VARCHAR(100),
    pesan TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel testimoni
CREATE TABLE testimoni (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_klien VARCHAR(100) NOT NULL,
    foto VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    kutipan TEXT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES admins(id) ON DELETE SET NULL
);

-- Tabel portofolio
CREATE TABLE portofolio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul_proyek VARCHAR(255) NOT NULL,
    klien VARCHAR(100),
    deskripsi TEXT,
    kategori VARCHAR(100),
    gambar VARCHAR(255),
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES admins(id) ON DELETE SET NULL
);
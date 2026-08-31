-- Migration script to add missing columns required by API contract

USE web_digitak;

-- 1. Add status column to layanan (0 = hide, 1 = show)
ALTER TABLE layanan ADD COLUMN IF NOT EXISTS status TINYINT DEFAULT 1;

-- 2. Add status column to testimoni (0 = hide, 1 = show)
ALTER TABLE testimoni ADD COLUMN IF NOT EXISTS status TINYINT DEFAULT 1;

-- 3. Add status column to portofolio (0 = hide, 1 = show)
ALTER TABLE portofolio ADD COLUMN IF NOT EXISTS status TINYINT DEFAULT 1;

-- 4. Add read_at and read_by columns to pesan_kontak
ALTER TABLE pesan_kontak ADD COLUMN IF NOT EXISTS read_at TIMESTAMP NULL;
ALTER TABLE pesan_kontak ADD COLUMN IF NOT EXISTS read_by INT NULL;

-- 5. Add deleted_at column to nilai_nilai for soft deletes
ALTER TABLE nilai_nilai ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;

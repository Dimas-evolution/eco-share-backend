# 🌿 Eco-Share Backend - UTS Web Development

Selamat datang di repository **Eco-Share Backend**! Ini adalah platform ekonomi sirkular yang memungkinkan pengguna untuk menyewakan barang bekas guna mengurangi limbah lingkungan. 

Proyek ini dibangun untuk memenuhi kriteria UTS dengan fokus pada **Integritas Data**, **Keamanan (JWT)**, dan **Arsitektur Service Layer**.

## 🚀 Fitur Utama
- **Authentication & Authorization**: Registrasi dan Login menggunakan JWT (JSON Web Token) & enkripsi password dengan `bcrypt`.
- **Role-Based Access**: Pembedaan hak akses antara `owner` (pemilik barang) dan `renter` (penyewa).
- **Secure Transaction**: Proses peminjaman barang menggunakan **Database Transaction (ACID)** untuk menjamin integritas data (stok dan riwayat transaksi selalu sinkron).
- **Global Error Handling**: Sistem penanganan error yang rapi sehingga server tidak mudah crash.

---

## 🛠️ Cara Menjalankan Aplikasi secara Mandiri

### 1. Persiapan Database
1. Buka **XAMPP** dan jalankan **MySQL**.
2. Masuk ke **phpMyAdmin** dan buat database baru bernama `eco_share_db`.
3. Import file `schema.sql` yang ada di root folder ini ke dalam database tersebut.

### 2. Instalasi
Clone repository ini dan install dependensinya:
```bash
git clone [https://github.com/Dimas-evolution/eco-share-backend.git](https://github.com/Dimas-evolution/eco-share-backend.git)
cd eco_share_backend
npm install

3. Konfigurasi Environment
Buat file .env di folder root dan isi dengan:

Cuplikan kode
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=eco_share_db
JWT_SECRET=uts_eco_share_2026_aman

4. Jalankan Server
node server.js
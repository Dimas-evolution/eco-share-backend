const mysql = require('mysql2');

// Pakai pool biar koneksi ke XAMPP stabil
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'eco_share_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

// Cek koneksi pas server jalan
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database XAMPP belum nyala atau nama DB salah!');
    } else {
        console.log('✅ Koneksi MySQL Berhasil!');
        connection.release();
    }
});

module.exports = db;
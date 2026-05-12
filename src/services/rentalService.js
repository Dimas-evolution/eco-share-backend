const db = require('../config/db');

const rentItem = async (userId, itemId, days) => {
    // Memulai Koneksi untuk Transaksi
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction(); // MULAI TRANSAKSI (Integritas Data)

        // 1. Cek Ketersediaan Barang (Poin 2 Soal)
        const [items] = await connection.execute(
            'SELECT * FROM Items WHERE id = ? FOR UPDATE', [itemId]
        );
        
        const item = items[0];
        if (!item || item.status !== 'available') {
            throw new Error('Barang tidak tersedia untuk disewa!');
        }

        // 2. Hitung Biaya (Business Logic)
        const totalCost = item.price_per_day * days;

        // 3. Catat Transaksi (Poin 2 Soal)
        await connection.execute(
            'INSERT INTO Transactions (user_id, item_id, total_cost, duration_days) VALUES (?, ?, ?, ?)',
            [userId, itemId, totalCost, days]
        );

        // 4. Update Status Barang agar tidak bisa dipinjam orang lain bersamaan
        await connection.execute(
            'UPDATE Items SET status = "rented" WHERE id = ?', [itemId]
        );

        await connection.commit(); // SELESAI & SIMPAN (ACID Principle)
        return { message: 'Peminjaman berhasil', totalCost };

    } catch (error) {
        await connection.rollback(); // BATALKAN SEMUA JIKA GAGAL (Manajemen Database)
        throw error;
    } finally {
        connection.release(); // Kembalikan koneksi ke pool
    }
};

module.exports = { rentItem };
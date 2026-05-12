require('dotenv').config();
const express = require('express');

// --- IMPORT UTILS & MIDDLEWARES ---
const { globalErrorHandler, catchAsync } = require('./src/utils/errorHandler');
const { protect, restrictTo } = require('./src/middlewares/authGuard');

// --- IMPORT SERVICES (Logika Bisnis) ---
const { register, login } = require('./src/services/authService');
const { rentItem } = require('./src/services/rentalService');

const app = express();

// Body Parser biar bisa baca JSON dari request
app.use(express.json());

// --- 1. ROUTE TESTING DASAR ---
app.get('/', (req, res) => {
    res.json({ 
        message: "Eco-Share API is Running!",
        status: "Safe & Sound"
    });
});

// --- 2. ROUTES AUTH (Register & Login) ---
// Buat dapetin token JWT buat akses fitur lainnya
app.post('/api/register', catchAsync(async (req, res) => {
    const { username, email, password, role } = req.body;
    const result = await register(username, email, password, role);
    res.status(201).json({ status: 'success', data: result });
}));

app.post('/api/login', catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({ status: 'success', data: result });
}));

// --- 3. ROUTE TRANSAKSI (Peminjaman) ---
/**
 * Proteksi Berlapis:
 * - protect: Cek apakah user bawa Token JWT yang valid.
 * - restrictTo('renter'): Cek apakah user adalah penyewa (bukan owner).
 */
app.post('/api/rent', 
    protect, 
    restrictTo('renter'), 
    catchAsync(async (req, res) => {
        const { itemId, days } = req.body;
        
        // userId diambil dari token (req.user), bukan dari input manual (biar gak bisa nipu ID)
        const userId = req.user.id; 
        
        const result = await rentItem(userId, itemId, days);
        
        res.status(200).json({
            status: 'success',
            message: 'Transaksi Berhasil Dicatat',
            data: result
        });
    })
);

// --- 4. GLOBAL ERROR HANDLER ---
// Jaring pengaman kalau ada error mendadak biar server gak crash
app.use(globalErrorHandler);

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 Eco-Share Server jalan di port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
    console.log(`========================================`);
});
require('dotenv').config();
const express = require('express');
const { globalErrorHandler } = require('./src/utils/errorHandler');

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// --- AREA ROUTES ---
// Nanti semua route kamu akan didaftarkan di sini
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Eco-Share API" });
});

// Contoh proteksi route dengan Middleware Guard yang kita buat tadi
// app.use('/api/items', require('./src/routes/itemRoutes'));
// -------------------

// Handler Error Global (Harus di paling bawah setelah route)
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Eco-Share berjalan di port ${PORT}`);
});
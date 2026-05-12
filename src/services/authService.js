const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (username, email, password, role) => {
    // Hash password biar aman (Poin Keamanan!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.execute(
        'INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role || 'renter']
    );
    return { message: "User berhasil didaftarkan!" };
};

const login = async (email, password) => {
    // 1. Cari user di DB
    const [users] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
    const user = users[0];

    // 2. Cek user ada gak & password cocok gak
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Email atau password salah, bro.");
    }

    // 3. Kalau bener, kasih "Kunci" (Token JWT)
    const token = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );

    return { token };
};

module.exports = { register, login };
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Anda tidak diizinkan akses, token hilang' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan data user (id & role) ke request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token tidak valid' });
    }
};

// Middleware untuk membedakan hak akses (Otorisasi)
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Anda tidak memiliki hak akses untuk tindakan ini' });
        }
        next();
    };
};

module.exports = { protect, restrictTo };
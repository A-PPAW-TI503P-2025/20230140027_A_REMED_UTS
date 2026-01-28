// Middleware untuk membatasi akses khusus Admin
exports.verifyAdmin = (req, res, next) => {
    const role = req.headers['x-user-role'];
    
    if (role === 'admin') {
        next(); // Lanjut ke controller
    } else {
        res.status(403).json({ message: 'Akses Ditolak: Khusus Admin!' });
    }
};

// Middleware untuk membatasi akses khusus User
exports.verifyUser = (req, res, next) => {
    const role = req.headers['x-user-role'];
    const userId = req.headers['x-user-id']; // ID User wajib ada untuk peminjaman

    if (role === 'user' && userId) {
        next();
    } else {
        res.status(403).json({ message: 'Akses Ditolak: Khusus User dan wajib sertakan ID!' });
    }
};
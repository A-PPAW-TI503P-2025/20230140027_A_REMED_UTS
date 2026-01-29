// middleware/authMiddleware.js

exports.verifyAdmin = (req, res, next) => {
    // Cek header role
    const role = req.headers['x-user-role'];
    if (role !== 'admin') {
        return res.status(403).json({ message: "Akses Ditolak! Khusus Admin." });
    }
    next();
};

exports.verifyUser = (req, res, next) => {
    // Cek header role & ID
    const role = req.headers['x-user-role'];
    const userId = req.headers['x-user-id'];

    if (role !== 'user' || !userId) {
        return res.status(403).json({ message: "Akses Ditolak! Anda harus Login sebagai User." });
    }
    next();
};
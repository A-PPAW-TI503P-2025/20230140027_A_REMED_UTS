const Book = require('../models/Book');
const BorrowLog = require('../models/BorrowLog');
const User = require('../models/User');

// 1. FUNGSI MEMINJAM BUKU (Untuk User)
exports.borrowBook = async (req, res) => {
    try {
        // Ambil data dari Body (Input Form) dan Header (Sesi User)
        const { bookId, latitude, longitude } = req.body;
        const userId = req.headers['x-user-id']; 

        // --- VALIDASI INPUT ---
        if (!userId) {
            return res.status(401).json({ message: "Akses Ditolak: User ID tidak ditemukan!" });
        }
        if (!bookId || !latitude || !longitude) {
            return res.status(400).json({ message: "Gagal: Data buku atau lokasi tidak lengkap." });
        }

        // --- CEK DATABASE ---
        
        // 1. Cek User apakah benar-benar ada di database?
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User tidak valid / tidak ditemukan." });
        }

        // 2. Cek Buku dan Stok
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Buku tidak ditemukan." });
        }
        if (book.stock < 1) {
            return res.status(400).json({ message: "Yah, Stok buku ini habis!" });
        }

        // --- PROSES TRANSAKSI ---

        // 3. Kurangi Stok Buku
        book.stock = book.stock - 1;
        await book.save();

        // 4. Catat Log Peminjaman
        const log = await BorrowLog.create({
            userId: userId,
            bookId: bookId,
            latitude: latitude,
            longitude: longitude
        });

        // 5. Kirim Respon Sukses
        res.status(201).json({
            message: "Peminjaman berhasil dicatat!",
            data: log,
            sisaStok: book.stock
        });

    } catch (error) {
        console.error("Error borrowBook:", error);
        res.status(500).json({ message: "Terjadi kesalahan server: " + error.message });
    }
};

// 2. FUNGSI LIHAT LOG (Untuk Admin)
exports.getAllLogs = async (req, res) => {
    try {
        // Ambil semua log, tapi gabungkan dengan info User dan Buku (JOIN)
        const logs = await BorrowLog.findAll({
            include: [
                { 
                    model: Book, 
                    attributes: ['title', 'author'] // Hanya ambil judul & penulis
                },
                { 
                    model: User, 
                    attributes: ['username'] // Hanya ambil username peminjam
                } 
            ],
            order: [['createdAt', 'DESC']] // Urutkan dari yang paling baru
        });

        res.json(logs);

    } catch (error) {
        console.error("Error getAllLogs:", error);
        res.status(500).json({ message: error.message });
    }
};
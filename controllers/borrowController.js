const Book = require('../models/Book');
const BorrowLog = require('../models/BorrowLog');

exports.borrowBook = async (req, res) => {
    try {
        // Ambil data dari Body dan Header
        const { bookId, latitude, longitude } = req.body;
        const userId = req.headers['x-user-id'];

        // 1. Cek apakah buku ada?
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Buku tidak ditemukan" });
        }

        // 2. Cek apakah stok masih ada?
        if (book.stock < 1) {
            return res.status(400).json({ message: "Stok buku habis!" });
        }

        // 3. Kurangi stok buku
        book.stock = book.stock - 1;
        await book.save();

        // 4. Catat Log Peminjaman & Lokasi
        const log = await BorrowLog.create({
            userId: userId,
            bookId: bookId,
            latitude: latitude,
            longitude: longitude
        });

        res.status(201).json({
            message: "Peminjaman berhasil dicatat!",
            data: log,
            sisaStok: book.stock
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
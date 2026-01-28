const Book = require('../models/Book');

// 1. LIHAT SEMUA BUKU (Public)
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. LIHAT DETAIL BUKU (Public)
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. TAMBAH BUKU (Admin)
exports.createBook = async (req, res) => {
    try {
        const { title, author, stock } = req.body;
        // Validasi sederhana
        if (!title || !author) {
            return res.status(400).json({ message: "Judul dan Penulis wajib diisi" });
        }
        
        const newBook = await Book.create({ title, author, stock });
        res.status(201).json({ message: "Buku berhasil ditambahkan", data: newBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. UPDATE BUKU (Admin)
exports.updateBook = async (req, res) => {
    try {
        const { title, author, stock } = req.body;
        const book = await Book.findByPk(req.params.id);
        
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });

        // Update data
        book.title = title || book.title;
        book.author = author || book.author;
        book.stock = stock !== undefined ? stock : book.stock;
        
        await book.save();
        res.json({ message: "Buku berhasil diupdate", data: book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. HAPUS BUKU (Admin)
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });

        await book.destroy();
        res.json({ message: "Buku berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
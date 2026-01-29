const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// Models
const User = require('./models/User');
const Book = require('./models/Book');
const BorrowLog = require('./models/BorrowLog');

// Relasi Database
User.hasMany(BorrowLog, { foreignKey: 'userId' });
BorrowLog.belongsTo(User, { foreignKey: 'userId' });
Book.hasMany(BorrowLog, { foreignKey: 'bookId' });
BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

// --- ENDPOINTS (PUBLIC) ---

// 1. Ambil Buku (Dipakai Admin & User)
app.get('/api/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

// 2. Tambah Buku (Admin)
app.post('/api/books', async (req, res) => {
    try {
        await Book.create(req.body);
        res.json({ message: "Sukses tambah buku" });
    } catch(e) { res.status(500).json({message: e.message}); }
});

// 3. Edit Buku (Admin)
app.put('/api/books/:id', async (req, res) => {
    await Book.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Sukses update buku" });
});

// 4. Hapus Buku (Admin)
app.delete('/api/books/:id', async (req, res) => {
    await Book.destroy({ where: { id: req.params.id } });
    res.json({ message: "Sukses hapus buku" });
});

// 5. Pinjam Buku (User) - VERSI RESPON LENGKAP
app.post('/api/borrow', async (req, res) => {
    try {
        const { bookId, latitude, longitude } = req.body;
        
        // Cari buku
        const book = await Book.findByPk(bookId);
        
        // Cek validasi
        if (!book || book.stock < 1) return res.status(400).json({ message: "Stok habis!" });

        // Kurangi Stok
        book.stock -= 1;
        await book.save();

        // Catat Log & Simpan ke variabel 'newLog'
        const newLog = await BorrowLog.create({ userId: 1, bookId, latitude, longitude });

        // --- INI BAGIAN YANG DIUBAH AGAR MENAMPILKAN DATA ---
        res.json({
            message: "Peminjaman Berhasil!",
            data: {
                id_transaksi: newLog.id,
                judul_buku: book.title,    // Menampilkan judul buku
                lokasi: {                  // Menampilkan koordinat rapi
                    latitude: latitude,
                    longitude: longitude
                },
                waktu: newLog.createdAt    // Menampilkan waktu transaksi
            },
            sisaStok: book.stock
        });
        // ----------------------------------------------------

    } catch (e) { res.status(500).json({message: e.message}); }
});

// 6. Lihat Log (Admin)
app.get('/api/logs', async (req, res) => {
    const logs = await BorrowLog.findAll({
        include: [{ model: Book, attributes: ['title'] }],
        order: [['createdAt', 'DESC']]
    });
    res.json(logs);
});

// Jalankan Server
const startServer = async () => {
    try {
        await db.authenticate();
        await db.sync({ alter: true });

        // Buat User Default "Tamu" (ID 1)
        const userExist = await User.findByPk(1);
        if (!userExist) {
            await User.create({ username: 'Tamu', password: 'nopassword', role: 'user' });
        }

        app.listen(3000, () => console.log('🚀 Server Jalan di http://localhost:3000'));
    } catch (err) { console.error(err); }
};
startServer();
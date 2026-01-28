const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/database');

// Import Models (Agar tabel ter-generate)
const Book = require('./models/Book');
const BorrowLog = require('./models/BorrowLog');

// Import Routes
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware Body Parser
app.use(express.json());

// --- ROUTING UTAMA ---
app.use('/api/books', bookRoutes);    // URL untuk buku
app.use('/api/borrow', borrowRoutes); // URL untuk peminjaman

// Default Route (Cek server nyala)
app.get('/', (req, res) => {
    res.send('Server Perpustakaan Backend Jalan! 🚀');
});

// Start Server
const startServer = async () => {
    try {
        // Cek koneksi DB
        await db.authenticate();
        console.log('✅ Koneksi Database Berhasil!');
        
        // Sinkronisasi Tabel (Alter: true agar update jika ada perubahan struktur)
        await db.sync({ alter: true });
        console.log('✅ Tabel Database Siap!');

        app.listen(port, () => {
            console.log(`🚀 Server berjalan di http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Gagal Konek:', error);
    }
};

startServer();
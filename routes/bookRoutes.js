const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyAdmin } = require('../middleware/AuthMiddleware');

// --- PUBLIC ROUTES (Siapa saja boleh akses) ---
// GET /api/books : Lihat semua buku
router.get('/', bookController.getAllBooks);

// GET /api/books/:id : Detail buku
router.get('/:id', bookController.getBookById);

// --- ADMIN ROUTES (Perlu Header x-user-role: admin) ---
// POST /api/books : Tambah buku
router.post('/', verifyAdmin, bookController.createBook);

// PUT /api/books/:id : Update buku
router.put('/:id', verifyAdmin, bookController.updateBook);

// DELETE /api/books/:id : Hapus buku
router.delete('/:id', verifyAdmin, bookController.deleteBook);

module.exports = router;
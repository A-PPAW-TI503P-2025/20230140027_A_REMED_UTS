// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Import Middleware Admin
const { verifyAdmin } = require('../middleware/authMiddleware');

// Public: Semua orang bisa lihat buku
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Admin Only: Tambah, Edit, Hapus
router.post('/', verifyAdmin, bookController.createBook);
router.put('/:id', verifyAdmin, bookController.updateBook);
router.delete('/:id', verifyAdmin, bookController.deleteBook);

module.exports = router;
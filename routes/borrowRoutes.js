// routes/borrowRoutes.js
const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

// Import Middleware User & Admin
const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware');

// User: Pinjam Buku
router.post('/', verifyUser, borrowController.borrowBook);

// Admin: Lihat Log
router.get('/logs', verifyAdmin, borrowController.getAllLogs);

module.exports = router;
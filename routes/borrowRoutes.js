const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { verifyUser } = require('../middleware/AuthMiddleware');

// --- USER ROUTES (Perlu Header x-user-role: user & x-user-id) ---
// POST /api/borrow : Meminjam buku + Geolokasi
router.post('/', verifyUser, borrowController.borrowBook);

module.exports = router;
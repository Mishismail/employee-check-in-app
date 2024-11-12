const express = require('express');
const { addCheckIn, getAllCheckIns, generateQRCodes } = require('../controllers/checkInController');
const router = express.Router();

// POST route to add a new check-in
router.post('/check-in', addCheckIn);

// GET route for admin to view all check-ins
router.get('/admin/check-ins', getAllCheckIns);

// GET route to fetch all check-ins without admin path (optional)
router.get('/check-in', getAllCheckIns);

// POST route to generate QR codes
router.post('/admin/generate-qr-codes', generateQRCodes);

module.exports = router;
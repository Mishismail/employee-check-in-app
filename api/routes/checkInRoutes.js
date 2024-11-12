const express = require('express');
const { addCheckIn, getAllCheckIns } = require('../controllers/checkInController');
const router = express.Router();

// POST route to add a new check-in
router.post('/check-in', addCheckIn);

// GET route for admin to view all check-ins
router.get('/admin/check-ins', getAllCheckIns);

// GET route for testing or to fetch all check-ins without admin path
router.get('/check-in', getAllCheckIns);

module.exports = router;
const express = require('express');
const { addCheckIn, getAllCheckIns } = require('../controllers/checkInController');
const router = express.Router();

router.post('/check-in', addCheckIn);  // Add check-in
router.get('/admin/check-ins', getAllCheckIns);  // Admin: View all check-ins

module.exports = router;
const CheckIn = require('../models/CheckIn');
const generateQRCode = require('../utils/qrCodeGenerator');

const locations = [
  'Oude-Westhof-H001',
  'Oude-Westhof-H002',
  'Oude-Westhof-H003',
  'Oude-Westhof-H004',
];

// @desc Add a new check-in
const addCheckIn = async (req, res) => {
  const { employeeName, locationId, notes } = req.body;

  try {
    const checkIn = await CheckIn.create({
      employeeName,
      locationId,
      notes: notes || 'No notes provided',
    });
    res.status(201).json(checkIn);
  } catch (error) {
    res.status(500).json({ message: 'Error adding check-in' });
  }
};

// @desc Get all check-ins
const getAllCheckIns = async (req, res) => {
  try {
    const checkIns = await CheckIn.find();
    res.status(200).json(checkIns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching check-ins' });
  }
};

// @desc Generate QR codes
const generateQRCodes = async (req, res) => {
  const baseUrl = process.env.CHECK_IN_BASE_URL;

  try {
    locations.forEach(locationId => {
      generateQRCode(locationId, baseUrl);
    });
    res.status(200).json({ message: 'QR codes generated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR codes' });
  }
};

module.exports = { addCheckIn, getAllCheckIns, generateQRCodes };

const CheckIn = require('../models/CheckIn');

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

module.exports = { addCheckIn, getAllCheckIns };

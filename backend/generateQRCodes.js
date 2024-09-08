const generateQRCode = require('./utils/qrCodeGenerator');

// Base URL of the check-in page running on localhost:3001 or deployment URL
const BASE_URL = 'http://localhost:3001/check-in';

const locations = [
  'Oude-Westhof-H001',
  'Oude-Westhof-H002',
  'Oude-Westhof-H003',
];

// Generate QR codes for each location
locations.forEach(locationId => {
  generateQRCode(locationId, BASE_URL);
});
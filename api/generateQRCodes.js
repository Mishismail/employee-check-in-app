const generateQRCode = require('./utils/qrCodeGenerator');

// Base URL of the check-in page running on localhost:3001 or deployment URL
const BASE_URL = 'https://odwh-check-in.netlify.app/check-in';

const locations = [
  'Oude-Westhof-H001',
  'Oude-Westhof-H002',
  'Oude-Westhof-H003',
  'Oude-Westhof-H004',
];

// Generate QR codes for each location
locations.forEach(locationId => {
  generateQRCode(locationId, BASE_URL);
});
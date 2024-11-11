const QRCode = require('qrcode');

// Generate QR code
const generateQRCode = async (locationId, baseUrl) => {
  try {
    const url = `${baseUrl}?location=${locationId}`;
    await QRCode.toFile(`./qr-codes/${locationId}.png`, url);
    console.log(`QR Code for ${locationId} generated!`);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

module.exports = generateQRCode;
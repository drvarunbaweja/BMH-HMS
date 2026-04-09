import jsQR from 'jsqr';

window.BMH_QR_DECODE = function (imageData) {
  try {
    if (!imageData || !imageData.data || !imageData.width || !imageData.height) return '';
    const result = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth'
    });
    return String(result?.data || '').trim();
  } catch (e) {
    return '';
  }
};


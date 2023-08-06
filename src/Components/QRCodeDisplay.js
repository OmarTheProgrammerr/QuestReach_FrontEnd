import React from "react";
import styles from "./QRCodeDisplay.module.css"; // Import your styles

function QRCodeDisplay({ qrCode }) {
  return (
    <div className={styles.qrCodeContainer}>
      <h2>Here's your QR Code:</h2>
      {qrCode ? <img src={qrCode} alt="QR Code" /> : <p>Loading...</p>}
    </div>
  );
}

export default QRCodeDisplay;

import React from "react";
import qrImage from "../assets/qr.jpg"; // Import the QR image

const Donate = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img src={qrImage} alt="QR Code" className="w-1/3 max-w-xs rounded-lg shadow-lg" />
    </div>
  );
};

export default Donate;

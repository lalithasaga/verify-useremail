import React from 'react';
import './VerifyEmailPopup.css';
const VerifyEmailPopup = ({ onClose, onVerifyEmail }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Verify Your Email</h3>
        <p>Click the button below to verify your email:</p>
        <button onClick={onVerifyEmail}>Verify Email</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VerifyEmailPopup;

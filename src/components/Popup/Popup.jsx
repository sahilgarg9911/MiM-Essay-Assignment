import React, { useState } from "react";
import OtpInput from "../OtpInput/OtpInput";
import "./Popup.css";

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="maindiv-verify">
      <button onClick={togglePopup} className="verify-otp">Verify OTP</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">    
          <OtpInput/>       
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;

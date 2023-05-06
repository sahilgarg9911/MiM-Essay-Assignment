import React, { useState, useRef, useEffect } from "react";
import './OtpInput.css';

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [otp]);

  const handleInputChange = (event, index) => {
    const newOtp = [...otp];
    const input = event.target.value;

    // Only allow numeric input
    if (!/^\d*$/.test(input)) {
      return;
    }

    newOtp[index] = input;

    setOtp(newOtp);

    // Move focus to next input after digit is entered
    if (index < 5 && input !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputKeyDown = (event, index) => {
    if (event.keyCode === 8 && index > 0 && otp[index] === "") {
      // Backspace pressed and current input is empty
      inputRefs.current[index - 1].focus();
    } else if (event.keyCode === 37 && index > 0) {
      // Left arrow pressed and not at first input
      inputRefs.current[index - 1].focus();
    } else if (event.keyCode === 39 && index < 5) {
      // Right arrow pressed and not at last input
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("text");
    const newOtp = [];

    // Only allow numeric input
    const numbersOnly = clipboardData.replace(/\D/g, "");

    // Copy first 6 digits to newOtp array
    for (let i = 0; i < Math.min(6, numbersOnly.length); i++) {
      newOtp.push(numbersOnly.charAt(i));
    }

    // Fill any remaining spaces with empty string
    for (let i = newOtp.length; i < 6; i++) {
      newOtp.push("");
    }

    setOtp(newOtp);
  };

  const handleVerifyClick = () => {
    console.log("verified successfully")
  };

  return (
    <div className="otp-input-container">
        <h1>Phone Verification</h1>
        <div>Enter the OTP you received on 999-000-0000</div>
        <div className="otp-inputs">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          maxLength="1"
          onChange={(event) => handleInputChange(event, index)}
          onKeyDown={(event) => handleInputKeyDown(event, index)}
          onPaste={handlePaste}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
      </div>
      <div className="options">
      <span>Change Number</span>
      <span>Re-send OTP</span>
      </div>
      <button disabled={isDisabled} onClick={handleVerifyClick}>
        Verify Phone Number
      </button>
    </div>
  );
};

export default OtpInput;

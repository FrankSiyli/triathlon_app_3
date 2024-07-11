"use client";
import React, { useState } from "react";
import "../../../globals.css";

function AlertButton() {
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  return (
    <div>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center">
        {showAlert && (
          <div className="alert alert-info w-40 absolute">
            <span>Coming soon</span>
          </div>
        )}
        <button onClick={handleAlertClick}></button>
      </div>
    </div>
  );
}

export default AlertButton;

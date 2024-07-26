"use client";
import Alert from "@/app/components/Alerts/Alert";
import React, { useState } from "react";

const WomenCalculatorByAge = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [womenCalculatorInput, setWomenCalculatorInput] = useState("");
  const [womenCalculatedHr, setWomenCalculatedHr] = useState("");
  const handleWomenInputClick = () => {
    if (
      womenCalculatorInput === "" ||
      womenCalculatorInput < 0 ||
      womenCalculatorInput > 100
    ) {
      setShowAlert(true);
    } else {
      setWomenCalculatedHr(Math.round(209 - 0.9 * womenCalculatorInput));
      setWomenCalculatorInput("");
    }
  };
  const handleWomenKeyDown = (event) => {
    if (event.key === "Enter") {
      handleWomenInputClick();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center ">
        <p className="m-2">Damen</p>
        <div>
          <input
            type="number"
            placeholder="Dein Alter z.B. 35"
            value={womenCalculatorInput}
            onChange={(e) => setWomenCalculatorInput(e.target.value)}
            onKeyDown={handleWomenKeyDown}
            className="input  border border-transparent "
          />
        </div>

        <p className="icon-text m-1">HRmax = 209-(0.9 x Alter) </p>
        {showAlert && (
          <Alert
            alertText="Bitte trage dein Alter ein (0-100)"
            setShowAlert={setShowAlert}
          />
        )}
        <button
          onClick={handleWomenInputClick}
          className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
        >
          Berechnen
        </button>
        {womenCalculatedHr && (
          <div className="text-center m-3 p-2">
            Dein berechneter Maximalpuls: <p>{womenCalculatedHr} bpm</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WomenCalculatorByAge;

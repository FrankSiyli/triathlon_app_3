"use client";
import React, { useState } from "react";
import Alert from "@/app/components/Alerts/Alert";

const MenCalculatorByAge = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [menCalculatorInput, setMenCalculatorInput] = useState("");
  const [menCalculatedHr, setMenCalculatedHr] = useState("");

  const handleMenInputClick = () => {
    if (
      menCalculatorInput === "" ||
      menCalculatorInput < 0 ||
      menCalculatorInput > 100
    ) {
      setShowAlert(true);
    } else {
      setMenCalculatedHr(Math.round(214 - 0.8 * menCalculatorInput));
      setMenCalculatorInput("");
    }
  };

  const handleMenKeyDown = (event) => {
    if (event.key === "Enter") {
      handleMenInputClick();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center ">
        <p className="m-2">Herren</p>
        <div>
          <input
            type="number"
            maxLength={3}
            placeholder="Dein Alter z.B. 35"
            value={menCalculatorInput}
            onChange={(e) => setMenCalculatorInput(e.target.value)}
            onKeyDown={handleMenKeyDown}
            className="input  border border-transparent "
          />
        </div>

        <p className="icon-text m-1">HRmax = 214-(0.8 x Alter) </p>
        {showAlert && (
          <Alert
            alertText="Bitte trage dein Alter ein (0-100)"
            setShowAlert={setShowAlert}
          />
        )}
        <button
          onClick={handleMenInputClick}
          className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
        >
          Berechnen
        </button>
        {menCalculatedHr && (
          <div className="text-center m-3 p-2">
            Dein berechneter Maximalpuls: <p>{menCalculatedHr} bpm</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MenCalculatorByAge;

"use client";
import React, { useState } from "react";
import Alert from "@/app/components/Alerts/Alert";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";

const PowerWatt = ({ setShowInfos }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState("");
  const [tgOutput1, setTgOutput1] = useState("");
  const [tgOutput2, setTgOutput2] = useState("");
  const [tgOutput3, setTgOutput3] = useState("");
  const [tgOutput4, setTgOutput4] = useState("");
  const [tgOutput5, setTgOutput5] = useState("");
  const [tgOutput6, setTgOutput6] = useState("");
  const [tgOutput7, setTgOutput7] = useState("");

  const calculateWattZones = () => {
    const a1 = parseFloat(calculatorInput);
    const b1 = a1 / 100;
    if (
      calculatorInput === "" ||
      calculatorInput < 50 ||
      calculatorInput > 500
    ) {
      setShowAlert(true);
    } else {
      setTgOutput1(`${Math.round(b1 * 50)} - ${Math.round(b1 * 60)}`);
      setTgOutput2(`${Math.round(b1 * 60)} - ${Math.round(b1 * 70)}`);
      setTgOutput3(`${Math.round(b1 * 70)} - ${Math.round(b1 * 80)}`);
      setTgOutput4(`${Math.round(b1 * 80)} - ${Math.round(b1 * 90)}`);
      setTgOutput5(`${Math.round(b1 * 90)} - ${Math.round(b1 * 100)}`);
      setTgOutput6(`${Math.round(b1 * 120)} - ${Math.round(b1 * 150)}`);
      setTgOutput7(`${Math.round(b1 * 150)} - ${"8000"}`);
      setCalculatorInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      calculateWattZones();
    }
  };

  const handleBackClick = () => {
    setShowInfos();
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <button
          className="top-5 left-5 btn btn-ghost btn-sm  m-3 border border-transparent text-first "
          onClick={handleBackClick}
        >
          <ArrowLeftSvg />
        </button>
      </div>
      <div className="min-h-screen mb-60">
        <div className="w-11/12 border border-first/50 linear-background rounded-md p-4 max-w-xl mx-auto mb-5   text-center">
          <p>
            Du hast deine <span className="text-xl">F</span>
            <span className="icon-text">unctional</span>
            <span className="text-xl"> T</span>
            <span className="icon-text">reshold</span>
            <span className="text-xl"> P</span>
            <span className="icon-text">ower</span> bereits auf einer smarten
            Rolle ermittelt?
          </p>
          <br />
          <p>Dann kannst du hier deine Trainingszonen berechnen.</p>
        </div>
        <div>
          <div className="max-w-xl mx-auto flex flex-col items-center justify-center">
            {showAlert && (
              <Alert
                alertText="Bitte trage deine FTP ein (50-500)"
                setShowAlert={setShowAlert}
              />
            )}
            <label className="label mt-10 ">
              <span className="label-text-alt text-first text-xl">
                Deine FTP in Watt
              </span>
            </label>
            <input
              type="number"
              maxLength={3}
              placeholder="z.B. 250"
              value={calculatorInput}
              onChange={(e) => setCalculatorInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input  border border-transparent mb-3 w-full max-w-xs"
            />

            <button
              className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
              onClick={calculateWattZones}
            >
              Berechnen
            </button>
          </div>

          <div className="overflow-x-auto flex justify-center">
            <table className="table table-xs table-pin-rows table-pin-cols m-1 max-w-xl  text-first text-center border border-first">
              <thead className="text-first">
                <tr className="bg-fourth">
                  <td>Zone</td>
                  <td>Power in Watt</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="zone5">7 Sprint Power</td>
                  <td>
                    <input
                      className="w-20"
                      type="text"
                      value={tgOutput7}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone45">6 Anaerobic Capacity</td>
                  <td>
                    <input
                      className="w-20"
                      type="text"
                      value={tgOutput6}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone4">5 VO2max</td>
                  <td>
                    <input
                      className="w-20"
                      type="text"
                      value={tgOutput5}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone35">4 Lactate Threshold</td>
                  <td>
                    <input
                      className="w-20"
                      type="text"
                      value={tgOutput4}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone3">3 Tempo</td>
                  <td>
                    <input
                      className="w-20"
                      type="text"
                      value={tgOutput3}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone2">2 Aerobic Endurance</td>
                  <td>
                    <input
                      className="w-20"
                      type="text"
                      value={tgOutput2}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone1">1 Active Recovery</td>
                  <td>
                    <input
                      className="w-20"
                      type="text"
                      value={tgOutput1}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PowerWatt;

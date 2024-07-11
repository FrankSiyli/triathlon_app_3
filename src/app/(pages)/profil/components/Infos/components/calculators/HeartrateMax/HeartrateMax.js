"use client";
import React, { useState } from "react";
import Alert from "@/app/components/Alerts/Alert";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";

function HeartrateMax({ setShowInfos }) {
  const [calculatorInput, setCalculatorInput] = useState("");
  const [tgOutput1, setTgOutput1] = useState("");
  const [tgOutput2, setTgOutput2] = useState("");
  const [tgOutput3, setTgOutput3] = useState("");
  const [tgOutput4, setTgOutput4] = useState("");
  const [tgOutput5, setTgOutput5] = useState("");
  const [anaerobicOutput, setAnaerobicOutput] = useState("");
  const [aerobicOutput, setAerobicOutput] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const calculatePercentages = () => {
    const a = parseFloat(calculatorInput);
    const b = a / 100;
    if (
      calculatorInput === "" ||
      calculatorInput < 100 ||
      calculatorInput > 300
    ) {
      setShowAlert(true);
    } else {
      setTgOutput1(`${Math.round(b * 50)} - ${Math.round(b * 60)}`);
      setTgOutput2(`${Math.round(b * 60)} - ${Math.round(b * 75)}`);
      setTgOutput3(`${Math.round(b * 75)} - ${Math.round(b * 85)}`);
      setTgOutput4(`${Math.round(b * 85)} - ${Math.round(b * 95)}`);
      setTgOutput5(`${Math.round(b * 95)} - ${Math.round(b * 100)}`);
      setAnaerobicOutput(Math.round(b * 85));
      setAerobicOutput(Math.round(b * 60));
      setCalculatorInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      calculatePercentages();
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
        <div className="w-11/12 border border-first/50 linear-background max-w-xl mx-auto rounded-md p-4 m-1  text-center">
          <p>
            Einem HRmax Test sollten mehrere Monate mit strukturiertem Training
            vorangehen.
          </p>
          <br />
          <p>
            Falls du in den letzten 6 Monaten bei einem Event einen All OUT
            Zielsprint angesetzt hast kannst du dir diese Puls-Werte gern mal
            genauer anschauen.
          </p>
          <br />
          <p>
            Der sicherste Weg um genaue Werte zu erhalten bleibt eine
            professionelle Leistungsdiagnostik.
          </p>
        </div>
        <div>
          <div className="max-w-xl mx-auto flex flex-col justify-center items-center ">
            {showAlert && (
              <Alert
                alertText="Bitte trage deine HRmax ein (100-300)"
                setShowAlert={setShowAlert}
              />
            )}
            <label className="label mt-10 ">
              <span className="label-text-alt text-first text-xl">
                Dein Maximalpuls in bpm
              </span>
            </label>

            <input
              type="number"
              placeholder="z.B. 185"
              className="input  border border-transparent mb-3 w-full max-w-xs"
              value={calculatorInput}
              onChange={(e) => setCalculatorInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              type="submit"
              className="btn btn-sm m-5 mx-auto btn-outline border border-alert hover:text-alert text-first"
              id="calculateBtn"
              onClick={calculatePercentages}
            >
              Berechnen
            </button>
          </div>
          <div className="overflow-x-auto flex justify-center">
            <table className="table table-xs table-pin-rows table-pin-cols m-1 max-w-xl text-first text-center border border-first/50">
              <thead className="text-first ">
                <tr className="bg-fourth">
                  <td>Zone</td>
                  <td className="w-20">HR in %</td>
                  <td>Target HR bpm</td>
                  <td>Thresholds bpm</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td id="zone5"> 5 Speed</td>
                  <td>95 - 100</td>
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
                  <td id="zone4">4 Anaerobic</td>
                  <td>85 - 95</td>
                  <td>
                    <input
                      className="w-20 "
                      type="text"
                      value={tgOutput4}
                      readOnly
                    />
                  </td>
                  <td>
                    Anaerobic <br />
                    <input
                      className="w-20 "
                      type="text"
                      value={anaerobicOutput}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone3">3 Aerobic</td>
                  <td>75 - 85</td>
                  <td>
                    <input
                      className="w-20 "
                      type="text"
                      value={tgOutput3}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone2">2 Base</td>
                  <td>60 - 75</td>
                  <td>
                    <input
                      className="w-20 "
                      type="text"
                      value={tgOutput2}
                      readOnly
                    />
                  </td>
                  <td>
                    Aerobic <br />
                    <input
                      className="w-20 "
                      type="text"
                      value={aerobicOutput}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td id="zone1">1 Warmup</td>
                  <td>50 - 60</td>
                  <td>
                    <input
                      className="w-20 "
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
}

export default HeartrateMax;

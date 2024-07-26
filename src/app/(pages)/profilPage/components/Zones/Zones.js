"use client";
import { showHrInputState } from "@/app/recoil/atoms/showHrInputState";
import { showSwimTimeInputState } from "@/app/recoil/atoms/showSwimTimeInputState";
import React from "react";
import { useRecoilState } from "recoil";
import HeartrateCalculator from "./components/HeartrateCalculator";
import SwimTimeCalculator from "./components/SwimTimeCalculator";
import WattCalculator from "./components/WattCalculator";
import { showWattInputState } from "@/app/recoil/atoms/user/showWattInputState";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import ArrowRightSvg from "@/app/components/SVGs/arrows/ArrowRightSvg";

const buttonValueArray = [
  {
    name: "Maximalpuls",
    secondName: "",
    click: "handleHrClick",
  },
  {
    name: "FTP",
    secondName: "(Functional Treshold Power)",
    click: "handleWattClick",
  },
  {
    name: "Schwimmzeit",
    secondName: "",
    click: "handleSwimTimeClick",
  },
];

function Zones({ setShowProfil }) {
  const [showHrInput, setShowHrInput] = useRecoilState(showHrInputState);
  const [showWattInput, setShowWattInput] = useRecoilState(showWattInputState);
  const [showSwimTimeInput, setShowSwimTimeInput] = useRecoilState(
    showSwimTimeInputState
  );

  const handleHrClick = () => {
    setShowHrInput(!showHrInput);
    setShowSwimTimeInput(false);
    setShowWattInput(false);
  };
  const handleWattClick = () => {
    setShowWattInput(!showWattInput);
    setShowHrInput(false);
    setShowSwimTimeInput(false);
  };
  const handleSwimTimeClick = () => {
    setShowSwimTimeInput(!showSwimTimeInput);
    setShowHrInput(false);
    setShowWattInput(false);
  };
  const handleBackClick = () => {
    setShowProfil();
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
      <p className=" mx-auto w-40 text-center -mt-10">Kalenderwerte</p>

      <div className="w-11/12 max-w-xl mt-10 mx-auto flex flex-col gap-2 justify-center content-center ">
        <div className="border border-first/50 rounded-md text-center p-3 linear-background ">
          Gib deine Werte an, um persönliche Werte im Kalender zu erhalten.
        </div>
      </div>

      <div className="relative max-w-xl w-full mt-5">
        {buttonValueArray.map((singleButtonValue, buttonIndex) => (
          <button
            key={buttonIndex}
            onClick={() => {
              if (singleButtonValue.click === "handleHrClick") {
                handleHrClick();
              } else if (singleButtonValue.click === "handleWattClick") {
                handleWattClick();
              } else if (singleButtonValue.click === "handleSwimTimeClick") {
                handleSwimTimeClick();
              }
            }}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
          >
            <div className="ml-5">
              {singleButtonValue.name}
              <span className="icon-text ml-1">
                {singleButtonValue.secondName}
              </span>
            </div>
            <ArrowRightSvg />
          </button>
        ))}
        {showHrInput && <HeartrateCalculator />}
        {showWattInput && <WattCalculator />}
        {showSwimTimeInput && <SwimTimeCalculator />}
      </div>
    </>
  );
}

export default Zones;

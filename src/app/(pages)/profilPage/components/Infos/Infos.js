"use client";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import ArrowRightSvg from "@/app/components/SVGs/arrows/ArrowRightSvg";
import React from "react";

function Infos({
  setShowProfil,
  setShowHeartrateByAge,
  setShowHeartrateMax,
  setShowPowerWatt,
}) {
  const handleBackClick = () => {
    setShowProfil();
  };
  const handleHeartrateByAgeClick = () => {
    setShowHeartrateByAge();
  };
  const handleHeartrateMaxClick = () => {
    setShowHeartrateMax();
  };
  const handlePowerWattClick = () => {
    setShowPowerWatt();
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
      <p className=" mx-auto w-40 text-center -mt-10 mb-10">Informationen</p>

      <>
        <button
          onClick={handleHeartrateByAgeClick}
          className="flex justify-between w-full max-w-xl  shadow-md p-2 rounded-md mx-5 my-1 "
        >
          <div className="ml-5">Maximalpuls nach Alter</div>
          <ArrowRightSvg />
        </button>
        <button
          onClick={handleHeartrateMaxClick}
          className="flex justify-between w-full max-w-xl  shadow-md p-2 rounded-md mx-5 my-1 "
        >
          <div className="ml-5">Pulszonen</div>
          <ArrowRightSvg />
        </button>
        <button
          onClick={handlePowerWattClick}
          className="flex justify-between w-full max-w-xl  shadow-md p-2 rounded-md mx-5 my-1 "
        >
          <div className="ml-5">Wattzonen</div>
          <ArrowRightSvg />
        </button>
      </>
    </>
  );
}

export default Infos;

"use client";
import React, { useState } from "react";
import BicycleSvg from "@/app/components/SVGs/BicycleSvg";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import NewPlanAppLibrarySingleSessions from "./NewPlanAppLibrarySingleSessions";
import ShoeSvg from "@/app/components/SVGs/ShoeSvg";
import SwimSvg from "@/app/components/SVGs/SwimSvg";
import OthersSvg from "@/app/components/SVGs/OthersSvg";
import FasciaRollSvg from "@/app/components/SVGs/FasciaRollSvg";
import YogaSvg from "@/app/components/SVGs/YogaSvg";
import StabiSvg from "@/app/components/SVGs/StabiSvg";
import { newPlanClickedSessionTypeState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeState";
import { useRecoilState } from "recoil";

const swimSessionTypes = [
  { name: "500er", sessionType: "swim500er" },
  { name: "Einheiten für Beginner", sessionType: "swimBeginner" },
  { name: "Steigerungen", sessionType: "swimIncreases" },
  { name: "Tempowechsel", sessionType: "swimPaceChange" },
  { name: "Tabata", sessionType: "swimTabata" },
  { name: "Technik", sessionType: "swimTechnique" },
  { name: "Tempo", sessionType: "swimTempo" },
];

const bikeSessionTypes = [
  { name: "Einheiten für Beginner", sessionType: "bikeBeginner" },
  { name: "Leichte Einheiten", sessionType: "bikeLit" },
  { name: "Mittlere Einheiten", sessionType: "bikeMit" },
  { name: "Harte Einheiten", sessionType: "bikeHit" },
];

const runSessionTypes = [
  { name: "Einheiten für Beginner", sessionType: "runBeginner" },
  { name: "Aufbau", sessionType: "runConstruction" },
  { name: "Endbeschleunigung", sessionType: "runFinalAcceleration" },
  { name: "Intervalle", sessionType: "runIntervals" },
  { name: "Tempowechsel", sessionType: "runPaceChange" },
  { name: "Technik", sessionType: "runTechnique" },
  { name: "Tempo", sessionType: "runTempo" },
  { name: "Zone2", sessionType: "runZ2" },
  { name: "Zone3", sessionType: "runZ3" },
  { name: "Zone4", sessionType: "runZ4" },
];

const othersTypes = [
  { name: "Andere", sessionType: "others" },
];

const YogaSessionTypes = [
  { name: "Yoga", sessionType: "yogaSessions" },
];

const StabiSessionTypes = [
  { name: "Stabi", sessionType: "stabi" },
];

const fasciaSessionTypes = [
  { name: "Faszienrolle", sessionType: "fascia" },
];

const sessionTypeData = {
  bike: { types: bikeSessionTypes, icon: <BicycleSvg /> },
  run: { types: runSessionTypes, icon: <ShoeSvg /> },
  swim: { types: swimSessionTypes, icon: <SwimSvg /> },
  others: { types: othersTypes, icon: <OthersSvg /> },
  fascia: { types: fasciaSessionTypes, icon: <FasciaRollSvg /> },
  yoga: { types: YogaSessionTypes, icon: <YogaSvg /> },
  stabi: { types: StabiSessionTypes, icon: <StabiSvg /> },
};

const SessionType = ({ sessionTypes, singleSessions, isLoading }) => {
  const [showSingleSessions, setShowSingleSessions] = useState(false);
  const [clickedSessionType, setClickedSessionType] = useState(null);

  const handleSessionTypeClick = (index) => {
    if (clickedSessionType === index) {
      setShowSingleSessions(!showSingleSessions);
    } else {
      setShowSingleSessions(true);
      setClickedSessionType(index);
    }
  };

  return (
    <div className="flex flex-col items-center w-full rounded text-s">
      {sessionTypes.map((sessionType, index) => (
        <div
          key={index}
          className="flex flex-col w-full rounded cursor-pointer shadow m-0.5 first:mt-2 last:mb-2"
        >
          <div
            onClick={() => handleSessionTypeClick(index)}
            className="flex justify-between p-1 items-center rounded bg-first/70"
          >
            <span className="border border-alert rounded-full p-0.5 bg-alert"></span>
            <p>{sessionType.name}</p>
            {clickedSessionType === index && showSingleSessions ? (
              <ArrowUpSvg />
            ) : (
              <ArrowDownSvg />
            )}
          </div>
          {clickedSessionType === index && showSingleSessions && (
            isLoading ? (
              <span className="loading loading-ring loading-sm m-5"></span>
            ) : (
              <NewPlanAppLibrarySingleSessions
                singleSessions={singleSessions}
                sessionType={sessionType}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

const SessionUnderCategories = ({ singleSessions, isLoading }) => {
  const [newPlanClickedSessionType] = useRecoilState(newPlanClickedSessionTypeState);
  const { types, icon } = sessionTypeData[newPlanClickedSessionType] || { types: [], icon: null };

  return (
    <>
      {icon && (
        <>
        
          <SessionType
            sessionTypes={types}
            singleSessions={singleSessions}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default SessionUnderCategories;

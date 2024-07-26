"use client";
import React, { useState } from "react";
import BicycleSvg from "@/app/components/SVGs/BicycleSvg";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import ShoeSvg from "@/app/components/SVGs/ShoeSvg";
import SwimSvg from "@/app/components/SVGs/SwimSvg";
import OthersSvg from "@/app/components/SVGs/OthersSvg";
import FasciaRollSvg from "@/app/components/SVGs/FasciaRollSvg";
import YogaSvg from "@/app/components/SVGs/YogaSvg";
import StabiSvg from "@/app/components/SVGs/StabiSvg";
import { useRecoilState } from "recoil";
import SingleSessions from "../menu 3 singleSessions/SingleSessions";
import { clickedSessionCategoryState } from "@/app/recoil/atoms/addSession/clickedSessionCategoryState";

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

const SessionType = ({ sessionUnderCategories, singleSessions, isLoading }) => {
  const [showSingleSessions, setShowSingleSessions] = useState(false);
  const [clickedSessionUnderCategory, setClickedSessionUnderCategory] = useState(null);

  const handleSessionUnderCategoryClick = (index) => {
    setClickedSessionUnderCategory(prevIndex => {
      if (prevIndex === index) {
        setShowSingleSessions(prevShow => !prevShow);
        return index;
      } else {
        setShowSingleSessions(true);
        return index;
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full rounded text-s">
      {sessionUnderCategories.map((sessionUnderCategory, index) => (
        <div
          key={index}
          className={`flex flex-col w-full rounded cursor-pointer shadow m-0.5 first:mt-2 last:mb-2 bg-first/60 ${clickedSessionUnderCategory === index && showSingleSessions ? 'border border-alert' : ''}`}
        >
          <div
            onClick={() => handleSessionUnderCategoryClick(index)}
            className="flex justify-between p-1 items-center rounded bg-first/70"
          >
            <span className="border border-alert rounded-full p-0.5 bg-alert"></span>
            <p>{sessionUnderCategory.name}</p>
            {clickedSessionUnderCategory === index && showSingleSessions ? (
              <span className="mr-1 scale-95"><ArrowUpSvg /></span>
            ) : (
              <span className="mr-1 scale-95"><ArrowDownSvg /></span>
            )}
          </div>
          {clickedSessionUnderCategory === index && showSingleSessions && (
            isLoading ? (
              <span className="loading loading-ring loading-sm m-5"></span>
            ) : (
              <SingleSessions
                singleSessions={singleSessions}
                sessionUnderCategory={sessionUnderCategory}
                showSingleSessions={showSingleSessions}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

const SessionUnderCategories = ({ singleSessions, isLoading }) => {
  const [newPlanClickedSessionUnderCategory] = useRecoilState(clickedSessionCategoryState);
  const { types, icon } = sessionTypeData[newPlanClickedSessionUnderCategory] || { types: [], icon: null };

  return (
    <>
      {icon && (
        <>
          <SessionType
            sessionUnderCategories={types}
            singleSessions={singleSessions}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default SessionUnderCategories;

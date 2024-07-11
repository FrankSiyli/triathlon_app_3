"use client";
import React, { useState } from "react";
import BicycleSvg from "@/app/components/SVGs/BicycleSvg";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import NewPlanAppLibrarySingleSessions from "./NewPlanAppLibrarySingleSessions";
import ShoeSvg from "@/app/components/SVGs/ShoeSvg";
import { newPlanClickedSessionTypeState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeState";
import { useRecoilState } from "recoil";
import SwimSvg from "@/app/components/SVGs/SwimSvg";
import OthersSvg from "@/app/components/SVGs/OthersSvg";
import FasciaRollSvg from "@/app/components/SVGs/FasciaRollSvg";
import YogaSvg from "@/app/components/SVGs/YogaSvg";
import StabiSvg from "@/app/components/SVGs/StabiSvg";

const SessionType = ({
  sessionTypes,
  singleSessions,
  iconComponent,
  isLoading,
}) => {
  const [showSingleSessions, setShowSingleSessions] = useState(false);
  const [clickedSessionType, setClickedSessionType] = useState(null);
  const [clickedSingleSession, setClickedSingleSession] = useState(-1);

  const handleSessionTypeClick = (sessionTypeIndex) => {
    if (clickedSessionType === sessionTypeIndex) {
      setShowSingleSessions(!showSingleSessions);
    } else {
      setShowSingleSessions(true);
      setClickedSessionType(sessionTypeIndex);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 w-full max-w-xl">
      {sessionTypes.map((sessionType, sessionTypeIndex) => (
        <div
          key={sessionTypeIndex}
          className="flex flex-col w-full max-w-xl cursor-pointer shadow-md p-1 rounded-md "
        >
          <div
            onClick={() => handleSessionTypeClick(sessionTypeIndex)}
            className="flex justify-between items-center"
          >
            <span className="ml-5">{iconComponent}</span>
            <p>{sessionType.name}</p>
            {clickedSessionType === sessionTypeIndex && showSingleSessions ? (
              <ArrowUpSvg />
            ) : (
              <ArrowDownSvg />
            )}
          </div>

          {clickedSessionType === sessionTypeIndex &&
            showSingleSessions &&
            (isLoading ? (
              <span className="loading loading-ring loading-sm m-5"></span>
            ) : (
              <NewPlanAppLibrarySingleSessions
                singleSessions={singleSessions}
                clickedSingleSession={clickedSingleSession}
                sessionType={sessionType}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

const NewPlanAppLibrarySessionTypes = ({ singleSessions, isLoading }) => {
  const [newPlanClickedSessionType, setNewPlanClickedSessionType] =
    useRecoilState(newPlanClickedSessionTypeState);
  return (
    <>
      {newPlanClickedSessionType === "bike" && (
        <SessionType
          sessionTypes={bikeSessionTypes}
          singleSessions={singleSessions}
          iconComponent={<BicycleSvg />}
          isLoading={isLoading}
        />
      )}
      {newPlanClickedSessionType === "run" && (
        <SessionType
          sessionTypes={runSessionTypes}
          singleSessions={singleSessions}
          iconComponent={<ShoeSvg />}
          isLoading={isLoading}
        />
      )}
      {newPlanClickedSessionType === "swim" && (
        <SessionType
          sessionTypes={swimSessionTypes}
          singleSessions={singleSessions}
          iconComponent={<SwimSvg />}
          isLoading={isLoading}
        />
      )}
      {newPlanClickedSessionType === "others" && (
        <SessionType
          sessionTypes={othersTypes}
          singleSessions={singleSessions}
          iconComponent={<OthersSvg />}
          isLoading={isLoading}
        />
      )}
      {newPlanClickedSessionType === "fascia" && (
        <SessionType
          sessionTypes={fasciaSessionTypes}
          singleSessions={singleSessions}
          iconComponent={<FasciaRollSvg />}
          isLoading={isLoading}
        />
      )}
      {newPlanClickedSessionType === "yoga" && (
        <SessionType
          sessionTypes={YogaSessionTypes}
          singleSessions={singleSessions}
          iconComponent={<YogaSvg />}
          isLoading={isLoading}
        />
      )}
      {newPlanClickedSessionType === "stabi" && (
        <SessionType
          sessionTypes={StabiSessionTypes}
          singleSessions={singleSessions}
          iconComponent={<StabiSvg />}
          isLoading={isLoading}
        />
      )}
      {/*  {newPlanClickedSessionType === "yogaSingleExercises" && (
        <SessionType
          sessionTypes={yogaSingleExercisesTypes}
          singleSessions={singleSessions}
          iconComponent={<ShoeSvg />}
        />
      )} */}
    </>
  );
};

export default NewPlanAppLibrarySessionTypes;

const swimSessionTypes = [
  {
    name: "500er",
    sessionType: "swim500er",
  },
  {
    name: "Einheiten für Beginner",
    sessionType: "swimBeginner",
  },
  {
    name: "Steigerungen",
    sessionType: "swimIncreases",
  },
  {
    name: "Tempowechsel",
    sessionType: "swimPaceChange",
  },
  {
    name: "Tabata",
    sessionType: "swimTabata",
  },
  {
    name: "Technik",
    sessionType: "swimTechnique",
  },
  {
    name: "Tempo",
    sessionType: "swimTempo",
  },
];
const bikeSessionTypes = [
  {
    name: "Einheiten für Beginner",
    sessionType: "bikeBeginner",
  },
  {
    name: "Leichte Einheiten",
    sessionType: "bikeLit",
  },
  {
    name: "Mittlere Einheiten",
    sessionType: "bikeMit",
  },
  {
    name: "Harte Einheiten",
    sessionType: "bikeHit",
  },
];
const runSessionTypes = [
  {
    name: "Einheiten für Beginner",
    sessionType: "runBeginner",
  },
  {
    name: "Aufbau",
    sessionType: "runConstruction",
  },
  {
    name: "Endbeschleunigung",
    sessionType: "runFinalAcceleration",
  },
  {
    name: "Intervalle",
    sessionType: "runIntervals",
  },
  {
    name: "Tempowechsel",
    sessionType: "runPaceChange",
  },
  {
    name: "Technik",
    sessionType: "runTechnique",
  },
  {
    name: "Tempo",
    sessionType: "runTempo",
  },
  {
    name: "Zone2",
    sessionType: "runZ2",
  },
  {
    name: "Zone3",
    sessionType: "runZ3",
  },
  {
    name: "Zone4",
    sessionType: "runZ4",
  },
];

const othersTypes = [
  {
    name: "Andere",
    sessionType: "others",
  },
];

const YogaSessionTypes = [
  {
    name: "Yoga",
    sessionType: "yogaSessions",
  },
];
const StabiSessionTypes = [
  {
    name: "Stabi",
    sessionType: "stabi",
  },
];
const fasciaSessionTypes = [
  {
    name: "Faszienrolle",
    sessionType: "fascia",
  },
];
/* const yogaSingleExerciseTypes = [
  {
    name: "Yoga Einzelübungen",
    sessionType: "yogaSingleExercises",
  },
]; */

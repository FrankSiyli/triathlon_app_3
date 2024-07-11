"use client";
import React, { useState } from "react";
import NewPlanSessionBuildTypes from "../newPlanChooseSessionSource/NewPlanChooseSessionSource";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import SwimSvg from "@/app/components/SVGs/SwimSvg";
import BicycleSvg from "@/app/components/SVGs/BicycleSvg";
import ShoeSvg from "@/app/components/SVGs/ShoeSvg";
import YogaSvg from "@/app/components/SVGs/YogaSvg";
import StabiSvg from "@/app/components/SVGs/StabiSvg";
import FasciaRollSvg from "@/app/components/SVGs/FasciaRollSvg";
import OthersSvg from "@/app/components/SVGs/OthersSvg";
import { newPlanClickedSessionTypeState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeState";
import { useRecoilState } from "recoil";
import { newPlanClickedSessionTypeApiState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeApiState";

const sessionTypes = [
  {
    type: "swim",
    component: <SwimSvg />,
    label: "Schwimmen",
    api: "/api/planBuilder/fetchAllSwimSessions",
  },
  {
    type: "bike",
    component: <BicycleSvg />,
    label: "Rad",
    api: "/api/planBuilder/fetchAllBikeSessions",
  },
  {
    type: "run",
    component: <ShoeSvg />,
    label: "Laufen",
    api: "/api/planBuilder/fetchAllRunSessions",
  },
  {
    type: "yoga",
    component: <YogaSvg />,
    label: "Yoga",
    api: "/api/planBuilder/fetchAllYogaSessions",
  },
  {
    type: "stabi",
    component: <StabiSvg />,
    label: "Stabi",
    api: "/api/planBuilder/fetchAllStabiSessions",
  },
  {
    type: "fascia",
    component: <FasciaRollSvg />,
    label: "Faszienrolle",
    api: "/api/planBuilder/fetchAllFasciaSessions",
  },
  {
    type: "others",
    component: <OthersSvg />,
    label: "Andere",
    api: "/api/planBuilder/fetchAllOthersSessions",
  },
];

const NewPlanSessionTypes = ({
  showAlert,
  setShowAlert,
  error,
  setError,
  setActiveComponent,
}) => {
  const [newPlanClickedSessionType, setNewPlanClickedSessionType] =
    useRecoilState(newPlanClickedSessionTypeState);
  const [newPlanClickedSessionTypeApi, setNewPlanClickedSessionTypeApi] =
    useRecoilState(newPlanClickedSessionTypeApiState);

  const [sessionTypeClicked, setSessionTypeClicked] = useState(
    new Array(sessionTypes.length).fill(false)
  );
  const handleSessionTypeClick = (sessionTypeIndex, type, api) => {
    setSessionTypeClicked((prevClicked) => {
      const newClicked = new Array(sessionTypes.length).fill(false);
      newClicked[sessionTypeIndex] = !prevClicked[sessionTypeIndex];
      return newClicked;
    });
    setNewPlanClickedSessionType(type);
    setNewPlanClickedSessionTypeApi(api);
  };

  return (
    <>
      {sessionTypes.map((sessionType, sessionTypeIndex) => (
        <div
          key={sessionTypeIndex}
          onClick={() =>
            handleSessionTypeClick(
              sessionTypeIndex,
              sessionType.type,
              sessionType.api
            )
          }
          className="flex flex-col shadow-md p-1 my-0.5 rounded-md  bg-fourth/5"
        >
          <div className="flex min-h-8 w-full items-center justify-between cursor-pointer">
            <span className="ml-2">{sessionType.component}</span>
            <p className="ml-4 text-sm">{sessionType.label}</p>
            {sessionTypeClicked[sessionTypeIndex] ? (
              <ArrowUpSvg />
            ) : (
              <ArrowDownSvg />
            )}
          </div>
          {sessionTypeClicked[sessionTypeIndex] && (
            <div className="w-full mx-auto mt-2 text-sm">
              <hr className="opacity-10 mx-1" />
              <NewPlanSessionBuildTypes
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                error={error}
                setError={setError}
                setActiveComponent={setActiveComponent}
              />
              {/* to NewPlanAppLibrary ||  NewPlanNewSession || NewPlanMyTemplates*/}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NewPlanSessionTypes;

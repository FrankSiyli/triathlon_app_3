"use client";
import React, { useState } from "react";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import SwimSvg from "@/app/components/SVGs/SwimSvg";
import BicycleSvg from "@/app/components/SVGs/BicycleSvg";
import ShoeSvg from "@/app/components/SVGs/ShoeSvg";
import YogaSvg from "@/app/components/SVGs/YogaSvg";
import StabiSvg from "@/app/components/SVGs/StabiSvg";
import FasciaRollSvg from "@/app/components/SVGs/FasciaRollSvg";
import OthersSvg from "@/app/components/SVGs/OthersSvg";
import { useRecoilState } from "recoil";
import { newPlanClickedSessionTypeState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeState";
import { newPlanClickedSessionTypeApiState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeApiState";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import SessionUnderCategories from "../newPlanAppLibrary/components/SessionUnderCategories";

const sessionTypes = [
  { type: "swim", component: <SwimSvg />, label: "Schwimmen", api: "/api/planBuilder/fetchAllSwimSessions" },
  { type: "bike", component: <BicycleSvg />, label: "Rad", api: "/api/planBuilder/fetchAllBikeSessions" },
  { type: "run", component: <ShoeSvg />, label: "Laufen", api: "/api/planBuilder/fetchAllRunSessions" },
  { type: "yoga", component: <YogaSvg />, label: "Yoga", api: "/api/planBuilder/fetchAllYogaSessions" },
  { type: "stabi", component: <StabiSvg />, label: "Stabi", api: "/api/planBuilder/fetchAllStabiSessions" },
  { type: "fascia", component: <FasciaRollSvg />, label: "Faszienrolle", api: "/api/planBuilder/fetchAllFasciaSessions" },
  { type: "others", component: <OthersSvg />, label: "Andere", api: "/api/planBuilder/fetchAllOthersSessions" },
];

const NewPlanSessionTypes = ({ isLoading, singleSessions, showAlert, setShowAlert, error, setError, setActiveComponent }) => {
  const [newPlanClickedSessionType, setNewPlanClickedSessionType] = useRecoilState(newPlanClickedSessionTypeState);
  const [newPlanClickedSessionTypeApi, setNewPlanClickedSessionTypeApi] = useRecoilState(newPlanClickedSessionTypeApiState);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleSessionTypeClick = (index, type, api) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    setNewPlanClickedSessionType(type);
    setNewPlanClickedSessionTypeApi(api);
  };

  return (
    <>
      {sessionTypes.map((sessionType, index) => (
        <div key={index} className="flex flex-col justify-center items-center p-0.5 w-full">
          <div
            onClick={() => handleSessionTypeClick(index, sessionType.type, sessionType.api)}
            className={`flex w-full items-center justify-between cursor-pointer text-s shadow p-1 m-1 border-alert/30 rounded bg-first border-t-2 ${getActivityBorderColor(sessionType.label)}`}
          >
            <span>{sessionType.component}</span>
            <p>{sessionType.label}</p>
            {activeIndex === index ? <ArrowUpSvg /> : <ArrowDownSvg />}
          </div>
          {activeIndex === index && (
            <SessionUnderCategories
              isLoading={isLoading}
              singleSessions={singleSessions}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default NewPlanSessionTypes;

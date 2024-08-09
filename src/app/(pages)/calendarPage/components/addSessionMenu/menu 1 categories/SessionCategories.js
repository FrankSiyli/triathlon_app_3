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
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import SessionUnderCategories from "../menu 2 underCategories/SessionUnderCategories";
import { clickedSessionCategoryState } from "@/app/recoil/atoms/addSession/clickedSessionCategoryState";
import { clickedSessionCategoryApiState } from "@/app/recoil/atoms/addSession/clickedSessionCategoryApiState";

const sessionCategoriesArray = [
  { type: "swim", component: <SwimSvg />, label: "Schwimmen", api: "/api/addSessions/fetchAllSwimSessions" },
  { type: "bike", component: <BicycleSvg />, label: "Rad", api: "/api/addSessions/fetchAllBikeSessions" },
  { type: "run", component: <ShoeSvg />, label: "Laufen", api: "/api/addSessions/fetchAllRunSessions" },
  { type: "yoga", component: <YogaSvg />, label: "Yoga", api: "/api/addSessions/fetchAllYogaSessions" },
  { type: "stabi", component: <StabiSvg />, label: "Stabi", api: "/api/addSessions/fetchAllStabiSessions" },
  { type: "fascia", component: <FasciaRollSvg />, label: "Faszienrolle", api: "/api/planaddSessionsBuilder/fetchAllFasciaSessions" },
  { type: "others", component: <OthersSvg />, label: "Andere", api: "/api/addSessions/fetchAllOthersSessions" },
];

const SessionCategories = ({ isLoading, singleSessions }) => {
  const [, setClickedSessionType] = useRecoilState(clickedSessionCategoryState);
  const [, setClickedSessionTypeApi] = useRecoilState(clickedSessionCategoryApiState);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index, type, api) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    setClickedSessionType(type);
    setClickedSessionTypeApi(api);
  };

  return (
    <div>
      {sessionCategoriesArray.map((sessionType, index) => (
        <div key={index} className={`flex flex-col justify-center items-center p-1 w-full ${index === 0 ? 'mt-16' : ''}`}>
          <div
            onClick={() => handleClick(index, sessionType.type, sessionType.api)}
            className={`flex w-full h-10 items-center justify-between cursor-pointer text-s shadow p-1 rounded bg-first border-l ${getActivityBorderColor(sessionType.label)}`}
          >
            <span>{sessionType.component}</span>
            <p>{sessionType.label}</p>
            {activeIndex === index ? <ArrowUpSvg /> : <ArrowDownSvg />}
          </div>
          {activeIndex === index && (
            <SessionUnderCategories isLoading={isLoading} singleSessions={singleSessions} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionCategories;

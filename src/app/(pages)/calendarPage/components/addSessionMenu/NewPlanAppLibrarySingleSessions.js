"use client";
import React, { useState } from "react";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useRecoilState } from "recoil";
import { newPlanClickedWeekState } from "@/app/recoil/atoms/planBuilder/newPlanClickedWeekState";
import { newPlanNumberOfPlanWeeksState } from "@/app/recoil/atoms/planBuilder/newPlanNumberOfPlanWeeks";
import { newPlanState } from "@/app/recoil/atoms/planBuilder/newPlanState";
import NewPlanAppLibrarySingleSessionParts from "./NewPlanAppLibrarySingleSessionParts";

const NewPlanAppLibrarySingleSessions = ({ singleSessions, sessionType }) => {
  const [showSessionParts, setShowSessionParts] = useState({});
  const [newPlanWeek] = useRecoilState(newPlanClickedWeekState);
  const [newPlanNumberOfPlanWeeks] = useRecoilState(newPlanNumberOfPlanWeeksState);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [newPlan, setNewPlan] = useRecoilState(newPlanState);

  const handleSingleSessionClick = (index) => {
    setShowSessionParts(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddSessionClick = () => {
    setNewPlan({
      ...newPlan,
      weeks: Array.from({ length: newPlanNumberOfPlanWeeks }, () => []),
    });
    setHomepagePlan({});
  };

  return (
    <div className="mt-2 flex flex-col items-center">
      {singleSessions
        .filter(session => session?.sessionType === sessionType?.sessionType)
        .map((session, index) => (
          <div
            key={index}
            onClick={() => handleSingleSessionClick(index)}
            className="flex flex-col w-full mt-0.5 shadow p-1 text-sm rounded-md bg-fourth/5 cursor-pointer"
          >
            <div className="min-h-8 flex flex-col justify-between items-center">
              <div className="flex justify-between items-center w-full ml-3">
                <p className="text-s">{session.description}</p>
                {showSessionParts[index] ? <ArrowUpSvg /> : <ArrowDownSvg />}
              </div>
              <div className="flex justify-start w-full ml-2 mt-1 text-xs text-alert gap-3">
                {calculateTotalDuration(session) > 0 && (
                  <div className="flex items-center">
                    <WatchSvg />
                    {formatTime(calculateTotalDuration(session))}
                  </div>
                )}
                {calculateTotalDistance(session) > 0 && calculateTotalDuration(session) > 0 && <span>+</span>}
                {calculateTotalDistance(session) > 0 && (
                  <div className="flex items-center">
                    <DistanceSvg />
                    {calculateTotalDistance(session)}m
                  </div>
                )}
              </div>
            </div>
            {showSessionParts[index] && (
              <>
                <NewPlanAppLibrarySingleSessionParts singleSession={session} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddSessionClick();
                  }}
                  className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
                >
                  Hinzufügen
                </button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default NewPlanAppLibrarySingleSessions;

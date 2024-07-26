"use client";
import React, { useState } from "react";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import NewPlanAppLibrarySingleSessionParts from "./NewPlanAppLibrarySingleSessionParts";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useRecoilState } from "recoil";
import { newPlanClickedWeekState } from "@/app/recoil/atoms/planBuilder/newPlanClickedWeekState";
import { newPlanClickedDayState } from "@/app/recoil/atoms/planBuilder/newPlanClickedDayState";
import { newPlanNumberOfPlanWeeksState } from "@/app/recoil/atoms/planBuilder/newPlanNumberOfPlanWeeks";
import { newPlanState } from "@/app/recoil/atoms/planBuilder/newPlanState";

const NewPlanAppLibrarySingleSessions = ({ singleSessions, sessionType }) => {
  const [showSessionParts, setShowSessionParts] = useState({});
  const [newPlanWeek] = useRecoilState(newPlanClickedWeekState);
  const [newPlanNumberOfPlanWeeks] = useRecoilState(
    newPlanNumberOfPlanWeeksState
  );
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [newPlan, setNewPlan] = useRecoilState(newPlanState);

  const handleSingleSessionClick = (singleSessionIndex) => {
    setShowSessionParts((prevShowSessionParts) => ({
      ...prevShowSessionParts,
      [singleSessionIndex]: !prevShowSessionParts[singleSessionIndex],
    }));
  };

  const handleAddSessionClick = (singleSession) => {
    setNewPlan((prevPlan) => {
      const newWeeks = Array.from(
        { length: newPlanNumberOfPlanWeeks },
        () => []
      );
      return {
        ...prevPlan,
        weeks: newWeeks,
      };
    });
    setHomepagePlan(() => {});
  };

  console.log("NewPlanAppLibrarySingleSessions newplan", newPlan);

  return (
    <div className="mt-2 flex flex-col items-center">
      {singleSessions
        .filter((session) => session?.sessionType === sessionType?.sessionType)
        .map((singleSession, singleSessionIndex) => (
          <div
            key={singleSessionIndex}
            onClick={() => handleSingleSessionClick(singleSessionIndex)}
            className="flex flex-col w-full mt-0.5 shadow p-1 text-sm rounded-md bg-fourth/5"
          >
            <div className="min-h-8 flex flex-col justify-between items-center">
              <div className="flex justify-between items-center w-full ml-3">
                <p className="text-s">{singleSession.description}</p>
                <span>
                  {showSessionParts[singleSessionIndex] ? (
                    <ArrowUpSvg />
                  ) : (
                    <ArrowDownSvg />
                  )}
                </span>
              </div>
              <div className="flex justify-start w-full ml-2 mt-1 text-xs text-alert gap-3">
                {calculateTotalDuration(singleSession) > 0 && (
                  <div className="flex items-center">
                    <WatchSvg />
                    {formatTime(calculateTotalDuration(singleSession))}
                  </div>
                )}

                {calculateTotalDistance(singleSession) > 0 &&
                  calculateTotalDuration(singleSession) > 0 && <span>+</span>}

                {calculateTotalDistance(singleSession) > 0 && (
                  <div className="flex items-center">
                    <DistanceSvg />
                    {calculateTotalDistance(singleSession)}m
                  </div>
                )}
              </div>
            </div>
            {showSessionParts[singleSessionIndex] && (
              <>
                <NewPlanAppLibrarySingleSessionParts
                  singleSession={singleSession}
                />
                <button
                  onClick={() => handleAddSessionClick(singleSession)}
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

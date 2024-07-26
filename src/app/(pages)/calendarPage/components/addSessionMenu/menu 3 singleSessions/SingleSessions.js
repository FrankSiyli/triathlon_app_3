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
import { newPlanNumberOfPlanWeeksState } from "@/app/recoil/atoms/planBuilder/newPlanNumberOfPlanWeeks";
import { newPlanState } from "@/app/recoil/atoms/planBuilder/newPlanState";
import SingleSessionParts from "../menu 4 singleSessionParts/SingleSessionParts";

const SingleSessions = ({ singleSessions, sessionUnderCategory }) => {
  const [showSessionParts, setShowSessionParts] = useState({});
  const [, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [newPlan, setNewPlan] = useRecoilState(newPlanState);
  const [newPlanNumberOfPlanWeeks] = useRecoilState(
    newPlanNumberOfPlanWeeksState
  );

  const toggleSessionParts = (index) => {
    setShowSessionParts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addSessionToPlan = () => {
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      weeks: Array.from({ length: newPlanNumberOfPlanWeeks }, () => []),
    }));
    setHomepagePlan({});
  };

  return (
    <div className={`mt-2 flex flex-col items-center `}>
      {singleSessions
        .filter(
          (session) => session.sessionType === sessionUnderCategory.sessionType
        )
        .map((session, index) => (
          <div
            key={index}
            onClick={() => toggleSessionParts(index)}
            className="flex flex-col w-full mt-1 shadow rounded cursor-pointer bg-first/40"
          >
            <div className="flex flex-col justify-between items-center">
              <div className="flex justify-between items-center w-full ml-1">
                <p className="text-s ml-1">{session.description}</p>
                <span className="mr-3 scale-90">
                  {" "}
                  {showSessionParts[index] ? <ArrowUpSvg /> : <ArrowDownSvg />}
                </span>
              </div>
              <div className="flex justify-start w-full ml-2 mt-1 text-xs text-alert gap-2">
                {calculateTotalDuration(session) > 0 && (
                  <div className="flex items-center">
                    <WatchSvg />
                    {formatTime(calculateTotalDuration(session))}
                  </div>
                )}
                {calculateTotalDistance(session) > 0 && (
                  <>
                    {calculateTotalDuration(session) > 0 && <span>+</span>}
                    <div className="flex items-center">
                      <DistanceSvg />
                      {calculateTotalDistance(session)}m
                    </div>
                  </>
                )}
              </div>
            </div>
            {showSessionParts[index] && (
              <>
                <SingleSessionParts singleSession={session} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addSessionToPlan();
                  }}
                  className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-alert hover:text-alert/30 bg-first"
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

export default SingleSessions;

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

const NewPlanAppLibrarySingleSessions = ({ singleSessions, sessionType }) => {
  const [showSessionParts, setShowSessionParts] = useState({});

  const handleSingleSessionClick = (singleSessionIndex) => {
    const newShowSessionParts = {};
    Object.keys(showSessionParts).forEach((index) => {
      newShowSessionParts[index] = false;
    });
    newShowSessionParts[singleSessionIndex] =
      !showSessionParts[singleSessionIndex];
    setShowSessionParts(newShowSessionParts);
  };

  const handleAddSessionClick = (singleSession) => {};

  return (
    <>
      <div className="mt-2 flex flex-col items-center">
        {singleSessions
          .filter(
            (session) => session?.sessionType === sessionType?.sessionType
          )
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
                  {calculateTotalDuration(singleSession) > 0 ? (
                    <div className="flex items-center">
                      <WatchSvg />
                      {formatTime(calculateTotalDuration(singleSession))}
                    </div>
                  ) : null}

                  {calculateTotalDistance(singleSession) > 0 &&
                  calculateTotalDuration(singleSession) > 0 ? (
                    <span>+</span>
                  ) : null}

                  {calculateTotalDistance(singleSession) > 0 ? (
                    <div className="flex items-center">
                      <DistanceSvg />
                      {calculateTotalDistance(singleSession)}m
                    </div>
                  ) : null}
                </div>
              </div>
              {showSessionParts[singleSessionIndex] && (
                <>
                  <NewPlanAppLibrarySingleSessionParts
                    singleSession={singleSession}
                  />
                  <button
                    onClick={handleAddSessionClick(singleSession)}
                    className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
                  >
                    Hinzufügen
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default NewPlanAppLibrarySingleSessions;

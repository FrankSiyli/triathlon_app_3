import React, { useState } from "react";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import PlusSvg from "@/app/components/SVGs/PlusSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useRecoilState } from "recoil";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import { useOpenOverlay } from "../../../stateHooks/useOpenOverlay";
import SessionOverlay from "../../sessionOverlay/SessionOverlay";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";

const Day = ({ day, activities, activeDay, setActiveDay }) => {
  const [showAddSessionMenu, setShowAddSessionMenu] = useRecoilState(showAddSessionMenuState);
  const { openOverlay, toggleOverlay } = useOpenOverlay();
  const [homepagePlan] = useRecoilState(homepagePlanState);

  const allDaySessionsDone = activities.every(activity =>
    activity.sessionParts?.every(part =>
      ["warmUp", "main", "coolDown"].every(partType =>
        part[partType]?.every(session => session.isDone)
      )
    )
  );

  const handleAddSessionClick = () => setShowAddSessionMenu(true);

  return (
    <>
      <div
        className={`shadow-md bg-fourth/10 py-1 mb-1 ${allDaySessionsDone ? "border-l-2 border-r-2 border-green" : ""}`}
      >
        <div className="ml-1 text-s text-fifth/80">{day}</div>
      </div>

      {activities.length > 0 && activities.map(activity => {
        const totalDistance = calculateTotalDistance(activity);
        const totalDuration = calculateTotalDuration(activity);
        const isOpen = openOverlay === activity._id.$oid;

        return (
          <div key={activity._id.$oid} className="ml-1  m-1">
            <div
              className={`cursor-pointer shadow border-t-2 ${getActivityBorderColor(activity.activity)}`}
              onClick={() => !isOpen && toggleOverlay(activity._id.$oid)}
            >
              <div className="text-xs py-1 ml-1">
                <p>{activity.activity}</p>
                <p className="text-s">{activity.description}</p>
              </div>
              <div className="text-xs ml-1 my-2 flex items-center">
                {totalDistance > 0 && (
                  <div className="flex items-center">
                    <DistanceSvg />
                    {totalDistance}m
                  </div>
                )}
                {totalDistance > 0 && totalDuration > 0 && <span>+</span>}
                {totalDuration > 0 && (
                  <div className="flex items-center">
                    <WatchSvg />
                    {formatTime(totalDuration)}
                  </div>
                )}
              </div>
            </div>
            {isOpen && (
              <SessionOverlay
                sessionSections={activity.sessionParts}
                activity={activity}
                activityIndex={activities.indexOf(activity)}
                openOverlay={openOverlay}
                toggleOverlay={toggleOverlay}
                homepagePlan={homepagePlan}
                initialOpen={isOpen}
              />
            )}
          </div>
        );
      })}

      <button
        className="border border-alert/50 w-7 rounded text-alert ml-1 mb-5 shadow"
        onClick={handleAddSessionClick}
      >
        <PlusSvg />
      </button>
    </>
  );
};

export default Day;

import React from "react";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import PlusSvg from "@/app/components/SVGs/PlusSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useOpenOverlay } from "../../../stateHooks/useOpenOverlay";
import SessionOverlay from "../../sessionOverlay/SessionOverlay";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";
import { homepagePlanClickedDayState } from "@/app/recoil/atoms/plans/homepagePlanClickedDayState";

const Day = ({ day, activities }) => {
  const [showAddSessionMenu, setShowAddSessionMenu] = useRecoilState(showAddSessionMenuState);
  const { openOverlay, toggleOverlay } = useOpenOverlay();
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [homepagePlanClickedDay, setHomepagePlanClickedDay] = useRecoilState(homepagePlanClickedDayState);

  const allDaySessionsDone = activities.every(activity =>
    activity.sessionParts?.every(part =>
      ["warmUp", "main", "coolDown"].every(partType =>
        part[partType]?.every(session => session.isDone)
      )
    )
  );

  const handleAddSessionClick = () => {
    setHomepagePlanClickedDay(day);
    setShowAddSessionMenu(true);
  };

  return (
    <>
      <div
        className={`shadow-md bg-fourth/10 py-1 mb-1 ${allDaySessionsDone ? "border-l-2 border-r-2 border-green" : ""}`}
      >
        <div className="ml-1 text-s text-fifth/80">{day}</div>
      </div>

      {activities.map((activity, index) => {
        const totalDistance = calculateTotalDistance(activity);
        const totalDuration = calculateTotalDuration(activity);
        const isOpen = openOverlay === activity._id.$oid;

        return (
          <div
            key={`${activity._id.$oid}-${index}`} 
            className="ml-1 m-1"
          >
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
                key={`session-overlay-${activity._id.$oid}-${index}`} 
                sessionSections={activity.sessionParts}
                activity={activity}
                activityIndex={index}
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
        className="border border-alert/50 w-7 rounded text-alert ml-1 -mt-1 mb-5 shadow"
        onClick={handleAddSessionClick} // to AddSessionMenu
      >
        <PlusSvg />
      </button>
    </>
  );
};

export default Day;

import React from "react";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import PlusSvg from "@/app/components/SVGs/PlusSvg";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import { useRecoilState } from "recoil";
import { useOpenOverlay } from "../../../stateHooks/useOpenOverlay";
import SessionOverlay from "../../sessionOverlay/SessionOverlay";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";
import { homepagePlanClickedDayState } from "@/app/recoil/atoms/plans/homepagePlanClickedDayState";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useSession } from "next-auth/react";
import { currentHomepagePlanWeekState } from "@/app/recoil/atoms/plans/currentHomepagePlanWeekState";

const Day = ({ day, activities }) => {
  const { data: sessionData } = useSession();
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [showAddSessionMenu, setShowAddSessionMenu] = useRecoilState(showAddSessionMenuState);
  const { openOverlay, toggleOverlay } = useOpenOverlay();
  const [homepagePlanClickedDay, setHomepagePlanClickedDay] = useRecoilState(homepagePlanClickedDayState);
  const [currentWeek, setCurrentWeek] = useRecoilState(currentHomepagePlanWeekState);


  const allDaySessionsDone = () => {
    const singleActivities = activities.map(
      (singleActivity) => singleActivity.isDone
    );
    return singleActivities.every((value) => value === true);
  };

  const handleAddSessionClick = () => {
    setHomepagePlanClickedDay(day);
    setShowAddSessionMenu(true);
  };

  const handleRemoveSessionFromPlan = async (activityId) => {
    const updatedDays = {
      ...homepagePlan.weeks[currentWeek].days,
      [day]: homepagePlan.weeks[currentWeek].days[day].filter(
        (activity) => (activity._id.$oid || activity._id) !== activityId
      ),
    };

    const newHomepagePlan = {
      ...homepagePlan,
      weeks: homepagePlan.weeks.map((week, index) =>
        index === currentWeek ? { ...week, days: updatedDays } : week
      ),
    };

    setHomepagePlan(newHomepagePlan);

    if (sessionData?.user?.email) {
      try {
        const response = await fetch("/api/user/updateUserTrainingPlans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: sessionData.user.email,
            trainingPlans: newHomepagePlan,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update user plan");
        }
      } catch (error) {
        console.error("An error occurred while updating the user plan:", error);
      }
    }
  };

  return (
    <>
      <div
        className={`shadow-md bg-fourth/10 py-1 mb-3 ${!allDaySessionsDone() ? "border-l-2 border-r-2 border-green" : ""}`}
      >
        <div className="ml-1 text-s text-fifth/80">{day}</div>
      </div>

      {activities.map((activity, index) => {
        const totalDistance = calculateTotalDistance(activity);
        const totalDuration = calculateTotalDuration(activity);
        const activityId = activity._id.$oid || activity._id;
        const isOpen = openOverlay === activityId;

        return (
          <div key={`${activityId}-${index}`} className="mx-1">
            <div
              className={`relative cursor-pointer shadow border-t-2 ${getActivityBorderColor(activity.activity)}`}
              onClick={() => toggleOverlay(activityId)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSessionFromPlan(activityId);
                }}
                className="absolute top-0 right-0 m-1"
              >
                <UncheckSvg />
              </button>
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
                key={`session-overlay-${activityId}-${index}`} 
                sessionSections={activity.sessionParts}
                activity={activity}
                activityIndex={index}
                openOverlay={openOverlay}
                toggleOverlay={toggleOverlay}
                initialOpen={isOpen}
              />
            )}
          </div>
        );
      })}

      <button
        className="border border-alert/50 w-7 rounded text-alert ml-1 mb-5 shadow"
        onClick={handleAddSessionClick} // opens AddSessionMenu
      >
        <PlusSvg />
      </button>
    </>
  );
};

export default Day;

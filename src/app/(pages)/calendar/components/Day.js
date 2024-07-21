import WatchSvg from "@/app/components/SVGs/WatchSvg";
import calculateTotalDistance from "../logicFunctions/totalDistanceFunction";
import calculateTotalDuration from "../logicFunctions/totalDurationFunction";
import { formatTime } from "@/app/helperFunctions/formatTime";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import { useOpenOverlay } from "../stateHooks/useOpenOverlay";
import SessionOverlay from "./SessionOverlay/SessionOverlay";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useRecoilState } from "recoil";
import PlusSvg from "@/app/components/SVGs/PlusSvg";
import NewPlanSessionTypes from "../../plans/components/newPlanBuilder/components/newPlanSessionTypes/newPlanSessionTypes";
import { useState } from "react";

const Day = ({ day, activities, setActiveComponent }) => {
  const { openOverlay, toggleOverlay } = useOpenOverlay();
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [showAddSessionMenu, setShowAddSessionMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const allDaySessionsDone = () => {
    if (activities.length === 0) return false;

    return activities.every((activity) =>
      activity.sessionParts?.every((part) =>
        ["warmUp", "main", "coolDown"].every((partType) =>
          part[partType]?.every((session) => session.isDone === true)
        )
      )
    );
  };

  const handleAddSessionClick = () => {
    setShowAddSessionMenu(!showAddSessionMenu);
  };

  const getActivityBorderColor = (activityType) => {
    switch (activityType) {
      case "Laufen":
        return "border-orange";
      case "Schwimmen":
        return "border-blue";
      case "Yoga":
        return "border-green";
      case "Rad":
        return "border-yellow";
      case "Sonstiges":
        return "border-red";
      case "Faszienrolle":
        return "border-purple";
      case "Stabi":
        return "border-alert";
      default:
        return "border-grey";
    }
  };

  return (
    <>
      <div
        className={`shadow-md bg-fourth/10 py-1 ${
          allDaySessionsDone() ? "border-l-2 border-r-2 border-green" : ""
        }`}
      >
        <div className="ml-1">
          <div className="text-s text-fifth/80">{day}</div>
        </div>
      </div>

      <div>
        {activities.length === 0
          ? null
          : activities?.map((activity, activityIndex) => {
              const totalDistance = calculateTotalDistance(activity);
              const totalDuration = calculateTotalDuration(activity);
              const isOpen = openOverlay === activity._id.$oid;

              return (
                <div key={activity._id.$oid} className="ml-1 shadow my-1">
                  <div
                    className={`cursor-pointer shadow border-t-2 ${getActivityBorderColor(
                      activity.activity
                    )}`}
                    onClick={
                      !openOverlay
                        ? () => toggleOverlay(activity._id.$oid)
                        : null
                    }
                  >
                    <div className={`text-xs py-1 `}>
                      <p className="ml-1">{activity.activity}</p>
                    </div>
                    <p className="ml-1 text-s">{activity.description}</p>

                    <div className="text-xs ml-1 my-2">
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
                      activityIndex={activityIndex}
                      openOverlay={openOverlay}
                      toggleOverlay={toggleOverlay}
                      homepagePlan={homepagePlan}
                      //   currentWeek={currentWeek}
                      initialOpen={isOpen}
                    />
                  )}
                </div>
              );
            })}
      </div>

      <button className="border border-alert/50 w-7 rounded text-alert ml-1">
        <PlusSvg onClick={handleAddSessionClick} />
      </button>
      {showAddSessionMenu && (
        <div>
          <NewPlanSessionTypes
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            error={error}
            setError={setError}
            setActiveComponent={setActiveComponent}
          />
        </div>
      )}
    </>
  );
};

export default Day;

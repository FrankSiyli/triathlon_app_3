import WatchSvg from "@/app/components/SVGs/WatchSvg";
import calculateTotalDistance from "../logicFunctions/totalDistanceFunction";
import calculateTotalDuration from "../logicFunctions/totalDurationFunction";
import { formatTime } from "@/app/helperFunctions/formatTime";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import { useOpenOverlay } from "../stateHooks/useOpenOverlay";
import SessionOverlay from "./SessionOverlay/SessionOverlay";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useRecoilState } from "recoil";

const Day = ({ day, activities, dayIndex }) => {
  const { openOverlay, toggleOverlay } = useOpenOverlay();
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
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

  const getActivityBgColor = (activityType) => {
    switch (activityType) {
      case "Laufen":
        return "bg-orange/10";
      case "Schwimmen":
        return "bg-blue/10";
      case "Yoga":
        return "bg-green/10";
      case "Rad":
        return "bg-yellow/50";
      case "Sonstiges":
        return "bg-red/10";
      case "Faszienrolle":
        return "bg-purple/10";
      case "Stabi":
        return "bg-alert/10";
      default:
        return "bg-grey/10";
    }
  };


  return (
    <>
      <div
        className={`shadow-md bg-fourth/10 py-2 ${
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
                <div key={activity._id.$oid} className="ml-2 shadow my-1">
                  <div
                    className="cursor-pointer"
                    onClick={
                      !openOverlay ? () => toggleOverlay(activity._id.$oid) : null
                    }
                  >
                    <div
                      className={`text-xs my-1 py-1 ${getActivityBgColor(
                        activity.activity
                      )}`}
                    >
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
    </>
  );
};

export default Day;

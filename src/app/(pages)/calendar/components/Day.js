import WatchSvg from "@/app/components/SVGs/WatchSvg";
import calculateTotalDistance from "../logicFunctions/totalDistanceFunction";
import calculateTotalDuration from "../logicFunctions/totalDurationFunction";
import { formatTime } from "@/app/helperFunctions/formatTime";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";

const Day = ({ day, activities }) => {
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
        return "bg-blue"; 
      case "Yoga":
        return "bg-green/10"; 
      case "Rad":
        return "bg-third/10"; 
      case "Sonstiges":
        return "bg-grey/10"; 
      case "Stabi":
        return "bg-alert/10"; 
      default:
        return "bg-grey"; 
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
          <div className="font-bold">{day}</div>
        </div>
      </div>

      <div>
        {activities.length === 0 ? (
          null
        ) : (
          activities.map((activity, index) => {
            const totalDistance = calculateTotalDistance(activity);
            const totalDuration = calculateTotalDuration(activity);

            return (
              <div
                key={index}
                className={`ml-2 shadow my-1 `}
              >
                <p className={`text-s my-1 py-1 ${getActivityBgColor(activity.activity)}`}>{activity.activity}</p>
                <p>{activity.description}</p>

                <div className="text-xs my-2">
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
            );
          })
        )}
      </div>
    </>
  );
};

export default Day;

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
import { newPlanState } from "@/app/recoil/atoms/planBuilder/newPlanState";
import SingleSessionParts from "../menu 4 singleSessionParts/SingleSessionParts";
import { currentHomepagePlanWeekState } from "@/app/recoil/atoms/plans/currentHomepagePlanWeekState";
import { homepagePlanClickedDayState } from "@/app/recoil/atoms/plans/homepagePlanClickedDayState";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";
import { useSession } from "next-auth/react";

const SingleSessions = ({ singleSessions, sessionUnderCategory }) => {
  const { data: sessionData } = useSession();
  const [showSessionParts, setShowSessionParts] = useState({});
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [newPlan] = useRecoilState(newPlanState);
  const [currentWeek] = useRecoilState(currentHomepagePlanWeekState);
  const [homepagePlanClickedDay] = useRecoilState(homepagePlanClickedDayState);
  const [showAddSessionMenu, setShowAddSessionMenu] = useRecoilState(
    showAddSessionMenuState
  );

  const toggleSessionParts = (index) => {
    setShowSessionParts((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const addSessionToPlan = async (session) => {
    if (!homepagePlan?.weeks?.[currentWeek]) return;

    const updatedDays = {
      ...homepagePlan.weeks[currentWeek].days,
      [homepagePlanClickedDay]: [
        ...(homepagePlan.weeks[currentWeek].days[homepagePlanClickedDay] || []),
        session,
      ],
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

    setShowAddSessionMenu(false);
  };

  return (
    <div className="mt-2 flex flex-col items-center">
      {singleSessions
        .filter(
          (session) => session.sessionType === sessionUnderCategory.sessionType
        )
        .map((session, index) => {
          const duration = calculateTotalDuration(session);
          const distance = calculateTotalDistance(session);

          return (
            <div
              key={index}
              onClick={() => toggleSessionParts(index)}
              className="flex flex-col w-full mt-1 shadow rounded cursor-pointer bg-first/40"
            >
              <div className="flex flex-col justify-between items-center">
                <div className="flex justify-between items-center w-full ml-1">
                  <p className="text-s ml-1">{session.description}</p>
                  <span className="mr-3 scale-90">
                    {showSessionParts[index] ? (
                      <ArrowUpSvg />
                    ) : (
                      <ArrowDownSvg />
                    )}
                  </span>
                </div>
                <div className="flex justify-start w-full ml-2 mt-1 text-xs text-alert gap-2">
                  {duration > 0 && (
                    <div className="flex items-center">
                      <WatchSvg />
                      {formatTime(duration)}
                    </div>
                  )}
                  {distance > 0 && (
                    <>
                      {duration > 0 && <span>+</span>}
                      <div className="flex items-center">
                        <DistanceSvg />
                        {distance}m
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
                      addSessionToPlan(session);
                    }}
                    className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-alert hover:text-alert/30 bg-first"
                  >
                    Hinzufügen
                  </button>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default SingleSessions;

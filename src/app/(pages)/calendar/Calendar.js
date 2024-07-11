import React, { useEffect, useState } from "react";
import NavBar from "@/app/components/NavBar/NavBar";
import { v1 as uuidv1 } from "uuid";
import WeekScrollButtons from "./components/WeekScrollButtons";
import Day from "./components/Day";
import SessionOverlay from "./components/SessionOverlay/SessionOverlay";
import { useOpenOverlay } from "./stateHooks/useOpenOverlay";
import { useOpenDay } from "./stateHooks/useOpenDay";
import { useCurrentWeek } from "./stateHooks/useCurrentWeek";
import { useActivitiesByDay } from "./logicFunctions/useActivitiesByDay";
import Activity from "./components/Activity";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import PlansView from "../plans/PlansView";
import ProfilView from "../profil/ProfilView";
import Image from "next/image";

function Calendar({ showConsent }) {
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [showProfil, setShowProfil] = useState(false);

  const numberOfPlanWeeks = homepagePlan?.duration;
  const { openOverlay, toggleOverlay, activityIndex } = useOpenOverlay();
  const { openDay, toggleDay } = useOpenDay();

  const { currentWeek, handlePreviousWeekClick, handleNextWeekClick } =
    useCurrentWeek(homepagePlan, numberOfPlanWeeks, toggleDay);

  const currentWeekSessions = homepagePlan?.weeks?.[currentWeek]?.sessions;
  const activitiesByDay = useActivitiesByDay(currentWeekSessions);

  return (
    <div className="w-full">
      <>
        {showPlans && (
          <div className="flex flex-col mx-auto max-w-xl relative w-full overflow-y-auto max-h-screen">
            <PlansView />
            <span className="mb-40"></span>
          </div>
        )}

        {homepagePlan && showCalendar && (
          <>
            <div className="flex flex-col items-center relative overflow-y-auto max-h-screen w-full">

              <div className="flex mx-auto text-center border border-alert/50 mt-11 mb-10 px-3 py-1 z-20 rounded-md ">
                {homepagePlan?.name}
              </div>
              <WeekScrollButtons
                currentWeek={currentWeek}
                numberOfPlanWeeks={numberOfPlanWeeks}
                handlePreviousWeekClick={handlePreviousWeekClick}
                handleNextWeekClick={handleNextWeekClick}
              />

              <div className="flex flex-col sm:flex-row w-full mx-3">
                {activitiesByDay &&
                  activitiesByDay.map(([day, activity], dayIndex) => (
                    <>
                      <div key={uuidv1()} className="flex flex-col w-full">
                        <Day
                          day={day}
                          openDay={openDay}
                          toggleDay={toggleDay}
                          dayIndex={dayIndex}
                          activity={activity}
                        />

                        <Activity
                          dayIndex={dayIndex}
                          activity={activity}
                          toggleOverlay={toggleOverlay}
                        />
                      </div>
                    </>
                  ))}
              </div>

              {activitiesByDay &&
                activitiesByDay.map(([day, activity], dayIndex) => (
                  <div key={dayIndex}>
                    {openDay === dayIndex &&
                      activity.map((singleActivity, activityIndex) => (
                        <SessionOverlay
                          key={activityIndex}
                          singleActivity={singleActivity}
                          dayIndex={dayIndex}
                          activityIndex={activityIndex}
                          openOverlay={openOverlay}
                          toggleOverlay={toggleOverlay}
                          homepagePlan={homepagePlan}
                          currentWeek={currentWeek}
                          openDay={openDay}
                          activitiesByDay={activitiesByDay}
                          initialOpen={openOverlay.includes(
                            dayIndex * 1000 + activityIndex
                          )}
                        />
                      ))}
                  </div>
                ))}
              <span className="mb-40"></span>
            </div>
          </>
        )}

        {showProfil && (
          <div className="flex flex-col mx-auto max-w-xl relative w-full overflow-y-auto max-h-screen">
            <ProfilView />
            <span className="mb-40"></span>
          </div>
        )}
      </>

      <NavBar
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        showPlans={showPlans}
        setShowPlans={setShowPlans}
        showProfil={showProfil}
        setShowProfil={setShowProfil}
      />
    </div>
  );
}

export default Calendar;

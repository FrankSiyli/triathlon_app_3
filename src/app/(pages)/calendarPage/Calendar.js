import React, { useState } from "react";
import NavBar from "@/app/components/NavBar/NavBar";
import WeekScrollButtons from "./components/calendar/components/WeekScrollButtons";
import { useCurrentWeek } from "./stateHooks/useCurrentWeek";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import PlansView from "../plansPage/PlansView";
import ProfilView from "../profilPage/ProfilView";
import Day from "./components/calendar/components/Day";
import AddSessionMenu from "./components/addSessionMenu/AddSessionMenu";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";
import AppLibrary from "./components/addSessionMenu/newPlanAppLibrary/NewPlanAppLibrary";

function Calendar() {
  const [showAddSessionMenu, setShowAddSessionMenu] =
  useRecoilState(showAddSessionMenuState);

  const [homepagePlan] = useRecoilState(homepagePlanState);
  const [activeView, setActiveView] = useState("calendar"); // "calendar", "plans", "profil"
  const [activeDay, setActiveDay] = useState(null);

  const numberOfPlanWeeks = homepagePlan?.duration;
  const { currentWeek, handlePreviousWeekClick, handleNextWeekClick } =
    useCurrentWeek(homepagePlan, numberOfPlanWeeks);
  const currentWeekDays = homepagePlan?.weeks?.[currentWeek]?.days;

  const handleBackgroundClick = () => setShowAddSessionMenu(false);

  return (
    <>
      {showAddSessionMenu && (
        <div
          onClick={handleBackgroundClick}
          className="fixed top-0 left-0 w-screen h-screen bg-second/10 z-20"
        ></div>
      )}

      {activeView === "plans" && (
        <div className="flex flex-col mx-auto max-w-xl relative w-full overflow-y-auto max-h-screen">
          <PlansView />
          <span className="mb-40"></span>
        </div>
      )}

      {activeView === "calendar" && homepagePlan && (
        <div className="flex flex-col items-center relative overflow-y-auto max-h-screen w-screen">
          <div className="flex mx-auto text-center bg-lightBlue text-fifth/80 mt-5 mb-5 px-3 py-1 rounded-sm">
            {homepagePlan?.name}
          </div>
          <WeekScrollButtons
            currentWeek={currentWeek}
            numberOfPlanWeeks={numberOfPlanWeeks}
            handlePreviousWeekClick={handlePreviousWeekClick}
            handleNextWeekClick={handleNextWeekClick}
          />

          <div className="flex flex-col sm:flex-row w-full">
            {currentWeekDays &&
              Object.entries(currentWeekDays).map(
                ([day, activities], dayIndex) => (
                  <div key={day} className="flex flex-col w-full">
                    <Day
                      day={day}
                      currentWeek={currentWeek}
                      dayIndex={dayIndex}
                      activities={activities}
                      activeDay={activeDay}
                      setActiveDay={setActiveDay}
                    />
                  </div>
                )
              )}
          </div>

          <span className="mb-40"></span>
        </div>
      )}

      {showAddSessionMenu && (
        <AppLibrary />
      )}

      {activeView === "profil" && (
        <div className="flex flex-col mx-auto max-w-xl relative w-full overflow-y-auto max-h-screen">
          <ProfilView />
          <span className="mb-40"></span>
        </div>
      )}

      <NavBar
        showCalendar={activeView === "calendar"}
        setShowCalendar={() => setActiveView("calendar")}
        showPlans={activeView === "plans"}
        setShowPlans={() => setActiveView("plans")}
        showProfil={activeView === "profil"}
        setShowProfil={() => setActiveView("profil")}
      />
    </>
  );
}

export default Calendar;

import React, { useState } from "react";
import NavBar from "@/app/components/NavBar/NavBar";
import WeekScrollButtons from "./components/calendar/components/WeekScrollButtons";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import PlansView from "../plansPage/PlansView";
import ProfilView from "../profilPage/ProfilView";
import Day from "./components/calendar/components/Day";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";
import Sessions from "./components/addSessionMenu/AddSessionMenu";
import { currentHomepagePlanWeekState } from "@/app/recoil/atoms/plans/currentHomepagePlanWeekState";
import { homepagePlanClickedDayState } from "@/app/recoil/atoms/plans/homepagePlanClickedDayState";
import PlusSvg from "@/app/components/SVGs/PlusSvg";
import { useSession } from "next-auth/react";
import { navBarState } from "@/app/recoil/atoms/navBar/navBarState";

function CalendarPage() {
  const { data: sessionData } = useSession();
  const [showAddSessionMenu, setShowAddSessionMenu] = useRecoilState(showAddSessionMenuState);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [homepagePlanClickedDay, setHomepagePlanClickedDay] = useRecoilState(homepagePlanClickedDayState);
  const [currentWeek, setCurrentWeek] = useRecoilState(currentHomepagePlanWeekState);
  const numberOfPlanWeeks = homepagePlan?.duration;
  const currentWeekDays = homepagePlan?.weeks?.[currentWeek]?.days;
  const [activeView, setActiveView] = useRecoilState(navBarState);

  const handleBackgroundClick = () => setShowAddSessionMenu(false);

  const handleDayClick = (week, day) => {
    setHomepagePlanClickedDay(day);
    setShowAddSessionMenu(true);
  };

  const addSessionToHomepagePlanClickedDay = (session) => {
    if (homepagePlanClickedDay) {
      setHomepagePlan((prevPlan) => {
        const updatedWeeks = prevPlan.weeks.map((week, index) => {
          if (index === currentWeek) {
            return {
              ...week,
              days: {
                ...week.days,
                [homepagePlanClickedDay]: [
                  ...(week.days[homepagePlanClickedDay] || []),
                  session,
                ],
              },
            };
          }
          return week;
        });
        return {
          ...prevPlan,
          weeks: updatedWeeks,
        };
      });
    }
  };

  const handlePreviousWeekClick = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeekClick = () => {
    if (currentWeek < numberOfPlanWeeks - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };



  // add a week to the plan

  const handleAddWeekToPlan = async () => {
    const newWeek = {
      week: homepagePlan.weeks.length + 1, 
      days: {
        Montag: [], 
        Dienstag: [], 
        Mittwoch: [], 
        Donnerstag: [], 
        Freitag: [], 
        Samstag: [], 
        Sonntag: [], 
      },
    };
    

    const updatedWeeks = [...homepagePlan.weeks, newWeek];
    const newHomepagePlan = {
      ...homepagePlan,
      weeks: updatedWeeks,
      duration: homepagePlan.duration + 1,
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



  // remove the current week from the plan

  const handleDeleteWeek = async () => {
    if (currentWeek < 0 || currentWeek >= homepagePlan?.weeks?.length) {
      console.error("Invalid week index");
      return;
    }
  
    const updatedWeeks = homepagePlan.weeks.filter((_, index) => index !== currentWeek);
    const newHomepagePlan = {
      ...homepagePlan,
      weeks: updatedWeeks,
      duration: homepagePlan.duration - 1,
    };
  
    setHomepagePlan(newHomepagePlan);
    setCurrentWeek(currentWeek-1)
  
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
  

  const renderCalendar = () => (
    <div className="flex flex-col items-center relative overflow-y-auto max-h-screen w-screen">
      <div className="flex mx-auto text-center text-alert mt-5 mb-5 px-3 py-1 rounded-sm">
        {homepagePlan?.name}
      </div>
      <div className="relative">
        <WeekScrollButtons
          currentWeek={currentWeek}
          numberOfPlanWeeks={numberOfPlanWeeks}
          handlePreviousWeekClick={handlePreviousWeekClick}
          handleNextWeekClick={handleNextWeekClick}
        />
        <button
          onClick={handleAddWeekToPlan}
          className="absolute top-0 -right-11 flex items-center justify-center border border-alert/50 w-10 h-10 rounded text-alert ml-1 mb-5 shadow"
        >
          <PlusSvg />
        </button>
      </div>
        <button
          onClick={handleDeleteWeek}
          className="border border-red rounded text-fifth m-5 px-1 text-xs shadow hover:shadow-md"
        >
          Woche löschen 
        </button>
      <div className="flex flex-col sm:flex-row w-full">
        {currentWeekDays &&
          Object.entries(currentWeekDays).map(([day, activities]) => (
            <div key={day} className="flex flex-col w-full">
              <Day
                day={day}
                activities={activities}
                homepagePlanClickedDay={homepagePlanClickedDay}
                setHomepagePlanClickedDay={setHomepagePlanClickedDay}
                onClick={() => handleDayClick(currentWeek, day)}
              />
            </div>
          ))}
      </div>
    </div>
  );
  

  return (
    <>
      {showAddSessionMenu && (
        <div
          onClick={handleBackgroundClick}
          className="fixed top-0 left-0 w-screen h-screen bg-second/10 z-20"
        ></div>
      )}

      {activeView === "plans" ? (
        <PlansView />
      ) : activeView === "calendar" && homepagePlan ? (
        renderCalendar()
      ) : (
        activeView ==="profil" && <ProfilView />
      )}

      {showAddSessionMenu && (
        <Sessions onAddSession={addSessionToHomepagePlanClickedDay} />
      )}

      <NavBar
      />
    </>
  );
}

export default CalendarPage;

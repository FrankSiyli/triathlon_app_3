import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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

const initialPlanState = {
  _id: uuidv4(),
  category: "Default Category",
  name: "Default Plan Name",
  info: "Some info about the plan",
  wishFrom: "Default Wish",
  duration: 4,
  weeks: Array.from({ length: 4 }, (_, weekIndex) => ({
    week: weekIndex + 1,
    days: {
      Montag: [],
      Dienstag: [],
      Mittwoch: [],
      Donnerstag: [],
      Freitag: [],
      Samstag: [],
      Sonntag: [],
    },
  })),
};

function CalendarPage() {
  const [showAddSessionMenu, setShowAddSessionMenu] = useRecoilState(showAddSessionMenuState);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [showProfil, setShowProfil] = useState(false);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [homepagePlanClickedDay, setHomepagePlanClickedDay] = useRecoilState(homepagePlanClickedDayState);
  const [currentWeek, setCurrentWeek] = useRecoilState(currentHomepagePlanWeekState);
  const numberOfPlanWeeks = homepagePlan?.duration;
  const currentWeekDays = homepagePlan?.weeks?.[currentWeek]?.days;

  useEffect(() => {
    if (!homepagePlan || !homepagePlan.weeks) {
      setHomepagePlan(initialPlanState);
    }
  }, [homepagePlan, setHomepagePlan]);

  const handleBackgroundClick = () => setShowAddSessionMenu(false);

  const handleDayClick = (week, day) => {
    setSelectedWeek(week);
    setHomepagePlanClickedDay(day);
    setShowAddSessionMenu(true);
  };

  const addSessionToHomepagePlanClickedDay = (session) => {
    if (selectedWeek !== null && homepagePlanClickedDay) {
      setHomepagePlan((prevPlan) => {
        const updatedWeeks = prevPlan.weeks.map((week, index) => {
          if (index === selectedWeek - 1) { 
            return {
              ...week,
              days: {
                ...week.days,
                [homepagePlanClickedDay]: [...(week.days[homepagePlanClickedDay] || []), session],
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

  const renderCalendar = () => (
    <div className="flex flex-col items-center relative overflow-y-auto max-h-screen w-screen">
      <div className="flex mx-auto text-center bg-fourth/10 text-fifth/80 mt-5 mb-5 px-3 py-1 rounded-sm">
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

      {showPlans ? <PlansView /> : showCalendar && homepagePlan ? renderCalendar() : showProfil && <ProfilView />}

      {showAddSessionMenu && <Sessions onAddSession={addSessionToHomepagePlanClickedDay} />}

      <NavBar
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        showPlans={showPlans}
        setShowPlans={setShowPlans}
        showProfil={showProfil}
        setShowProfil={setShowProfil}
      />
    </>
  );
}

export default CalendarPage;

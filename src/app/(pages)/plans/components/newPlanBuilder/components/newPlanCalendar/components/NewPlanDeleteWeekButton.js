import React from "react";
import { useRecoilState } from "recoil";
import { newPlanState } from "@/app/recoil/atoms/planBuilder/newPlanState";

const NewPlanDeleteWeekButton = ({ week, currentWeek }) => {
  const [newPlan, setNewPlan] = useRecoilState(newPlanState);

  const handleDeleteWeekClick = () => {
    const updatedWeeks = newPlan.weeks.filter((w) => w !== week);

    setNewPlan((prevPlan) => ({
      ...prevPlan,
      weeks: updatedWeeks,
    }));
  };

  return (
    <button
      onClick={handleDeleteWeekClick}
      className="mt-5 p-1 mx-auto border border-red rounded text-xs hover:text-alert active:scale-95 shadow-xl"
    >
      Woche löschen
    </button>
  );
};

export default NewPlanDeleteWeekButton;

import PlusSvg from "@/app/components/SVGs/PlusSvg";
import { newPlanState } from "@/app/recoil/atoms/planBuilder/newPlanState";
import React from "react";
import { useRecoilState } from "recoil";

const NewPlanAddWeekButton = ({ numberOfPlanWeeks }) => {
  const [newPlan, setNewPlan] = useRecoilState(newPlanState);

  const handleAddWeekClick = () => {
    const newWeek = {
      week: numberOfPlanWeeks + 1,
      sessions: [
        { day: "Montag" },
        { day: "Dienstag" },
        { day: "Mittwoch" },
        { day: "Donnerstag" },
        { day: "Freitag" },
        { day: "Samstag" },
        { day: "Sonntag" },
      ],
    };
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      weeks: [...prevPlan.weeks, newWeek],
    }));
  };
  return (
    <>
      <button
        onClick={handleAddWeekClick}
        className="absolute right-5 top-1 border border-alert rounded text-alert"
      >
        <PlusSvg />
      </button>
    </>
  );
};

export default NewPlanAddWeekButton;

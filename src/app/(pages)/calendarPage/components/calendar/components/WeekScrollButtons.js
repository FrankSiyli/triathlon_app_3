import React from "react";
import ArrowDoubleLeftSvg from "@/app/components/SVGs/arrows/ArrowDoubleLeftSvg";
import ArrowDoubleRightSvg from "@/app/components/SVGs/arrows/ArrowDoubleRightSvg";

const WeekScrollButtons = ({
  currentWeek,
  numberOfPlanWeeks,
  handlePreviousWeekClick,
  handleNextWeekClick,
}) => {
  return (
    <div className="relative h-10 flex justify-between p-1 mb-2 items-center border border-alert/50 shadow rounded-sm">
      <button
        onClick={handlePreviousWeekClick}
        disabled={currentWeek === 0}
        className="w-12 flex justify-center items-center"
      >
        <ArrowDoubleLeftSvg />
      </button>

      <p>{`Woche ${currentWeek + 1} | ${numberOfPlanWeeks}`}</p>

      <button
        onClick={handleNextWeekClick}
        disabled={currentWeek >= numberOfPlanWeeks - 1}
        className="w-12 flex justify-center items-center"
      >
        <ArrowDoubleRightSvg />
      </button>
    </div>
  );
};

export default WeekScrollButtons;

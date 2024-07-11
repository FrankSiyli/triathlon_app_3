import ArrowDoubleLeftSvg from "@/app/components/SVGs/arrows/ArrowDoubleLeftSvg";
import ArrowDoubleRightSvg from "@/app/components/SVGs/arrows/ArrowDoubleRightSvg";
import React from "react";

const WeekScrollButtons = ({
  currentWeek,
  numberOfPlanWeeks,
  handlePreviousWeekClick,
  handleNextWeekClick,
}) => (
  <div className="relative flex justify-between mb-5 items-center mx-10">
    <button
      onClick={handlePreviousWeekClick}
      className="btn btn-sm btn-outline  border border-transparent w-12 flex justify-center items-center hover:bg-transparent hover:border-transparent"
    >
      {currentWeek > 0 ? <ArrowDoubleLeftSvg /> : null}
    </button>

    <p>{`Woche ${currentWeek + 1} | ${numberOfPlanWeeks}`}</p>
    <button
      onClick={handleNextWeekClick}
      className="btn btn-sm btn-outline border border-transparent w-12 flex justify-center items-center hover:bg-transparent hover:border-transparent"
    >
      {currentWeek + 1 < numberOfPlanWeeks ? <ArrowDoubleRightSvg /> : null}
    </button>
  </div>
);
export default WeekScrollButtons;

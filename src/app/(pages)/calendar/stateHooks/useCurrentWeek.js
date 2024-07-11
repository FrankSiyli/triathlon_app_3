import { useState } from "react";

export const useCurrentWeek = (homepagePlan, numberOfPlanWeeks, toggleDay) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const handlePreviousWeekClick = () => {
    if (homepagePlan && currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
      toggleDay(-1);
    }
  };

  const handleNextWeekClick = () => {
    if (homepagePlan && currentWeek + 1 < numberOfPlanWeeks) {
      setCurrentWeek(currentWeek + 1);
      toggleDay(-1);
    }
  };

  return {
    currentWeek,
    handlePreviousWeekClick,
    handleNextWeekClick,
  };
};

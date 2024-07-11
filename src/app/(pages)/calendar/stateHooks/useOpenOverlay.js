import { useState } from "react";

export const useOpenOverlay = () => {
  const [openOverlay, setOpenOverlay] = useState([]);

  const toggleOverlay = (dayIndex, activityIndex) => {
    const clickedIndex = dayIndex * 1000 + activityIndex;
    if (openOverlay.includes(clickedIndex)) {
      setOpenOverlay(openOverlay.filter((item) => item !== clickedIndex));
    } else {
      setOpenOverlay([...openOverlay, clickedIndex]);
    }
  };

  return {
    openOverlay,
    toggleOverlay,
  };
};

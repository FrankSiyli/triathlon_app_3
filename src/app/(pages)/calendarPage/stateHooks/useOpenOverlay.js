import { useState } from "react";

export const useOpenOverlay = () => {
  const [openOverlay, setOpenOverlay] = useState(null);

  const toggleOverlay = (activityId) => {
    if (openOverlay === activityId) {
      setOpenOverlay(null);
    } else {
      setOpenOverlay(activityId);
    }
  };

  return {
    openOverlay,
    toggleOverlay,
  };
};

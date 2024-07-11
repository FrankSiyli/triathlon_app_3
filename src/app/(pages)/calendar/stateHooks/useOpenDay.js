import { useState } from "react";

export const useOpenDay = () => {
  const [openDay, setOpenDay] = useState(null);

  const toggleDay = (dayIndex) => {
    setOpenDay(dayIndex === openDay ? null : dayIndex);
  };

  return {
    openDay,
    toggleDay,
  };
};

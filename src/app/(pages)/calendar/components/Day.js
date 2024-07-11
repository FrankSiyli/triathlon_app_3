const Day = ({ day, toggleDay, dayIndex, openDay, activity }) => {
  const allDaySessionsDone = () => {
    const singleActivities = activity.map(
      (singleActivity) => singleActivity[3]
    );
    return singleActivities.every((value) => value === true);
  };

  return (
    <div
      className={` bg-fourth/10 py-2${
        allDaySessionsDone() ? "border-l-2 border-r-2 border-green" : ""
      }`}
    >
      <div className="ml-1">
        {day}
      </div>
    </div>
  );
};

export default Day;

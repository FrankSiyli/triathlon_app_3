export const useActivitiesByDay = (currentWeekSessions) => {
  if (!Array.isArray(currentWeekSessions)) {
    return [];
  }

  const activitiesByDay = currentWeekSessions.reduce(
    (acc, session, currentWeekSessionIndex) => {
      const { day, activity, description, sessionParts, isDone } = session;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push([
        activity,
        description,
        sessionParts,
        isDone,
        currentWeekSessionIndex,
      ]);
      return acc;
    },
    []
  );

  return Object.entries(activitiesByDay);
};

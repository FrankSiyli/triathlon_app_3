const calculateTotalDistance = (activity) => {
  let totalDistance = 0;

  if (!activity.sessionParts) return totalDistance;

  activity.sessionParts.forEach((sessionSections) => {
    ['warmUp', 'main', 'coolDown'].forEach((partType) => {
      sessionSections[partType]?.forEach((section) => {
        section.exercises?.forEach((exercise) => {
          if (exercise.distance > 0) {
            totalDistance += exercise.distance * section.multiplier;
          }
        });
      });
    });
  });

  return totalDistance;
};

export default calculateTotalDistance;

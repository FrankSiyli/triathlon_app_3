const calculateTotalDistance = (singleActivity) => {
  let totalDistance = 0;

  if (!singleActivity.sessionParts) return totalDistance;

  singleActivity.sessionParts.forEach((sessionSections) => {
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

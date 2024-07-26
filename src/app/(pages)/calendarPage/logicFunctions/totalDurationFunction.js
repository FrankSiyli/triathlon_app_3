const calculateTotalDuration = (activity) => {
  let totalDuration = 0;

  if (!activity.sessionParts) return totalDuration;

  activity.sessionParts.forEach((sessionSections) => {
    ['warmUp', 'main', 'coolDown'].forEach((partType) => {
      sessionSections[partType]?.forEach((section) => {
        section.exercises?.forEach((exercise) => {
          if (exercise.duration > 0) {
            totalDuration += exercise.duration * section.multiplier;
          }
        });
      });
    });
  });

  return totalDuration;
};

export default calculateTotalDuration;

const calculateTotalDuration = (singleActivity) => {
  let totalDuration = 0;

  if (!singleActivity.sessionParts) return totalDuration;

  singleActivity.sessionParts.forEach((sessionSections) => {
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

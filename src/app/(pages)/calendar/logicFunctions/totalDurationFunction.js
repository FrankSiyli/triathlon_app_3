const calculateTotalDuration = (singleActivity) => {
  let totalDuration = 0;

  singleActivity[2].forEach((sessionSections) => {
    sessionSections.main.forEach((mainSection) => {
      mainSection.exercises.forEach((mainExercise) => {
        if (mainExercise.duration > 0) {
          totalDuration += mainExercise.duration * mainSection.multiplier;
        }
      });
    });
  });

  singleActivity[2].forEach((sessionSections) => {
    sessionSections.warmUp.forEach((warmUpSection) => {
      warmUpSection.exercises.forEach((warmUpExercise) => {
        if (warmUpExercise.duration > 0) {
          totalDuration += warmUpExercise.duration * warmUpSection.multiplier;
        }
      });
    });
  });

  singleActivity[2].forEach((sessionSections) => {
    sessionSections.coolDown.forEach((coolDownSection) => {
      coolDownSection.exercises.forEach((coolDownExercise) => {
        if (coolDownExercise.duration > 0) {
          totalDuration +=
            coolDownExercise.duration * coolDownSection.multiplier;
        }
      });
    });
  });

  return totalDuration;
};

export default calculateTotalDuration;

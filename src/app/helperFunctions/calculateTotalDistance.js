export const calculateTotalDistance = (singleSession) => {
  let totalDistance = 0;

  singleSession.sessionParts.forEach((sessionSections) => {
    sessionSections.main.forEach((mainSection) => {
      mainSection.exercises.forEach((mainExercise) => {
        if (mainExercise.distance > 0) {
          totalDistance += mainExercise.distance * mainSection.multiplier;
        }
      });
    });
  });

  singleSession.sessionParts.forEach((sessionSections) => {
    sessionSections.warmUp.forEach((warmUpSection) => {
      warmUpSection.exercises.forEach((warmUpExercise) => {
        if (warmUpExercise.distance > 0) {
          totalDistance += warmUpExercise.distance * warmUpSection.multiplier;
        }
      });
    });
  });

  singleSession.sessionParts.forEach((sessionSections) => {
    sessionSections.coolDown.forEach((coolDownSection) => {
      coolDownSection.exercises.forEach((coolDownExercise) => {
        if (coolDownExercise.distance > 0) {
          totalDistance +=
            coolDownExercise.distance * coolDownSection.multiplier;
        }
      });
    });
  });
  return totalDistance;
};

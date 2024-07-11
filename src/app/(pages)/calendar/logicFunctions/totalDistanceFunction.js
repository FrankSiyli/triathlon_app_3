const calculateTotalDistance = (singleActivity) => {
  let totalDistance = 0;

  singleActivity[2].forEach((sessionSections) => {
    sessionSections.main.forEach((mainSection) => {
      mainSection.exercises.forEach((mainExercise) => {
        if (mainExercise.distance > 0) {
          totalDistance += mainExercise.distance * mainSection.multiplier;
        }
      });
    });
  });

  singleActivity[2].forEach((sessionSections) => {
    sessionSections.warmUp.forEach((warmUpSection) => {
      warmUpSection.exercises.forEach((warmUpExercise) => {
        if (warmUpExercise.distance > 0) {
          totalDistance += warmUpExercise.distance * warmUpSection.multiplier;
        }
      });
    });
  });

  singleActivity[2].forEach((sessionSections) => {
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

export default calculateTotalDistance;

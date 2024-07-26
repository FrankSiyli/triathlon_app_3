import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import React from "react";

const renderExercises = (exercises) => {
  return exercises.map((exercise, exerciseIndex) => (
    <div key={exerciseIndex} className="flex  rounded">
      <p className="w-5/12">{exercise.name}</p>
      <div className="flex items-start justify-between w-7/12">
        {exercise.distance > 0 ? (
          <div className="flex items-center mx-2">
            <DistanceSvg />
            <p>{exercise.distance}m</p>
          </div>
        ) : null}

        {exercise.duration > 0 ? (
          <div className="flex items-center mx-2">
            <WatchSvg />
            <p>{formatTime(exercise.duration)}</p>
          </div>
        ) : null}
      </div>
      <p className="flex text-right">{exercise.zone}</p>
    </div>
  ));
};

const renderSessionPart = (sessionPart, title) => (
  <div className="w-full text-s mt-3 p-1 bg-fifth/20 rounded" key={title}>
    <h3 className="text-alert">{title}</h3>
    {sessionPart.map((partItem, partIndex) => (
      <div key={partIndex}>
        <h4 className="mt-2">{partItem.multiplier}x</h4>
        {renderExercises(partItem.exercises)}
      </div>
    ))}
  </div>
);

const NewPlanAppLibrarySingleSessionParts = ({ singleSession }) => {
  return (
    <>
      {singleSession.sessionParts.map((sessionPart, sessionPartIndex) => (
        <div key={sessionPartIndex}>
          {renderSessionPart(sessionPart.warmUp, "Warm Up")}
          {renderSessionPart(sessionPart.main, "Main")}
          {renderSessionPart(sessionPart.coolDown, "Cool Down")}
        </div>
      ))}
    </>
  );
};

export default NewPlanAppLibrarySingleSessionParts;

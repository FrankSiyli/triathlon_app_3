import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import React from "react";

const Exercise = ({ exercise }) => (
  <div className="flex rounded mb-2">
    <p className="w-5/12">{exercise.name}</p>
    <div className="flex items-start justify-between w-7/12">
      {exercise.distance > 0 && (
        <div className="flex items-center mx-2">
          <DistanceSvg />
          <p>{exercise.distance}m</p>
        </div>
      )}
      {exercise.duration > 0 && (
        <div className="flex items-center mx-2">
          <WatchSvg />
          <p>{formatTime(exercise.duration)}</p>
        </div>
      )}
    </div>
    <p className="flex text-right">{exercise.zone}</p>
  </div>
);

const SessionPart = ({ sessionPart, title }) => (
  <div className="w-full text-s mt-3 p-1 rounded">
    <h3 className="text-alert">{title}</h3>
    {sessionPart.map((partItem, index) => (
      <div key={index} className="mb-2">
        <h4 className="mt-2">{partItem.multiplier}x</h4>
        {partItem.exercises.map((exercise, i) => (
          <Exercise key={i} exercise={exercise} />
        ))}
      </div>
    ))}
  </div>
);

const SingleSessionParts = ({ singleSession }) => (
  <>
    {singleSession.sessionParts.map((sessionPart, index) => (
      <div key={index}>
        <SessionPart sessionPart={sessionPart.warmUp} title="Warm Up" />
        <SessionPart sessionPart={sessionPart.main} title="Main" />
        <SessionPart sessionPart={sessionPart.coolDown} title="Cool Down" />
      </div>
    ))}
  </>
);

export default SingleSessionParts;

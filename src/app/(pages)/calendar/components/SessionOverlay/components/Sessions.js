import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { formatTime } from "@/app/helperFunctions/formatTime";
import getZones from "@/app/helperFunctions/getZones";
import { savedHrMaxState } from "@/app/recoil/atoms/user/savedHrMaxState";
import { savedSwimTimeState } from "@/app/recoil/atoms/user/savedSwimTimeState";
import { savedWattState } from "@/app/recoil/atoms/user/savedWattState";

const Sessions = ({
  singleActivity,
  openOverlay,
  activityIndex,
  wattIsActive,
}) => {
  const savedSwimTime = useRecoilValue(savedSwimTimeState);
  const savedHrMax = useRecoilValue(savedHrMaxState);
  const savedWattValue = useRecoilValue(savedWattState);

  const [openWarmUpImage, setOpenWarmUpImage] = useState(null);
  const [openMainImage, setOpenMainImage] = useState(null);
  const [openCoolDownImage, setOpenCoolDownImage] = useState(null);

  const renderExercises = (exercises, openImageState, setOpenImageState) => {
    if (!exercises || exercises.length === 0) return null;

    return exercises.map((exercise, exerciseIndex) => (
      <div
        key={exerciseIndex}
        className={`flex flex-row justify-between mb-2 ${
          exerciseIndex === 0 && exercises.length > 1 ? "mt-10" : ""
        }`}
      >
        <div className="flex gap-2 ml-2">
          {exercise.distance > 0 ? (
            <p>{exercise.distance}m</p>
          ) : exercise.duration > 0 ? (
            <p>{formatTime(exercise.duration)}</p>
          ) : null}
          <p>
            {getZones(
              exercise,
              savedSwimTime,
              savedHrMax,
              savedWattValue,
              wattIsActive
            )}
          </p>
        </div>
        <div
          className={`mx-3 ${
            exercise.duration === 0 && exercise.distance === 0
              ? "w-full"
              : "w-1/2 text-right"
          }`}
        >
          {exercise.name.trim() !== "" && (
            <button
              className={`text-sm rounded-md mr-1 cursor-default ${
                exercise.imageLink
                  ? "underline decoration-first decoration-2 underline-offset-4 cursor-pointer"
                  : ""
              }`}
              onClick={() => {
                if (exercise.imageLink) {
                  setOpenImageState(
                    exerciseIndex === openImageState
                      ? null
                      : exerciseIndex
                  );
                }
              }}
            >
              <p
                className={`${
                  exercise.duration === 0 && exercise.distance === 0
                    ? ""
                    : "text-right"
                }`}
              >
                {exercise.name}
              </p>
            </button>
          )}
          {exerciseIndex === openImageState && exercise.imageLink && (
            <div className="flex flex-col items-center bg-second m-3 rounded-md">
              <Image
                width={200}
                height={200}
                src={`/images/yoga_images/${exercise.imageLink}.png`}
                alt={`Yoga pose: ${exercise.name}`}
                className="my-5"
              />
            </div>
          )}
        </div>
      </div>
    ));
  };

  if (!Array.isArray(singleActivity.sessionParts)) return null;

  return (
    <>
      {openOverlay.includes(activityIndex) &&
        singleActivity.sessionParts.map((sessionSections, index) => (
          <div key={index}>
            {sessionSections.warmUp && sessionSections.warmUp.length > 0 && (
              <div>
                <p className="text-center text-alert p-2">Warm Up</p>
                {renderExercises(
                  sessionSections.warmUp[0]?.exercises,
                  openWarmUpImage,
                  setOpenWarmUpImage
                )}
              </div>
            )}
            {sessionSections.main && sessionSections.main.length > 0 && (
              <div>
                <p className="text-center text-alert p-2">Hauptteil</p>
                {renderExercises(
                  sessionSections.main[0]?.exercises,
                  openMainImage,
                  setOpenMainImage
                )}
              </div>
            )}
            {sessionSections.coolDown && sessionSections.coolDown.length > 0 && (
              <div>
                <p className="text-center text-alert p-2">Cool Down</p>
                {renderExercises(
                  sessionSections.coolDown[0]?.exercises,
                  openCoolDownImage,
                  setOpenCoolDownImage
                )}
              </div>
            )}
          </div>
       ) )}
    </>
  );
};

export default Sessions;

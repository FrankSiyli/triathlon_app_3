import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import { formatTime } from "@/app/helperFunctions/formatTime";
import getZones from "@/app/helperFunctions/getZones";
import { savedHrMaxState } from "@/app/recoil/atoms/user/savedHrMaxState";
import { savedSwimTimeState } from "@/app/recoil/atoms/user/savedSwimTimeState";
import { savedWattState } from "@/app/recoil/atoms/user/savedWattState";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import { wattIsActiveState } from "@/app/recoil/atoms/wattIsActiveState";
import { getSession } from "next-auth/react";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import CheckSvg from "@/app/components/SVGs/CheckSvg";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";

const Sessions = ({
  activity,
  handleViewClick,
  toggleOverlay,
  totalDistance,
  totalDuration,
  homepagePlan,
  setError,
  setShowAlert,
}) => {
  const [, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [isLoading, setIsLoading] = useState(false);
  const savedSwimTime = useRecoilValue(savedSwimTimeState);
  const savedHrMax = useRecoilValue(savedHrMaxState);
  const savedWattValue = useRecoilValue(savedWattState);
  const [wattIsActive, setWattIsActive] = useRecoilState(wattIsActiveState);
  const [openWarmUpImage, setOpenWarmUpImage] = useState(null);
  const [openMainImage, setOpenMainImage] = useState(null);
  const [openCoolDownImage, setOpenCoolDownImage] = useState(null);
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] =
    useRecoilState(loggedInUserLastLoadedPlanState);

  const handleWattClick = () => {
    setWattIsActive(!wattIsActive);
  };

  const handleIsDoneClick = async () => {
    const session = await getSession();
    const planId = homepagePlan._id;
    if (!session) {
      setShowAlert(true);
      setError("Bitte melde dich an");
      return;
    }
    if (session) {
      if (loggedInUserLastLoadedPlan.length === 0) {
        setShowAlert(true);
        setError("Bitte wähle einen neuen Plan");
        return;
      }
      setIsLoading(true);
      try {
        const userEmail = session.user.email;
        const updateUserSessionIsDone = await fetch(
          "/api/user/updateUserTrainingPlanMadeSessions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userEmail,
              planId: planId,
              session: activity, 
            }),
          }
        );
        if (updateUserSessionIsDone.ok) {
          const { updatedPlan } = await updateUserSessionIsDone.json();
          setHomepagePlan(updatedPlan);
        }
      } catch (error) {
        console.error("User update error:", error);
      }
      setIsLoading(false);
    }
  };

  const renderExercises = (exercises, openImageState, setOpenImageState) => {
    if (!exercises || exercises.length === 0) return null;

    return exercises.map((exercise, exerciseIndex) => (
      <div
        key={exerciseIndex}
        className={`flex flex-row justify-between mb-2 ${
          exerciseIndex === 0 && exercises.length > 0 ? "mt-2" : ""
        }`}
      >
        <div className="flex gap-2 ml-2 text-xs">
          {exercise.distance > 0 ? (
            <p className="bg-blue/10 rounded p-1">{exercise.distance}m</p>
          ) : exercise.duration > 0 ? (
            <p className="bg-purple/10 rounded p-1">
              {formatTime(exercise.duration)}
            </p>
          ) : null}
          <p className="bg-green/10 rounded p-1">
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
                  ? "underline decoration-alert/30 decoration underline-offset-2 cursor-pointer"
                  : ""
              }`}
              onClick={() => {
                if (exercise.imageLink) {
                  setOpenImageState(
                    exerciseIndex === openImageState ? null : exerciseIndex
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

  if (!activity.sessionParts || typeof activity.sessionParts !== 'object') return null;

  return (
    <>
    

      {Object.entries(activity.sessionParts).map(([key, sessionSections]) => (
        <div key={key} className="text-s">
          {sessionSections.warmUp && sessionSections.warmUp.length > 0 && (
            <div>
              <p className="text-left bg-fourth/10 p-1">Warm Up</p>
              {renderExercises(
                sessionSections.warmUp[0]?.exercises,
                openWarmUpImage,
                setOpenWarmUpImage
              )}
            </div>
          )}
          {sessionSections.main && sessionSections.main.length > 0 && (
            <div>
              <p className="text-left bg-fourth/10 p-1">Hauptteil</p>
              {renderExercises(
                sessionSections.main[0]?.exercises,
                openMainImage,
                setOpenMainImage
              )}
            </div>
          )}
          {sessionSections.coolDown && sessionSections.coolDown.length > 0 && (
            <div>
              <p className="text-left bg-fourth/10 p-1">Cool Down</p>
              {renderExercises(
                sessionSections.coolDown[0]?.exercises,
                openCoolDownImage,
                setOpenCoolDownImage
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Sessions;

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
              week: currentWeek,
              session: activity[4],
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
    }
    setIsLoading(false);
  };

  const renderExercises = (exercises, openImageState, setOpenImageState) => {
    if (!exercises || exercises.length === 0) return null;

    return exercises.map((exercise, exerciseIndex) => (
      <>
        <div
          key={exerciseIndex}
          className={`flex flex-row justify-between mb-2 ${
            exerciseIndex === 0 && exercises.length > 0 ? "mt-2" : ""
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
      </>
    ));
  };

  if (!Array.isArray(activity.sessionParts)) return null;

  return (
    <>
      <div className="flex">
        <div className="flex flex-col items-start">
          <button
            onClick={() => toggleOverlay(activity.id)}
            className="m-3 border border-alert rounded-md shadow hover:text-alert"
          >
            <UncheckSvg />
          </button>

          <button
            onClick={handleIsDoneClick}
            className="btn btn-ghost btn-sm border border-transparent "
          >
            {isLoading && (
              <div className="flex justify-center items-center border border-alert rounded-md w-7 h-7">
                <span className="loading loading-ring loading-xs"></span>
              </div>
            )}
            {!isLoading && !activity.isDone && (
              <div className="border border-alert rounded-md">
                <CheckSvg />
              </div>
            )}
            {!isLoading && activity.isDone && (
              <div className="border border-alert rounded-md ">
                <UncheckSvg />
              </div>
            )}
          </button>

          {activity.activity === "Rad" ? (
            <button
              onClick={handleWattClick}
              className="flex justify-center items-center text-sm m-3 border border-alert rounded-md"
            >
              <span className={`ml-1 ${wattIsActive ? "text-alert" : null}`}>
                W
              </span>
              <span className="m-1">|</span>
              <span className={`mr-1 ${!wattIsActive ? "text-alert" : null}`}>
                Puls
              </span>
            </button>
          ) : null}
        </div>
        <div className="w-full h-auto text-right">
          <p className="p-1">{activity.activity}</p>
          <p className="p-1">{activity.description}</p>
          {totalDistance > 0 ? (
            <div className="flex justify-end p-1 -mb-2">
              <div className="flex items-center">
                <DistanceSvg />
              </div>
              {totalDistance}m
            </div>
          ) : null}
          {totalDistance > 0 && totalDuration > 0 ? (
            <span className="mr-5">+</span>
          ) : null}
          {totalDuration > 0 ? (
            <div className="flex justify-end items-center p-1 -mt-1">
              <WatchSvg />
              {formatTime(totalDuration)}
            </div>
          ) : null}
        </div>
      </div>
      <hr
        className={`m-3  ${activity.isDone ? "text-green" : "opacity-5"}`}
      ></hr>
      {activity.sessionParts.map((sessionSections, index) => (
        <div key={index} className="text-s">
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
      <hr className="m-3 opacity-20 "></hr>
      <div className="flex flex-col  items-center">
        <button
          className="btn btn-sm m-3 w-32 btn-outline border border-alert hover:text-alert shadow text-fifth/70"
          onClick={handleViewClick}
        >
          Druckversion
        </button>
        <button
          onClick={() => toggleOverlay(activity.id)}
          className="border border-alert shadow rounded-md mb-20"
        >
          <UncheckSvg />
        </button>
      </div>
    </>
  );
};

export default Sessions;

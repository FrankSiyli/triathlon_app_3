"use client";
import React, { useState } from "react";
import PrintSessions from "./components/PrintSessions";
import Sessions from "./components/Sessions";
import NavBar from "@/app/components/NavBar/NavBar";
import Alert from "@/app/components/Alerts/Alert";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useRecoilState } from "recoil";
import CheckSvg from "@/app/components/SVGs/CheckSvg";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import { homepagePlanClickedDayState } from "@/app/recoil/atoms/plans/homepagePlanClickedDayState";
import { wattIsActiveState } from "@/app/recoil/atoms/wattIsActiveState";

const SessionOverlay = ({
  sessionSections,
  activity,
  activityIndex,
  openOverlay,
  toggleOverlay,
  initialOpen = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [overlayView, setOverlayView] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [wattIsActive, setWattIsActive] = useRecoilState(wattIsActiveState);

  const totalDistance = calculateTotalDistance(activity, sessionSections);
  const totalDuration = calculateTotalDuration(activity, sessionSections);

  const handleViewClick = () => {
    setOverlayView(!overlayView);
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




  return (
    <div>
      {initialOpen && (
        <div
          onClick={() => toggleOverlay(activity.id)}
          className="fixed top-0 left-0 w-screen h-screen bg-background/70 z-20"
        ></div>
      )}
      <div
        className={`bg-first fixed z-30 max-w-xl my-2 mx-auto inset-0 text-center overflow-x-hidden overflow-y-scroll border-t-4 ${getActivityBorderColor(
          activity.activity
        )} ${initialOpen ? "block" : "hidden"}`}
      >
        {overlayView ? (
          <div className="z-40">
            <div className="flex">
              <div className="flex flex-col items-start">
                <button
                  onClick={() => toggleOverlay(dayIndex, activityIndex)}
                  className=" btn btn-ghost btn-sm  m-3 border border-transparent text-first "
                >
                  <ArrowLeftSvg />
                </button>

                <button
                  onClick={handleIsDoneClick}
                  className=" btn btn-ghost btn-sm  border border-transparent text-first "
                >
                  {isLoading && (
                    <div className="flex justify-center items-center border border-alert rounded-md w-7 h-7">
                      <span className="loading loading-ring loading-xs"></span>
                    </div>
                  )}
                  {!isLoading && !activity[3] && (
                    <div className="border border-alert rounded-md">
                      <CheckSvg />
                    </div>
                  )}
                  {!isLoading && activity[3] && (
                    <div className="border border-alert rounded-md ">
                      <UncheckSvg />
                    </div>
                  )}
                </button>

                {activity[0] === "Rad" ? (
                  <button
                    onClick={handleWattClick}
                    className="flex justify-center items-center text-sm m-3  border border-alert rounded-md"
                  >
                    <span
                      className={`ml-1 ${wattIsActive ? "text-alert" : null}`}
                    >
                      W
                    </span>
                    <span className="m-1">|</span>
                    <span
                      className={`mr-1 ${!wattIsActive ? "text-alert" : null}`}
                    >
                      Puls
                    </span>
                  </button>
                ) : null}
              </div>
              <div className="w-full h-auto text-right p-1 mr-1">
                <p>{activity[0]}</p>
                <p className="my-1">{activity[1]}</p>
                {totalDistance > 0 ? (
                  <div className="flex justify-end mt-5 -mb-2">
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
                  <div className="flex justify-end items-center -mt-1">
                    <WatchSvg />
                    {formatTime(totalDuration)}
                  </div>
                ) : null}
              </div>
            </div>
            <hr
              className={`m-3  ${
                activity[3] ? "text-green" : "opacity-20"
              }`}
            ></hr>
            <Sessions
              activity={activity}
              openOverlay={openOverlay}
              activityIndex={activityIndex}
              wattIsActive={wattIsActive}
            />
            <hr className="m-3 opacity-20 "></hr>
            <div className="flex flex-col  items-center">
              <button
                className="btn btn-sm m-3 w-32 btn-outline border border-alert hover:text-alert text-first"
                onClick={handleViewClick}
              >
                Druckversion
              </button>
              <button
                onClick={() => toggleOverlay(dayIndex, activityIndex)}
                className="border border-alert text-alert rounded-md mb-20"
              >
                <UncheckSvg />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex">
              <button
                onClick={() => toggleOverlay(dayIndex, activityIndex)}
                className="focus:outline-none top-5 left-5 btn btn-ghost btn-sm  m-3 border border-transparent text-first "
              >
                <ArrowLeftSvg />
              </button>{" "}
            </div>
            <PrintSessions
              ref={printComponentRef}
              activity={activity}
              openOverlay={openOverlay}
              dayIndex={dayIndex}
              activityIndex={activityIndex}
              totalDistance={totalDistance}
              totalDuration={totalDuration}
              wattIsActive={wattIsActive}
            />
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-row gap-3">
                <button
                  className="btn btn-sm m-3 w-32 btn-outline border border-alert hover:text-alert text-first"
                  onClick={handleViewClick}
                >
                  Farbversion
                </button>
                <button
                  onClick={handlePrint}
                  className="btn btn-sm m-3 w-32 btn-outline border border-alert hover:text-alert text-first"
                >
                  drucken
                </button>
              </div>
              <button
                onClick={() => toggleOverlay(dayIndex, activityIndex)}
                className="border border-alert text-alert rounded-md mb-20"
              >
                <UncheckSvg />
              </button>
            </div>
          </>
        )}
        <p className="mb-16">Viel Spaß beim Training 🙂</p>
        {error && showAlert && (
          <Alert alertText={error} setShowAlert={setShowAlert} />
        )}
        <NavBar />
      </div>
    </div>
  );
};

export default SessionOverlay;

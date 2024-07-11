"use client";
import React, { useState, useRef, useEffect } from "react";
import PrintSessions from "./components/PrintSessions";
import { useReactToPrint } from "react-to-print";
import Sessions from "./components/Sessions";
import calculateTotalDistance from "../../logicFunctions/totalDistanceFunction";
import calculateTotalDuration from "../../logicFunctions/totalDurationFunction";
import { formatTime } from "@/app/helperFunctions/formatTime";
import NavBar from "@/app/components/NavBar/NavBar";
import { getSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import Alert from "@/app/components/Alerts/Alert";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import { wattIsActiveState } from "@/app/recoil/atoms/wattIsActiveState";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import CheckSvg from "@/app/components/SVGs/CheckSvg";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";

const SessionOverlay = ({
  sessionSections,
  singleActivity,
  dayIndex,
  activityIndex,
  openOverlay,
  toggleOverlay,
  homepagePlan,
  currentWeek,
  initialOpen = false,
}) => {
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] =
    useRecoilState(loggedInUserLastLoadedPlanState);
  const [isLoading, setIsLoading] = useState(false);
  const [overlayView, setOverlayView] = useState(true);
  const [, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [wattIsActive, setWattIsActive] = useRecoilState(wattIsActiveState);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const handleViewClick = () => {
    setOverlayView(!overlayView);
  };
  const printComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const totalDistance = calculateTotalDistance(singleActivity, sessionSections);
  const totalDuration = calculateTotalDuration(singleActivity, sessionSections);

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
              session: singleActivity[4],
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

  const handleWattClick = () => {
    setWattIsActive(!wattIsActive);
  };

  return (
    <div>
      {initialOpen && <div className="dark-overlay"></div>}
      <div
        className={`overlay-background fixed z-30 max-w-xl mx-auto inset-0 text-center overflow-x-hidden overflow-y-scroll ${
          initialOpen ? "block" : "hidden"
        }`}
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
                  {!isLoading && !singleActivity[3] && (
                    <div className="border border-alert rounded-md">
                      <CheckSvg />
                    </div>
                  )}
                  {!isLoading && singleActivity[3] && (
                    <div className="border border-alert rounded-md ">
                      <UncheckSvg />
                    </div>
                  )}
                </button>

                {singleActivity[0] === "Rad" ? (
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
                <p>{singleActivity[0]}</p>
                <p className="my-1">{singleActivity[1]}</p>
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
                singleActivity[3] ? "text-green" : "opacity-20"
              }`}
            ></hr>
            <Sessions
              singleActivity={singleActivity}
              openOverlay={openOverlay}
              dayIndex={dayIndex}
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
              singleActivity={singleActivity}
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

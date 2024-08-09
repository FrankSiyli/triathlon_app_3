"use client";
import React, { useState, useRef } from "react";
import PrintSessions from "./components/PrintSessions";
import Sessions from "./components/Sessions";
import NavBar from "@/app/components/NavBar/NavBar";
import Alert from "@/app/components/Alerts/Alert";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { useRecoilState } from "recoil";
import CheckSvg from "@/app/components/SVGs/CheckSvg";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import WatchSvg from "@/app/components/SVGs/WatchSvg";
import { formatTime } from "@/app/helperFunctions/formatTime";
import DistanceSvg from "@/app/components/SVGs/DistanceSvg";
import { wattIsActiveState } from "@/app/recoil/atoms/wattIsActiveState";
import { useReactToPrint } from "react-to-print";

const SessionOverlay = ({
  sessionSections,
  activity,
  toggleOverlay,
  initialOpen = false,
}) => {
  const [overlayView, setOverlayView] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [wattIsActive, setWattIsActive] = useRecoilState(wattIsActiveState);

  const totalDistance = calculateTotalDistance(activity, sessionSections);
  const totalDuration = calculateTotalDuration(activity, sessionSections);

  const printComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const handleIsDoneClick = () => {
    setHomepagePlan((prevPlan) => {
      const updatedWeeks = prevPlan.weeks.map((week) => {
        const updatedDays = Object.entries(week.days).reduce((acc, [day, activities]) => {
          const updatedActivities = activities.map((act) =>
            act._id === activity._id ? { ...act, isDone: !act.isDone } : act
          );
          return { ...acc, [day]: updatedActivities };
        }, {});
        return { ...week, days: updatedDays };
      });
      return { ...prevPlan, weeks: updatedWeeks };
    });
  };

  const handleWattClick = () => {
    setWattIsActive(!wattIsActive);
  };

  const handleViewClick = () => {
    setOverlayView(!overlayView);
  };

  return (
    <div>
      {initialOpen && (
        <div
          onClick={() => toggleOverlay(activity._id)}
          className="fixed top-0 left-0 w-screen h-screen bg-background/70 z-20"
        ></div>
      )}
      <div
        className={`fixed z-30 max-w-xl my-2 mx-auto inset-0 bg-[#fff] text-center overflow-x-hidden overflow-y-scroll border-t-4 ${getActivityBorderColor(
          activity.activity
        )} ${initialOpen ? "block" : "hidden"}`}
      >
        {overlayView ? (
          <div className="z-40">
            <div className="flex">
              <div className="flex flex-col items-start">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOverlay(activity._id);
                  }}
                  className="m-2 border border-alert/50 rounded-md hover:text-alert shadow hover:shadow-xl"
                >
                  <UncheckSvg />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIsDoneClick();
                  }}
                  className="m-2 rounded-md hover:text-alert shadow hover:shadow-xl"
                >
                  {activity.isDone ? (
                    <span className="text-xs flex justify-center items-center border border-alert/50 rounded text-alert text-left px-1 line-through">abgeschlossen</span>
                  ) : (
                   <span className="text-xs flex justify-center items-center border border-alert/50 rounded text-alert text-left px-1">abgeschlossen</span>
                  )}
                </button>

                {activity.activity === "Rad" && (
                  <button
                    onClick={handleWattClick}
                    className="flex justify-center items-center text-sm m-3 border border-alert rounded-md"
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
                )}
              </div>
              <div className="w-full h-auto text-right p-1 mr-1 text-s">
                <p className="px-1">{activity.activity}</p>
                <p className="px-1">{activity.description}</p>
                {totalDistance > 0 && (
                  <div className="flex justify-end mt-5 -mb-2">
                    <div className="flex items-center">
                      <DistanceSvg />
                    </div>
                    {totalDistance}m
                  </div>
                )}
                {totalDistance > 0 && totalDuration > 0 && (
                  <span className="mr-5">+</span>
                )}
                {totalDuration > 0 && (
                  <div className="flex justify-end items-center -mt-1">
                    <WatchSvg />
                    {formatTime(totalDuration)}
                  </div>
                )}
              </div>
            </div>
            <div className={`my-3 border ${activity.isDone ? " border-green" : "border-fifth/50"}`}></div>
            <Sessions
              activity={activity}
              openOverlay={true}
              wattIsActive={wattIsActive}
            />
            <div className="flex flex-col items-center">
              <button
                className="btn btn-sm m-3 w-32 btn-outline border border-alert hover:text-alert/30 text-alert"
                onClick={handleViewClick}
              >
                Druckversion
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOverlay(activity._id);
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOverlay(activity._id);
                }}
                className="border border-alert text-alert rounded-md m-3"
              >
                <UncheckSvg />
              </button>
            </div>
            <PrintSessions
              ref={printComponentRef}
              activity={activity}
              openOverlay={true}
              totalDistance={totalDistance}
              totalDuration={totalDuration}
              wattIsActive={wattIsActive}
            />
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-row gap-3">
                <button
                  className="btn btn-sm m-3 w-32 btn-outline border border-alert hover:text-alert/30 text-alert"
                  onClick={handleViewClick}
                >
                  Farbversion
                </button>
                <button
                  onClick={handlePrint}
                  className="btn btn-sm m-3 w-32 btn-outline border border-alert hover:text-alert/30 text-alert"
                >
                  drucken
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOverlay(activity._id);
                }}
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

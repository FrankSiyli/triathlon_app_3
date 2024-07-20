"use client";
import React, { useState } from "react";
import PrintSessions from "./components/PrintSessions";
import Sessions from "./components/Sessions";
import calculateTotalDistance from "../../logicFunctions/totalDistanceFunction";
import calculateTotalDuration from "../../logicFunctions/totalDurationFunction";
import NavBar from "@/app/components/NavBar/NavBar";
import Alert from "@/app/components/Alerts/Alert";

const SessionOverlay = ({
  sessionSections,
  activity,
  openOverlay,
  toggleOverlay,
  homepagePlan,
  initialOpen = false,
}) => {
  const [overlayView, setOverlayView] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const totalDistance = calculateTotalDistance(activity, sessionSections);
  const totalDuration = calculateTotalDuration(activity, sessionSections);

  const handleViewClick = () => {
    setOverlayView(!overlayView);
  };

  const getActivityBorderColor = (activityType) => {
   switch (activityType) {
      case "Laufen":
        return "border-orange/10";
      case "Schwimmen":
        return "border-blue/10";
      case "Yoga":
        return "border-green/10";
      case "Rad":
        return "border-yellow/50";
      case "Sonstiges":
        return "border-red/10";
      case "Faszienrolle":
        return "border-purple/10";
      case "Stabi":
        return "border-alert/10";
      default:
        return "border-grey/10";
    }
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
          <Sessions
            activity={activity}
            handleViewClick={handleViewClick}
            toggleOverlay={toggleOverlay}
            totalDistance={totalDistance}
            totalDuration={totalDuration}
            homepagePlan={homepagePlan}
            setShowAlert={setShowAlert}
            setError={setError}
          />
        ) : (
          <PrintSessions
            activity={activity}
            openOverlay={openOverlay}
            totalDistance={totalDistance}
            totalDuration={totalDuration}
            handleViewClick={handleViewClick}
            toggleOverlay={toggleOverlay}
          />
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

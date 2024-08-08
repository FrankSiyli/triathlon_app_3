"use client";
import React, { useState } from "react";
import PrintSessions from "./components/PrintSessions";
import Sessions from "./components/Sessions";
import NavBar from "@/app/components/NavBar/NavBar";
import Alert from "@/app/components/Alerts/Alert";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";
import { calculateTotalDistance } from "@/app/helperFunctions/calculateTotalDistance";
import { calculateTotalDuration } from "@/app/helperFunctions/calculateTotalDuration";

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

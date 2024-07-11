"use client";
import React, { useEffect, useState } from "react";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import { newPlanClickedSessionTypeState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeState";
import Image from "next/image";
import { useRecoilState } from "recoil";
import NewPlanAppLibrarySessionTypes from "./components/NewPlanAppLibrarySessionTypes";
import { newPlanClickedSessionTypeApiState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeApiState";

const AppLibrary = ({ image, title, setShowPlans }) => {
  const [singleSessions, setSingleSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newPlanClickedSessionTypeApi, setNewPlanClickedSessionTypeApi] =
    useRecoilState(newPlanClickedSessionTypeApiState);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(newPlanClickedSessionTypeApi, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setSingleSessions(data.sessions);
        } else {
          console.error("Failed to fetch sessions. Status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [newPlanClickedSessionTypeApi]);

  const [newPlanClickedSessionType, setNewPlanClickedSessionType] =
    useRecoilState(newPlanClickedSessionTypeState);
  const handleBackClick = () => {
    setShowPlans();
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <button
          className="top-5 left-5 btn btn-ghost btn-sm m-3 border border-transparent text-first"
          onClick={handleBackClick}
        >
          <ArrowLeftSvg />
        </button>
      </div>
      <p className="mx-auto text-center -mt-10">{title}</p>
      <Image
        className="absolute top-0 right-0 h-16 w-24 rounded-bl"
        src={image}
        alt="sport image"
        width={80}
        height={80}
      />
      <div className="h-16 absolute right-0 top-0 w-24 bg-gradient-to-l from-transparent via-transparent via-80% to-fifth z-10"></div>
      <div className="h-16 absolute right-0 top-0 w-24 bg-gradient-to-b from-transparent via-transparent via-80% to-fifth z-10"></div>
      {newPlanClickedSessionType && (
        <NewPlanAppLibrarySessionTypes
          isLoading={isLoading}
          singleSessions={singleSessions}
        />
      )}
    </>
  );
};

export default AppLibrary;

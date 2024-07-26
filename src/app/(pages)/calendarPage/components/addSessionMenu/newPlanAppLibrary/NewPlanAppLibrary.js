import React, { useEffect, useState } from "react";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import { newPlanClickedSessionTypeState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeState";
import Image from "next/image";
import { useRecoilState } from "recoil";
import NewPlanAppLibrarySessionTypes from "./components/NewPlanAppLibrarySessionTypes";
import { newPlanClickedSessionTypeApiState } from "@/app/recoil/atoms/planBuilder/newPlanClickedSessionTypeApiState";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";
import NewPlanSessionTypes from "../newPlanCalendarSessionTypes/NewPlanCalendarSessionTypes";

const AppLibrary = ({ setShowPlans }) => {
  const [showAddSessionMenu, setShowAddSessionMenu] =
  useRecoilState(showAddSessionMenuState);

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


  console.log("applibrary singleSessions", singleSessions)
  console.log("applibrary newPlanClickedSessionTypeApi", newPlanClickedSessionTypeApi)


  return (
    <div className="fixed top-0 left-0 z-40 h-screen w-screen overflow-y-scroll sm:w-1/3 bg-lightBlue shadow-xl flex flex-col justify-center">
      <button
        onClick={() => setShowAddSessionMenu(false)}
        className="absolute top-2 right-2 border border-alert shadow rounded-md mb-20"
      >
        <UncheckSvg />
      </button>


      <NewPlanSessionTypes/>
      
      {newPlanClickedSessionType && (
        <NewPlanAppLibrarySessionTypes
          isLoading={isLoading}
          singleSessions={singleSessions}
        />
      )}
    </div>
  );
};

export default AppLibrary;

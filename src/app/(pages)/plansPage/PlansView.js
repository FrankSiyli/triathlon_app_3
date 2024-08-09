"use client";
import React, { useState } from "react";
import PlanComponent from "./components/PlanComponent";
import Image from "next/image";
import ArrowRightSvg from "@/app/components/SVGs/arrows/ArrowRightSvg";
import { useRecoilState } from "recoil";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import CalendarPage from "../calendarPage/CalendarPage";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { navBarState } from "@/app/recoil/atoms/navBar/navBarState";
import { v4 as uuidv4 } from 'uuid';

const planTypes = [
  {
    type: "triathlonPlans",
    name: "Triathlon",
    imageSrc: "/images/triathlonImage.jpg",
    apiEndpoint: "/api/trainingPlans/fetchTriathlonPlans",
  },
  {
    type: "runPlans",
    name: "Laufen",
    imageSrc: "/images/runImage.jpg",
    apiEndpoint: "/api/trainingPlans/fetchRunPlans",
  },
  {
    type: "swimPlans",
    name: "Schwimmen",
    imageSrc: "/images/swimImage.jpg",
    apiEndpoint: "/api/trainingPlans/fetchSwimPlans",
  },
];

const PlansView = () => {
  const [hoveredConsumableId, setHoveredConsumableId] = useState(null);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [activeView, setActiveView] = useRecoilState(navBarState);

  const [activeComponent, setActiveComponent] =
    useRecoilState(activeComponentState);

  const handlePlanTypeClick = (planType) => {
    setActiveComponent(planType);
  };

  const renderPlanButton = ({ type, name, imageSrc }) => (
    <button
      key={type} 
      onMouseEnter={() => setHoveredConsumableId(type)}
      onMouseLeave={() => setHoveredConsumableId(null)}
      className="flex justify-center items-center w-full max-w-xl h-10 shadow hover:shadow-md rounded-md my-1 transform transition-all duration-300"
      onClick={() => handlePlanTypeClick(type)}
    >
      <div className="absolute top-0 left-0 flex items-center overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          width={640}
          height={360}
          className={`h-10 w-16 rounded shadow transform transition-transform duration-300 ${
            hoveredConsumableId === type ? "scale-150" : ""
          }`}
        />
        <div className="h-10 absolute left-0 top-0 w-16 bg-gradient-to-r from-transparent via-transparent via-80% to-first z-40"></div>
      </div>
      <div className="flex flex-row ml-5">
        <p className="relative">{name}</p>
      </div>
      <div className="absolute top- right-0">
        <ArrowRightSvg />
      </div>
    </button>
  );

  const renderPlanComponent = (type, title, apiEndpoint, image) => (
    <PlanComponent
      key={type} 
      title={title}
      apiEndpoint={apiEndpoint}
      setShowPlans={() => handlePlanTypeClick("plans")}
      image={image}
    />
  );

  const handleNewPlanClick = () => {
    const newPlanId = uuidv4(); 
  
    setHomepagePlan({
      _id: newPlanId, 
      name: "Planname // klicken um zu ändern",
      weeks: [
        {
          week: 1,
          days: {
            Montag: [],
            Dienstag: [],
            Mittwoch: [],
            Donnerstag: [],
            Freitag: [],
            Samstag: [],
            Sonntag: [],
          },
        },
      ],
      duration: 1,
    });
  
    setActiveView('calendar');
  };

  const renderCreateNewPlanButton = () => (
    <button
      key="createNewPlan" 
      onMouseEnter={() => setHoveredConsumableId("createNewPlan")}
      onMouseLeave={() => setHoveredConsumableId(null)}
      className="flex justify-center items-center w-full max-w-xl h-10 shadow hover:shadow-md rounded-md my-1 transform transition-all duration-300"
      onClick={handleNewPlanClick}
    >
      <div className="absolute top-0 left-0 flex items-center overflow-hidden">
        <Image
          src={"/images/planBuilderImage.jpg"}
          alt={"Einen neuen Plan erstellen"}
          width={640}
          height={360}
          className={`h-10 w-16 rounded shadow transform transition-transform duration-300 ${
            hoveredConsumableId === "createNewPlan" ? "scale-150" : ""
          }`}
        />
        <div className="h-10 absolute left-0 top-0 w-16 bg-gradient-to-r from-transparent via-transparent via-80% to-first z-40"></div>
      </div>
      <div className="flex flex-row ml-5">
        <p className="relative">Einen neuen Plan erstellen</p>
      </div>
      <div className="absolute top- right-0">
        <ArrowRightSvg />
      </div>
    </button>
  );

  return (
    <>
      {activeComponent === "plans" && (
        <div className="flex flex-col items-center relative overflow-y-auto max-h-screen w-screen">
          <span className="flex mx-auto text-center text-alert my-5 px-3 py-1 z-20 rounded-sm">
            Trainingspläne
          </span>

          <div className="h-auto w-full flex flex-col items-center overflow-y-auto max-h-screen">
            {planTypes.map(renderPlanButton)}

            {renderCreateNewPlanButton()}
          </div>
        </div>
      )}
      {activeComponent === "calendarPage" && <CalendarPage />}

      {planTypes
        .filter((plan) => plan.type === activeComponent)
        .map(({ type, name, apiEndpoint, imageSrc }) =>
          renderPlanComponent(type, `${name}`, apiEndpoint, imageSrc)
        )}
    </>
  );
};

export default PlansView;

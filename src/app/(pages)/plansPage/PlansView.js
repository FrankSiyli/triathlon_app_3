"use client";
import React, { useState } from "react";
import PlanComponent from "./components/PlanComponent";
import Image from "next/image";
import ArrowRightSvg from "@/app/components/SVGs/arrows/ArrowRightSvg";
import { useRecoilState } from "recoil";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";

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
  {
    type: "planBuilder",
    name: "Plan erstellen",
    imageSrc: "/images/planBuilderImage.jpg",
  },
];

const PlansView = () => {
  const [hoveredConsumableId, setHoveredConsumableId] = useState(null);

  const [activeComponent, setActiveComponent] =
    useRecoilState(activeComponentState);

  const handlePlanTypeClick = (planType) => {
    setActiveComponent(planType);
  };

  const renderPlanButton = ({ type, name, imageSrc, subTitle }) => (
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
        <p className="relative">
          {name}{" "}
         
        </p>
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

  return (
    <>
      {activeComponent === "plans" && (
        <div className="flex flex-col items-center relative overflow-y-auto max-h-screen w-screen">
          <span className="flex mx-auto text-center bg-fourth/10 text-fifth/80 my-5 px-3 py-1 z-20 rounded-sm">
            Trainingspläne
          </span>

          <div className="h-auto w-full flex flex-col items-center overflow-y-auto max-h-screen">
            {planTypes.map(renderPlanButton)}
          </div>
        </div>
      )}

      {planTypes
        .filter((plan) => plan.type === activeComponent)
        .map(({ type, name, apiEndpoint, imageSrc }) =>
          renderPlanComponent(type, `${name}`, apiEndpoint, imageSrc)
        )}

      {activeComponent === "planBuilder" && (
        <PlanBuilder
          title="Plan erstellen"
          setShowPlans={() => handlePlanTypeClick("plans")}
          image="/images/planBuilderImage.jpg"
        />
      )}

      {activeComponent === "newPlan" && (
        <NewPlan
          title="Plan erstellen"
          setShowPlans={() => handlePlanTypeClick("planBuilder")}
          image="/images/planBuilderImage.jpg"
        />
      )}
    </>
  );
};

export default PlansView;

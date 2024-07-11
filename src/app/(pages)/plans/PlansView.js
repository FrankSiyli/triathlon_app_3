"use client";
import React, { useState } from "react";
import PlanComponent from "./components/PlanComponent";
import Image from "next/image";
import PlanBuilder from "./components/newPlanBuilder/components/NewPlanBuilder";
import NewPlan from "./components/newPlanBuilder/components/newPlanCalendar/NewPlanCalendar";
import ArrowRightSvg from "@/app/components/SVGs/arrows/ArrowRightSvg";
import AppLibrary from "./components/newPlanBuilder/components/newPlanAppLibrary/NewPlanAppLibrary";

function PlansView() {
  const [activeComponent, setActiveComponent] = useState("plans");

  const handlePlanTypeClick = (planType) => {
    setActiveComponent(planType);
  };

  const planTypes = [
    {
      type: "triathlonPlans",
      name: "Triathlon",
      imageSrc: "/images/triathlonImage.jpg",
    },
    {
      type: "runPlans",
      name: "Laufen",
      imageSrc: "/images/runImage.jpg",
    },
    {
      type: "swimPlans",
      name: "Schwimmen",
      imageSrc: "/images/swimImage.jpg",
    },
    {
      type: "planBuilder",
      name: "Plan erstellen",
      subTitle: "Feature ist in Arbeit",
      imageSrc: "/images/planBuilderImage.jpg",
    },
  ];

  return (
    <>
      {activeComponent === "plans" && (
        <>
          <div className="flex items-center mx-auto text-center border border-sixth/50 mt-11 mb-10 px-3 py-1 z-20 rounded-md backdrop-blur-sm shadow-xl">
            <span>Trainingspläne</span>
          </div>
          <Image
            className="absolute top-0 right-0 h-16 w-full z-10 object-cover object-top opacity-50"
            src="/images/triathlonImage_4.jpg"
            alt="sport image"
            quality={100}
            priority
            width={600}
            height={600}
          />
          <div className="h-16 absolute right-0 top-0 w-full  bg-gradient-to-b from-transparent via-transparent via-80% to-first z-10"></div>
        </>
      )}

      {activeComponent === "plans" && (
        <div className="flex flex-col mx-auto max-w-xl relative h-auto w-full overflow-y-auto max-h-screen ">
          {planTypes.map((planType) => (
            <button
              key={planType.type}
              className="relative flex justify-between  h-12 w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
              onClick={() => handlePlanTypeClick(planType.type)}
            >
              <div>
                <Image
                  className="h-12 object-cover absolute left-0 top-0 rounded-l-sm"
                  src={planType.imageSrc}
                  alt="siyli app"
                  width={80}
                  height={80}
                />
                <div className="h-12 absolute left-0 top-0 w-20  bg-gradient-to-r from-transparent via-transparent via-80% to-fifth z-40"></div>
              </div>
              <div className="flex flex-col">
                <p className="ml-5"> {planType.name}</p>
                <p className="ml-5 text-alert text-xs"> {planType.subTitle}</p>
              </div>
              <ArrowRightSvg />
            </button>
          ))}
        </div>
      )}

      {activeComponent === "runPlans" && (
        <PlanComponent
          title="Laufpläne"
          apiEndpoint="/api/trainingPlans/fetchRunPlans"
          setShowPlans={() => handlePlanTypeClick("plans")}
          image="/images/runImage.jpg"
        />
      )}

      {activeComponent === "swimPlans" && (
        <PlanComponent
          title="Schwimmpläne"
          apiEndpoint="/api/trainingPlans/fetchSwimPlans"
          setShowPlans={() => handlePlanTypeClick("plans")}
          image="/images/swimImage.jpg"
        />
      )}
      {activeComponent === "triathlonPlans" && (
        <PlanComponent
          title="Triathlonpläne"
          apiEndpoint="/api/trainingPlans/fetchTriathlonPlans"
          setShowPlans={() => handlePlanTypeClick("plans")}
          image="/images/triathlonImage.jpg"
        />
      )}
      {activeComponent === "planBuilder" && (
        <PlanBuilder
          title="Plan erstellen"
          setShowPlans={() => handlePlanTypeClick("plans")}
          image="/images/planBuilderImage.jpg"
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "newPlan" && (
        <NewPlan
          title="Plan erstellen"
          setShowPlans={() => handlePlanTypeClick("planBuilder")}
          image="/images/planBuilderImage.jpg"
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "appLibrary" && (
        <AppLibrary
          title="App-Bibliothek"
          setShowPlans={() => handlePlanTypeClick("newPlan")}
          image="/images/planBuilderImage.jpg"
        />
      )}
    </>
  );
}

export default PlansView;

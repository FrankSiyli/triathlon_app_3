"use client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import Alert from "@/app/components/Alerts/Alert";
import Loader from "../../../components/Loader/Loader";
import useSWR from "swr";
import { getSession } from "next-auth/react";
import Image from "next/image";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PlanComponent = ({ setShowPlans, title, apiEndpoint, image }) => {
  const { data, error, isLoading: isLoadingPlan } = useSWR(apiEndpoint, fetcher);
  const [expandedPlanIndex, setExpandedPlanIndex] = useState(null);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] = useRecoilState(loggedInUserLastLoadedPlanState);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const plans = data?.plans || [];

  const handleInfoClick = (planId) => {
    setExpandedPlanIndex(prev => (prev === planId ? null : planId));
  };

  const handleLoadPlanClick = async (event, plan) => {
    event.stopPropagation();
    setIsLoading(true);

    const session = await getSession();
    setHomepagePlan(plan);

    if (session) {
      try {
        const response = await fetch("/api/user/updateUserTrainingPlans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session.user.email,
            trainingPlans: plan,
            id: plan._id,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          setMessage(responseData.message);
          setLoggedInUserLastLoadedPlan(plan);
        }
      } catch (error) {
        console.error("Failed to update user training plans", error);
      }
    } else {
      setMessage("Im Kalender geladen");
    }

    setShowAlert(true);
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto">
      <div className="w-full max-w-xl flex relative justify-between items-center">
        <button className="top-5 left-5 btn btn-ghost btn-sm m-3" onClick={setShowPlans}>
          <ArrowLeftSvg />
        </button>
        <p>{title}</p>
        <Image className="relative h-16 w-24 rounded-bl" src={image} alt="sport image" width={80} height={80} />
        <div className="h-16 absolute right-0 top-0 w-24 bg-gradient-to-l from-transparent via-transparent via-80% to-first z-10"></div>
        <div className="h-16 absolute right-0 top-0 w-24 bg-gradient-to-b from-transparent via-transparent via-80% to-first z-10"></div>
      </div>

      {isLoading || isLoadingPlan ? (
        <Loader error={error} isLoading={isLoading || isLoadingPlan} />
      ) : plans.length === 0 ? (
        <div className="border border-first/50 rounded-md p-2 text-center mt-20 mx-5">
          Es wurde noch kein Plan erstellt
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10 gap-2 w-full max-w-xl">
          {plans.map(plan => (
            <div key={plan._id} className="w-full">
              <button
                onClick={() => handleInfoClick(plan._id)}
                className="flex justify-between items-center w-full max-w-xl h-10 shadow hover:shadow-md rounded-md my-1 transform transition-all duration-300"
              >
                <div className="absolute -top-2 left-1 text-alert text-sm">
                  <span className="icon-text">{plan.duration}w</span>
                </div>
                <div className="ml-5">{plan.name}</div>
                {expandedPlanIndex === plan._id ? <ArrowUpSvg /> : <ArrowDownSvg />}
              </button>

              {expandedPlanIndex === plan._id && (
                <div className="mt-5 select-none flex flex-col items-center">
                  <hr className="opacity-10 mx-1" />
                  <div className="w-full my-7 p-1 flex flex-col text-center">
                    <span className="p-1 border-l border-r border-alert">Wochen: {plan.duration}</span>
                    {plan.wishFrom && <span className="p-1 border-l border-r border-alert">Wunsch von: {plan.wishFrom}</span>}
                  </div>
                  <div className="font-light text-left">{plan.info}</div>
                  <button
                    onClick={(e) => handleLoadPlanClick(e, plan)}
                    className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-alert hover:text-alert/30 shadow"
                  >
                    Laden
                  </button>
                </div>
              )}
            </div>
          ))}
          {showAlert && <Alert alertText={message} setShowAlert={setShowAlert} />}
        </div>
      )}
    </div>
  );
};

export default PlanComponent;

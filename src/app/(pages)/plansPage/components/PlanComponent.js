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
  const {
    data,
    error,
    isLoading: isLoadingPlan,
  } = useSWR(apiEndpoint, fetcher);
  const plans = data?.plans;
  const [expandedPlanIndex, setExpandedPlanIndex] = useState(null);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] =
    useRecoilState(loggedInUserLastLoadedPlanState);

  const handleInfoClick = (plan) => {
    setExpandedPlanIndex((prevExpandedPlan) =>
      prevExpandedPlan === plan._id ? null : plan._id
    );
    setExpandedPlan(plan);
  };

  const handleLoadPlanClick = async (event) => {
    setIsLoading(true);
    const session = await getSession();
    const planId = expandedPlanIndex;
    setHomepagePlan(expandedPlan);
    event.stopPropagation();
    if (session) {
      setIsLoggedIn(true);
      try {
        const userEmail = session.user.email;
        const updateUser = await fetch("/api/user/updateUserTrainingPlans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            trainingPlans: expandedPlan,
            id: planId,
          }),
        });
        if (updateUser.ok) {
          if (updateUser.status === 200) {
            const responseJson = await updateUser.json();
            const serverMessage = responseJson.message;
            setShowAlert(true);
            setMessage(serverMessage);
          }
          setLoggedInUserLastLoadedPlan(expandedPlan);
        }
      } catch (error) {
        console.error("user update error");
      }
    }
    setIsLoading(false);
    setTimeout(() => {
      setShowAlert(true);
      setMessage(
        session
          ? "Im Kalender und unter meine Pläne geladen"
          : "Im Kalender geladen"
      );
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto">
      <div className="w-full max-w-xl flex relative justify-between items-center">
        <button
          className="top-5 left-5 btn btn-ghost btn-sm m-3"
          onClick={setShowPlans}
        >
          <ArrowLeftSvg />
        </button>
        <p className="text-alert">{title}</p>
        <Image
          className="relative h-16 w-24 rounded-bl"
          src={image}
          alt="sport image"
          width={80}
          height={80}
        />
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
          {plans.map((plan) => (
            <div key={plan._id} className="w-full">
              <button
                onClick={() => handleInfoClick(plan)}
                className="flex justify-between items-center w-full max-w-xl h-10 shadow hover:shadow-md rounded-md my-1 transform transition-all duration-300"
              >
                <div className="absolute -top-2 left-1 text-alert text-sm">
                  <span className="icon-text">{plan.duration}w</span>
                </div>
                <div className="ml-5">{plan.name}</div>
                {expandedPlanIndex === plan._id ? (
                  <ArrowUpSvg />
                ) : (
                  <ArrowDownSvg />
                )}
              </button>

              {expandedPlanIndex === plan._id && (
                <div className="mt-5 select-none flex flex-col items-center">
                  <hr className="opacity-10 mx-1" />
                  <div className="w-full my-7 p-1 flex flex-col text-center">
                    <span className="text-alert p-1">
                      Wochen: {plan.duration}
                    </span>
                    {plan.wishFrom && (
                      <span className="p-1 border-l border-r border-alert">
                        Wunsch von: {plan.wishFrom}
                      </span>
                    )}
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
          {showAlert && (
            <Alert alertText={message} setShowAlert={setShowAlert} />
          )}
        </div>
      )}
    </div>
  );
};

export default PlanComponent;

"use client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import Alert from "@/app/components/Alerts/Alert";
import Loader from "../../../components/Loader/Loader";
import useSWR from "swr";
import { getSession } from "next-auth/react";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
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

  const handleBackClick = () => {
    setShowPlans();
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <button
          className="top-5 left-5 btn btn-ghost btn-sm  m-3 border border-transparent text-first "
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
      <div className="h-16 absolute right-0 top-0 w-24  bg-gradient-to-l from-transparent via-transparent via-80% to-fifth z-10"></div>
      <div className="h-16 absolute right-0 top-0 w-24  bg-gradient-to-b from-transparent via-transparent via-80% to-fifth z-10"></div>

      {isLoading || isLoadingPlan ? (
        <Loader error={error} isLoading={isLoading || isLoadingPlan} />
      ) : null}

      {!isLoading && plans?.length === 0 && (
        <div className="border border-first/50 rounded-md p-2 text-center mt-20 mx-5">
          Es wurde noch kein Plan erstellt
        </div>
      )}

      {!isLoading && plans?.length !== 0 && (
        <div className="flex flex-col items-center mt-10 gap-2 w-full max-w-xl">
          {plans?.map((plan) => {
            return (
              <div
                key={plan._id}
                className="w-full max-w-xl shadow-md p-2 rounded-md my-1"
              >
                <button
                  onClick={() => handleInfoClick(plan)}
                  className="relative w-full flex flex-row justify-between text-left cursor-pointer"
                >
                  <div className="absolute -top-2 -left-1 text-alert text-sm">
                    <span className="icon-text"> {plan.duration}w</span>
                  </div>
                  <div className="ml-5">{plan.name}</div>
                  {expandedPlanIndex === plan._id ? (
                    <ArrowUpSvg />
                  ) : (
                    <ArrowDownSvg />
                  )}
                </button>
                {expandedPlanIndex === plan._id && (
                  <div className="mt-5 select-none flex flex-col itmes-center">
                    <hr className="opacity-10 mx-1" />
                    <div className="w-full my-7 p-1 flex flex-col text-center">
                      <span className=" p-1 border-l border-r border-alert">
                        Wochen: {plan.duration}
                      </span>
                      {plan.wishFrom !== "" && (
                        <span className=" p-1 border-l border-r border-alert">
                          Wunsch von: {plan.wishFrom}
                        </span>
                      )}
                    </div>
                    <div className="font-light text-left">{plan.info}</div>
                    <button
                      onClick={handleLoadPlanClick}
                      className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
                    >
                      Laden
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {showAlert && (
            <Alert alertText={message} setShowAlert={setShowAlert} />
          )}
        </div>
      )}
    </>
  );
};

export default PlanComponent;

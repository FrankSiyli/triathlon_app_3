"use client";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import React from "react";
import { useRecoilState } from "recoil";

const FetchedUserPlans = ({
  userPlans,
  expandedPlanIndex,
  setExpandedPlanIndex,
  setHomepagePlan,
  setShowAlert,
  userEmail,
  setUserPlans,
  setIsLoading,
}) => {
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] =
    useRecoilState(loggedInUserLastLoadedPlanState);

  const handleInfoClick = (index) => {
    setExpandedPlanIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const handleLoadPlanClick = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/user/setExpandedPlanToFirstPosition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          expandedTrainingPlan: userPlans[expandedPlanIndex],
        }),
      });
      setHomepagePlan(userPlans[expandedPlanIndex]);
      setLoggedInUserLastLoadedPlan(userPlans[expandedPlanIndex]);
      setShowAlert(true);
    } catch (error) {
      console.error("Failed to load plan:", error);
    }
    setIsLoading(false);
  };

  const handleRemovePlanClick = async (planId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/user/deleteUserPlan?planId=${planId}&email=${userEmail}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setUserPlans((prevUserPlans) =>
          prevUserPlans.filter((plan) => plan._id !== planId)
        );
      } else {
        console.error("Failed to delete plan");
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
    {userPlans?.map((plan, index) => (
      
        <div key={plan._id} className="shadow p-2 rounded-md mt-10">
          <div
            onClick={() => handleInfoClick(index)}
            className="flex justify-between cursor-pointer"
          >
            <div className="ml-5">{plan.name}</div>
            {expandedPlanIndex === index ? <ArrowUpSvg /> : <ArrowDownSvg />}
          </div>
          {expandedPlanIndex === index && (
            <div className="mt-5 select-none">
              <hr className="opacity-10 mx-1" />
              <div className="m-3 mx-auto p-1 w-24 text-sm text-center">
                Wochen: {plan.duration}
              </div>
              <div className="font-light text-left">{plan.info}</div>
              <div className="flex justify-between m-5">
                <button
                  onClick={() => handleRemovePlanClick(plan._id)}
                  className="btn btn-sm m-5 btn-outline border border-red  hover:text-alert"
                >
                  Löschen
                </button>
                <button
                  onClick={handleLoadPlanClick}
                  className="btn btn-sm m-5 btn-outline border border-alert  hover:text-alert"
                >
                  Laden
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default FetchedUserPlans;

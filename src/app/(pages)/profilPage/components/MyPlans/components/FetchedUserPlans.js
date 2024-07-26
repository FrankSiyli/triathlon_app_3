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
    if (index === expandedPlanIndex) {
      setExpandedPlanIndex(null);
    } else {
      setExpandedPlanIndex(index);
    }
  };
  const expandedPlan = userPlans[expandedPlanIndex];

  const handleLoadPlanClick = async () => {
    setIsLoading(true);
    try {
      const updateUser = await fetch(
        "/api/user/setExpandedPlanToFirstPosition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            expandedTrainingPlan: expandedPlan,
          }),
        }
      );
    } catch (error) {
      console.error("user update error");
    }
    setHomepagePlan(expandedPlan);
    setShowAlert(true);
    setLoggedInUserLastLoadedPlan(expandedPlan);
    setIsLoading(false);
  };

  const handleRemovePlanClick = async (planId, userEmail) => {
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
      console.error("An error occurred:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className=" flex flex-col items-center  mt-10 gap-1 w-full max-w-xl mx-5 ">
        {userPlans?.map((myPlan, myPlanIndex) => {
          return (
            <div
              key={myPlanIndex}
              className="w-full max-w-xl shadow-md p-2 rounded-md mx-5 my-1"
            >
              <div
                onClick={() => handleInfoClick(myPlanIndex)}
                className=" flex flex-row justify-between cursor-pointer"
              >
                <div className="ml-5">{myPlan.name}</div>
                {expandedPlanIndex === myPlanIndex ? (
                  <ArrowUpSvg />
                ) : (
                  <ArrowDownSvg />
                )}
              </div>
              {expandedPlanIndex === myPlanIndex && (
                <div className="mt-5 select-none ">
                  <hr className="opacity-10 mx-1" />
                  <div className="m-3 mx-auto p-1 w-24 text-sm text-center">
                    Wochen: {myPlan.duration}
                  </div>
                  <div className="font-light text-left">{myPlan.info}</div>
                  <div className="flex justify-between m-5">
                    <button
                      onClick={() =>
                        handleRemovePlanClick(myPlan._id, userEmail)
                      }
                      className="btn btn-sm m-5  btn-outline border border-red text-first hover:text-alert"
                    >
                      Löschen
                    </button>
                    <button
                      onClick={() => handleLoadPlanClick(expandedPlanIndex)}
                      className="btn btn-sm m-5  btn-outline border border-alert text-first hover:text-alert"
                    >
                      Laden
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FetchedUserPlans;

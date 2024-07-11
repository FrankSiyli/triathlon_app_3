"use client";
import Alert from "@/app/components/Alerts/Alert";
import Loader from "@/app/components/Loader/Loader";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { userEmailState } from "@/app/recoil/atoms/user/userEmailState";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import FetchedUserPlans from "./components/FetchedUserPlans";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";

function MyPlans({ setShowProfil }) {
  const [expandedPlanIndex, setExpandedPlanIndex] = useState(null);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [userPlans, setUserPlans] = useState([]);
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] =
    useRecoilState(loggedInUserLastLoadedPlanState);

  useEffect(() => {
    const fetchUserPlans = async () => {
      setIsLoading(true);
      const session = await getSession();
      const fetchedUserEmail = session?.user.email;
      setUserEmail(fetchedUserEmail);
      try {
        const response = await fetch(
          `/api/user/fetchUserPlans?email=${fetchedUserEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          const plansData = await response.json();
          setUserPlans(plansData);
        } else {
          console.error("Failed to fetch user plans");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      setIsLoading(false);
    };

    fetchUserPlans();
  }, [homepagePlan, setUserEmail, loggedInUserLastLoadedPlan]);

  const handleBackClick = () => {
    setShowProfil();
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
      <p className=" mx-auto w-40 text-center -mt-10">Meine Pläne</p>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : userPlans.length === 0 ? (
        <div className="border border-first/50 rounded-md p-2 text-center mt-20 mx-5">
          Es wurde noch kein Plan geladen
        </div>
      ) : (
        <FetchedUserPlans
          expandedPlanIndex={expandedPlanIndex}
          setExpandedPlanIndex={setExpandedPlanIndex}
          userPlans={userPlans}
          setHomepagePlan={setHomepagePlan}
          setShowAlert={setShowAlert}
          userEmail={userEmail}
          setUserPlans={setUserPlans}
          setIsLoading={setIsLoading}
        />
      )}

      {showAlert && (
        <Alert alertText="Im Kalender geladen" setShowAlert={setShowAlert} />
      )}
    </>
  );
}

export default MyPlans;

"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getSession } from "next-auth/react";
import Alert from "@/app/components/Alerts/Alert";
import Loader from "@/app/components/Loader/Loader";
import FetchedUserPlans from "./components/FetchedUserPlans";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { userEmailState } from "@/app/recoil/atoms/user/userEmailState";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";

function MyPlans({ setShowProfil }) {
  const [expandedPlanIndex, setExpandedPlanIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userPlans, setUserPlans] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [loggedInUserLastLoadedPlan] = useRecoilState(loggedInUserLastLoadedPlanState);

  useEffect(() => {
    const fetchUserPlans = async () => {
      setIsLoading(true);
      try {
        const session = await getSession();
        const email = session?.user.email;
        setUserEmail(email);

        const response = await fetch(`/api/user/fetchUserPlans?email=${email}`);
        if (response.ok) {
          const plansData = await response.json();
          setUserPlans(plansData);
        } else {
          console.error("Failed to fetch user plans");
        }
      } catch (error) {
        console.error("Error fetching user plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlans();
  }, [homepagePlan, loggedInUserLastLoadedPlan]);

  const handleBackClick = () => {
    setShowProfil();
  };

    return (
      <div className="w-screen max-w-xl flex flex-col justify-center mx-auto">
        <div className="">
          <button
            className="top-5 left-5 btn btn-ghost btn-sm  m-3 border border-transparent "
            onClick={handleBackClick}
          >
            <ArrowLeftSvg />
      </button>
      <p className="mx-auto w-40 text-center -mt-10 text-alert">Meine Pläne</p>

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
          setShowAlert={setShowAlert}
          userEmail={userEmail}
          setUserPlans={setUserPlans}
          setIsLoading={setIsLoading}
        />
      )}

      {showAlert && <Alert alertText="Im Kalender geladen" setShowAlert={setShowAlert} />}
    </div>
    </div>
  );
}

export default MyPlans;

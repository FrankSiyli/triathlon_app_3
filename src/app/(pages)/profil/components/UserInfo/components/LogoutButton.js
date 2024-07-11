"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userNameState } from "@/app/recoil/atoms/user/userNameState";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import { lastLoadedPlanState } from "@/app/recoil/atoms/user/lastLoadedPlanState";
import Alert from "@/app/components/Alerts/Alert";

const LogoutButton = ({ setShowProfil }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const [lastLoadedPlan, setLastLoadedPlan] =
    useRecoilState(lastLoadedPlanState);

  const handleLogoutClick = () => {
    setIsLoading(true);

    try {
      const response = signOut();
      setUserName("");
      setHomepagePlan("");
      setLastLoadedPlan("");
      if (response.ok) {
        setIsLoading(false);
        setShowProfil();
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        setShowAlert(true);
        setError("Etwas ist schief gelaufen");
      }, 1000);
      return;
    }
  };
  return (
    <>
      {isLoading ? (
        <span className="loading loading-ring loading-lg m-10"></span>
      ) : (
        <button
          onClick={handleLogoutClick}
          className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
        >
          Abmelden
        </button>
      )}
      {error && showAlert && (
        <Alert alertText={error} setShowAlert={setShowAlert} />
      )}
    </>
  );
};

export default LogoutButton;

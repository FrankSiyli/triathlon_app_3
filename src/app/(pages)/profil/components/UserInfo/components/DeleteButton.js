"use client";
import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Alert from "@/app/components/Alerts/Alert";
import { useRecoilState } from "recoil";
import { userNameState } from "@/app/recoil/atoms/user/userNameState";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";

const DeleteButton = ({ setShowProfil }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [lastLoadedPlan, setLastLoadedPlan] = useRecoilState(
    loggedInUserLastLoadedPlanState
  );
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);

  const handleDeleteUserClick = async () => {
    setIsLoading(true);
    const session = await getSession();
    try {
      if (!session) {
        setIsLoading(false);
        setShowAlert(true);
        setError("Etwas ist schief gelaufen");
      }

      setUserName("");
      setLastLoadedPlan("");
      setHomepagePlan("");
      const response = await fetch("/api/user/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (response.ok) {
        signOut();
        setIsLoading(false);
        setShowAlert(true);
        setError("Löschen erfolgreich");
        setTimeout(() => {
          setShowProfil();
        }, 2500);
      } else {
        setIsLoading(false);
        setShowAlert(true);
        setError("Etwas ist schief gelaufen");
      }
    } catch (error) {
      console.error("login error");
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <span className="loading loading-ring loading-lg m-10"></span>
      ) : (
        <button
          onClick={handleDeleteUserClick}
          className="underline underline-offset-2 decoration-red m-5 mx-auto hover:text-alert  text-first "
        >
          Konto löschen
        </button>
      )}
      {error && showAlert && (
        <Alert alertText={error} setShowAlert={setShowAlert} />
      )}
    </>
  );
};

export default DeleteButton;

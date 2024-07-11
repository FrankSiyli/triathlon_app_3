"use client";
import React, { useState } from "react";
import Alert from "@/app/components/Alerts/Alert";
import Image from "next/image";
import { getSession } from "next-auth/react";
import ChooseSportCheckBoxes from "./newPlanChooseSportCheckBoxes/NewPlanChooseSportCheckBoxes";
import { useRecoilState } from "recoil";
import { newPlanNameState } from "@/app/recoil/atoms/planBuilder/newPlanNameState";
import { newPlanDescriptionState } from "@/app/recoil/atoms/planBuilder/newPlanDescriptionState";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import { newPlanSportTypeState } from "@/app/recoil/atoms/planBuilder/newPlanSportTypeState";
import Loader from "@/app/components/Loader/Loader";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";

const PlanBuilder = ({ setShowPlans, title, image, setActiveComponent }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newPlanName, setNewPlanName] = useRecoilState(newPlanNameState);
  const [newPlanDescription, setNewPlanDescription] = useRecoilState(
    newPlanDescriptionState
  );
  const [newPlanSportType, setNewPlanSportType] = useRecoilState(
    newPlanSportTypeState
  );

  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPlanName) {
      setShowAlert(true);
      setError("Bitte gib deinem Plan einen Namen");
    } else {
      const session = await getSession();
      if (!session) {
        setIsLoading(true);
        setShowAlert(true);
        setError("Zum speichern bitte einloggen");
        setTimeout(() => {
          setIsLoading(false);
          setActiveComponent("newPlan");
        }, 4000);

        return;
      }

      if (session) {
        setIsLoading(true);
        const planData = {
          name: newPlanName,
          category: newPlanSportType,
          info: newPlanDescription,
        };

        try {
          const updateUser = await fetch("/api/user/updateUserTrainingPlans", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: session.user.email,
              trainingPlans: planData,
            }),
          });

          if (updateUser.ok) {
            const responseJson = await updateUser.json();
          } else {
            setShowAlert(true);
            setError("Ups, da ist etwas schief gelaufen");
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
        setShowAlert(true);
        setError("Unter Meine Pläne gespeichert");
        setHomepagePlan(planData);
        setTimeout(() => {
          setIsLoading(false);
          setActiveComponent("newPlan");
        }, 4000);
      }
    }
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
      {showAlert && <Alert alertText={error} setShowAlert={setShowAlert} />}

      <div className=" flex flex-col items-center mt-10 w-full max-w-xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            className="input border border-transparent my-10 placeholder-first/80"
            type="string"
            placeholder="Planname"
            onChange={(e) => setNewPlanName(e.target.value)}
          />
          <ChooseSportCheckBoxes />
          <textarea
            className="rounded-md w-11/12 mt-10 bg-sixth border border-alert p-2 placeholder-first/80"
            type="text"
            placeholder="Hier kannst du bald deine eigenen Trainingspläne erstellen."
            value={newPlanDescription}
            onChange={(e) => setNewPlanDescription(e.target.value)}
          />

          {isLoading ? (
            <Loader error={error} isLoading={isLoading} />
          ) : (
            <button
              type="submit"
              className="btn btn-sm my-5 mx-auto btn-outline border border-alert hover:text-alert text-first"
            >
              weiter
            </button>
          )}
          {/* to NewPlanCalendar */}
        </form>
      </div>
    </>
  );
};

export default PlanBuilder;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/images/logoSmallBlack.png";
import "./globals.css";
import { useRecoilState } from "recoil";
import { homepagePlanState } from "./recoil/atoms/plans/homepagePlanState";
import { savedSwimTimeState } from "./recoil/atoms/user/savedSwimTimeState";
import { savedHrMaxState } from "./recoil/atoms/user/savedHrMaxState";
import { userEmailState } from "./recoil/atoms/user/userEmailState";
import { userNameState } from "./recoil/atoms/user/userNameState";
import { loggedInUserLastLoadedPlanState } from "./recoil/atoms/user/loggedInUserLastLoadedPlanState";
import { getSession } from "next-auth/react";
import { examplePlan } from "../../database/mockDb";
import { hasCookie, setCookie } from "cookies-next";
import PrivacyPolicy from "./(pages)/profilPage/components/legal/PrivacyPolicy";
import Calendar from "./(pages)/calendarPage/CalendarPage";

const fetchUserData = async (url, setStateFunction) => {
  try {
    const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (response.ok) {
      const data = await response.json();
      setStateFunction(data);
    } else {
      console.error(`Failed to fetch data from ${url}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default function Home() {
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [savedSwimTime, setSavedSwimTime] = useRecoilState(savedSwimTimeState);
  const [savedHrMax, setSavedHrMax] = useRecoilState(savedHrMaxState);
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] = useRecoilState(loggedInUserLastLoadedPlanState);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        const email = session.user.email;
        setUserEmail(email);
        setUserName(session.user.name);

        if (loggedInUserLastLoadedPlan.length !== 0) {
          await fetchUserData(`/api/user/fetchFirstUserPlan?email=${email}`, setHomepagePlan);
        } else {
          setHomepagePlan(examplePlan);
        }

        await fetchUserData(`/api/user/fetchUserHeartRate?email=${email}`, setSavedHrMax);
        await fetchUserData(`/api/user/fetchUserSwimTime?email=${email}`, setSavedSwimTime);
      } else {
        setHomepagePlan(examplePlan);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [loggedInUserLastLoadedPlan, setHomepagePlan, setSavedHrMax, setSavedSwimTime, setUserEmail, setUserName]);

  useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true");
  };

  return (
    <div>
      {isLoading && (
        <div className={`flex flex-col justify-center items-center w-screen h-screen ${!showConsent ? "bg-second opacity-10" : ""}`}>
          <Image src={logo} alt="logo" className="h-auto w-40 xl-w-60 md-w-60 object-contain m-10" priority width={200} height={200} />
          <span className="loading loading-ring loading-sm"></span>
        </div>
      )}

      {!showPrivacyPolicy && isClient && <Calendar showConsent={showConsent} />}
      {showPrivacyPolicy && isClient && (
        <div className="mx-5 overflow-y-auto max-h-screen">
          <div className="fixed top-0 left-0 flex justify-start items-center z-50 h-16 w-full backdrop-blur-lg shadow shadow-alert">
            <button onClick={() => setShowPrivacyPolicy(false)} className="border border-alert rounded p-1 hover:text-alert ml-5 shadow">
              Startseite
            </button>
          </div>
          <PrivacyPolicy />
        </div>
      )}
      {!showPrivacyPolicy && !showConsent && (
        <div className="fixed mx-auto z-50 bottom-0 left-0 right-0 flex flex-col gap-3 items-center text-center backdrop-blur-lg px-2 py-2 border border-alert rounded-md max-w-2xl shadow-xl">
          <p className="mt-5">Einfach trainieren mit der Siyli-App</p>
          <p>Finde deinen Trainingsplan und erreiche deine Ziele 🚀</p>
          <Image priority src={logo} alt="logo" className="mx-auto w-32 m-5" width={100} height={100} />
          <p className="text-center text-sm">Diese App verwendet Cookies.</p>
          <span onClick={() => setShowPrivacyPolicy(true)} className="underline cursor-pointer text-sm ml-1">Zur Datenschutzrichtlinie</span>
          <button className="btn btn-sm btn-outline border border-alert hover:text-alert text-fifth m-3 py-2 px-6 shadow-xl" onClick={acceptCookie}>
            ok
          </button>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userEmailState } from "@/app/recoil/atoms/user/userEmailState";
import { userNameState } from "@/app/recoil/atoms/user/userNameState";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import Alert from "@/app/components/Alerts/Alert";
import Loader from "@/app/components/Loader/Loader";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";

const Login = ({ setShowProfil, setShowRegisterForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [, setLoggedInUserLastLoadedPlan] = useRecoilState(loggedInUserLastLoadedPlanState);
  const [, setHomepagePlan] = useRecoilState(homepagePlanState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Bitte fülle alle Felder aus");
      setShowAlert(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });

      if (res.ok) {
        const session = await getSession();
        if (session) {
          setUserName(session.user.name);
          setUserEmail(session.user.email);

          const response = await fetch(`/api/user/fetchFirstUserPlan?email=${session.user.email}`);
          if (response.ok) {
            const firstPlanData = await response.json();
            setHomepagePlan(firstPlanData);
          }
        }
        setShowProfil();
      } else {
        setError("Die Eingaben sind nicht korrekt");
        setShowAlert(true);
      }
    } catch (error) {
      setError("Die Eingaben sind nicht korrekt");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full flex max-w-xl mx-auto">
        <button className="absolute top-5 left-5 btn btn-ghost btn-sm" onClick={setShowProfil}>
          <ArrowLeftSvg />
        </button>
      <p className="flex justify-center mx-auto bg-fourth/10 text-fifth/80 my-5 px-3 py-1 rounded-sm">Login</p>
      </div>

      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="flex flex-col items-center mt-10 gap-1 max-w-xl mx-5">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-sm m-5 mx-auto btn-outline border border-alert shadow hover:shadow-md text-alert hover:text-alert/70">
              Anmelden
            </button>
            <button
              type="button"
              onClick={setShowRegisterForm}
              className="underline underline-offset-2 text-blue hover:text-blue/30"
            >
              Konto erstellen
            </button>
          </form>
          {showAlert && <Alert alertText={error} setShowAlert={setShowAlert} />}
        </div>
      )}
    </>
  );
};

export default Login;

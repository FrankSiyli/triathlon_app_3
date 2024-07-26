"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import Alert from "@/app/components/Alerts/Alert";
import Loader from "@/app/components/Loader/Loader";
import { userEmailState } from "@/app/recoil/atoms/user/userEmailState";
import { userNameState } from "@/app/recoil/atoms/user/userNameState";
import { useRecoilState } from "recoil";
import { loggedInUserLastLoadedPlanState } from "@/app/recoil/atoms/user/loggedInUserLastLoadedPlanState";
import { homepagePlanState } from "@/app/recoil/atoms/plans/homepagePlanState";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";

function Login({ setShowProfil, setShowRegisterForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [loggedInUserLastLoadedPlan, setLoggedInUserLastLoadedPlan] =
    useRecoilState(loggedInUserLastLoadedPlanState);
  const [homepagePlan, setHomepagePlan] = useRecoilState(homepagePlanState);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      setIsLoading(false);
      setShowAlert(true);
      setError("Bitte fülle alle Felder aus");
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.ok) {
        const session = await getSession();
        setUserName(session.user.name);
        setUserEmail(session.user.email);
        const fetchedUserEmail = session?.user.email;
        if (session) {
          try {
            const response = await fetch(
              `/api/user/fetchFirstUserPlan?email=${fetchedUserEmail}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response) {
              const firstPlanData = await response.json();
              setHomepagePlan(firstPlanData);
            } else {
              console.error("Failed to fetch user plans");
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
        setIsLoading(false);
        setShowProfil();
        return;
      } else {
        setIsLoading(false);
        setTimeout(() => {
          setShowAlert(true);
          setError("Die Eingaben sind nicht korrekt");
        }, 1000);

        return;
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        setShowAlert(true);
        setError("Die Eingaben sind nicht korrekt");
      }, 1000);
      return;
    }
  };

  const handleBackClick = () => {
    setShowProfil();
  };
  const handleRegisterClick = () => {
    setShowRegisterForm();
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
      <p className=" mx-auto w-40 text-center -mt-10">Login</p>

      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className=" flex flex-col items-center  mt-10 gap-1  max-w-xl mx-5 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3"
          >
            <input
              className="input  border border-transparent "
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input  border border-transparent "
              type="password"
              placeholder="Passwort"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert">
              Anmelden
            </button>
            <button
              onClick={handleRegisterClick}
              className="underline underline-offset-2 hover:text-alert"
            >
              Konto erstellen
            </button>
          </form>
          {error && showAlert && (
            <Alert alertText={error} setShowAlert={setShowAlert} />
          )}
        </div>
      )}
    </>
  );
}

export default Login;

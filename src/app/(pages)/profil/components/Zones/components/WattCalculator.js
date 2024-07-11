"use client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { savedWattState } from "@/app/recoil/atoms/user/savedWattState";
import { wattInputFiredState } from "@/app/recoil/atoms/wattInputFiredState";
import Alert from "@/app/components/Alerts/Alert";
import { getSession } from "next-auth/react";
import Loader from "@/app/components/Loader/Loader";

function WattCalculator() {
  const [session, setSession] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [wattCalculatorInput, setWattCalculatorInput] = useState("");
  const [savedWatt, setSavedWatt] = useRecoilState(savedWattState);
  const [isLoading, setIsLoading] = useState(false);
  const [wattInputFired, setWattInputFired] =
    useRecoilState(wattInputFiredState);

  const handleWattInputClick = async () => {
    setIsLoading(true);
    if (
      wattCalculatorInput === "" ||
      wattCalculatorInput < 50 ||
      wattCalculatorInput > 300
    ) {
      setIsLoading(false);
      setShowAlert(true);
    } else {
      setWattInputFired(true);
      setSavedWatt(wattCalculatorInput);
      setWattCalculatorInput("");
    }
    const session = await getSession();

    if (session) {
      setSession(session);
      try {
        const userEmail = session.user.email;
        const updateUser = await fetch("/api/user/updateUserWatt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            newWattValue: wattCalculatorInput,
          }),
        });
      } catch (error) {
        setIsLoading(false);
        console.error("user update error hrmax");
      }
    }
    setIsLoading(false);
  };

  const handleChangeWattClick = () => {
    setWattInputFired(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleWattInputClick();
    }
  };

  return (
    <>
      <div className="flex  max-w-xl  flex-col items-center  ">
        {showAlert && (
          <Alert
            alertText="Bitte trage deine FTP ein (50-300)"
            setShowAlert={setShowAlert}
          />
        )}
      </div>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="mt-10 rounded-md p-3  w-full max-w-xl flex flex-col justify-center items-center linear-background">
          {!wattInputFired && (
            <>
              <p>Zur Berechnung deiner Wattwerte</p>
              <label className="label">
                <p className=" text-first  text-center">
                  gib deine FTP in Watt an
                </p>
              </label>
              <input
                type="number"
                placeholder="z.B. 165"
                value={wattCalculatorInput}
                onChange={(e) => setWattCalculatorInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input  border border-transparent w-full max-w-xs"
              />
              <button
                onClick={handleWattInputClick}
                className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
              >
                speichern
              </button>
            </>
          )}
          {wattInputFired && (
            <>
              Deine gespeicherte FTP:{" "}
              <div className=" text-center  p-2">
                <p className="text-xl">{savedWatt} Watt</p>
              </div>
              <button
                onClick={handleChangeWattClick}
                className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
              >
                ändern
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default WattCalculator;

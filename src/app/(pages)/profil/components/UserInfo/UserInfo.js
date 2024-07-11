"use client";
import React, { useEffect, useState } from "react";
import LogoutButton from "./components/LogoutButton";
import DeleteButton from "./components/DeleteButton";
import UserValues from "./components/UserValues";
import { useRecoilState } from "recoil";
import { userNameState } from "@/app/recoil/atoms/user/userNameState";
import { userEmailState } from "@/app/recoil/atoms/user/userEmailState";
import { savedHrMaxState } from "@/app/recoil/atoms/user/savedHrMaxState";
import { savedSwimTimeState } from "@/app/recoil/atoms/user/savedSwimTimeState";
import { getSession } from "next-auth/react";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";

const UserInfo = ({ setShowProfil }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [savedHrMax, setSavedHrMax] = useRecoilState(savedHrMaxState);
  const [savedSwimTime, setSavedSwimTime] = useRecoilState(savedSwimTimeState);
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);

  const handleBackClick = () => {
    setShowProfil();
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        const fetchedUserEmail = session?.user.email;
        setUserEmail(fetchedUserEmail);
        try {
          const heartRateResponse = await fetch(
            `/api/user/fetchUserHeartRate?email=${fetchedUserEmail}`,
            {
              method: "GET",
            }
          );
          if (heartRateResponse.ok) {
            const fetchedHrMax = await heartRateResponse.json();
            setSavedHrMax(fetchedHrMax);
          } else {
            console.error("Failed to fetch user hrmax");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
        try {
          const swimTimeResponse = await fetch(
            `/api/user/fetchUserSwimTime?email=${fetchedUserEmail}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (swimTimeResponse.ok) {
            const fetchedSwimTime = await swimTimeResponse.json();
            setSavedSwimTime(fetchedSwimTime);
          } else {
            console.error("Failed to fetch user swim time");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setSavedSwimTime, setSavedHrMax, setUserEmail]);

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
      <p className=" mx-auto w-40 text-center -mt-10">Konto</p>
      <div className="w-full mt-10">
        <div className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 ">
          <span className="ml-2">Name:</span>{" "}
          <span className="mr-2">{userName}</span>
        </div>
        <div className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 ">
          <span className="ml-2">Email:</span>{" "}
          <span className="mr-2">{userEmail}</span>
        </div>
        <UserValues isLoading={isLoading} />
      </div>
      <LogoutButton setShowProfil={setShowProfil} />
      <DeleteButton setShowProfil={setShowProfil} />
    </>
  );
};

export default UserInfo;

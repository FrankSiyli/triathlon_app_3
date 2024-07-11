"use client";
import { formatTime } from "@/app/helperFunctions/formatTime";
import React from "react";
import { useRecoilState } from "recoil";
import { savedHrMaxState } from "@/app/recoil/atoms/user/savedHrMaxState";
import { savedSwimTimeState } from "@/app/recoil/atoms/user/savedSwimTimeState";
import { savedWattState } from "@/app/recoil/atoms/user/savedWattState";

const UserValues = ({ isLoading }) => {
  const [savedSwimTime, setSavedSwimTime] = useRecoilState(savedSwimTimeState);
  const [savedHrMax, setSavedHrMax] = useRecoilState(savedHrMaxState);
  const [savedWatt, setSavedWatt] = useRecoilState(savedWattState);

  return (
    <>
      <div className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 mt-5">
        <span className="ml-2">Maximalpuls:</span>
        {isLoading ? (
          <span className="loading loading-ring loading-sm"></span>
        ) : (
          <span className="mr-2"> {savedHrMax} bpm</span>
        )}
      </div>
      <div className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 ">
        <span className="ml-2">FTP:</span>
        {isLoading ? (
          <span className="loading loading-ring loading-sm"></span>
        ) : (
          <span className="mr-2"> {savedWatt} W</span>
        )}
      </div>
      <div className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 ">
        <span className="ml-2">1000m Schwimmzeit:</span>
        {isLoading ? (
          <span className="loading loading-ring loading-sm"></span>
        ) : (
          <span className="mr-2"> {formatTime(savedSwimTime)} min</span>
        )}
      </div>
    </>
  );
};

export default UserValues;

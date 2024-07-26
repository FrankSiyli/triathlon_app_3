

import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import ArrowUpSvg from "@/app/components/SVGs/arrows/ArrowUpSvg";
import ArrowDownSvg from "@/app/components/SVGs/arrows/ArrowDownSvg";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import getActivityBorderColor from "@/app/helperFunctions/getActivityBorderColor";

const AddSessionMenu = ({ setShowAddSessionMenu }) => {
  

  return (
    {/*
    <div className="fixed top-0 left-0 z-40 h-screen w-screen overflow-y-scroll sm:w-1/3 bg-lightBlue shadow-xl flex flex-col justify-center">
      <button
        onClick={() => setShowAddSessionMenu(false)}
        className="absolute top-2 right-2 border border-alert shadow rounded-md mb-20"
      >
        <UncheckSvg />
      </button>
      {sessionData.map((sessionCategory, index) => (
        <div
          key={index}
          onClick={() =>
            handleSessionCategoryClick(
              index,
              sessionCategory.type,
              sessionCategory.api
            )
          }
          className={`flex flex-col shadow-md p-1 m-1 border-alert/30 rounded bg-first border-t-2 ${getActivityBorderColor(
            sessionCategory.label
          )}`}
        >
          <div className="flex min-h-8 w-full items-center justify-between cursor-pointer text-s">
            <span className="ml-2">{sessionCategory.component}</span>
            <p className="ml-4 text-sm">{sessionCategory.label}</p>
            {sessionCategoryClicked[index] ? <ArrowUpSvg /> : <ArrowDownSvg />}
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              sessionCategoryClicked[index] ? "max-h-96" : "max-h-0"
            }`}
          >
            <hr className="opacity-10 mx-1" />

            {sessionCategoryClicked[index] && (
              <SessionSources onSourceClick={handleSessionSourceClick} />
            )}

            {showSessionUnderCategories && (
              <SessionUnderCategories singleSessions={singleSessions} isLoading={isLoading} />
            )}

            {showSingleSessions && !isLoading && (
              <SingleSessions
                singleSessions={singleSessions}
                clickedSingleSession={clickedSingleSession}
                sessionCategory={sessionCategory}
              />
            )}

            {clickedSingleSession !== -1 && showSingleSessions && (
              <>
                <SingleSessionParts
                  singleSession={singleSessions[clickedSingleSession]}
                />
                <button
                  onClick={() =>
                    handleAddSessionClick(singleSessions[clickedSingleSession])
                  }
                  className="btn btn-sm m-5 mx-auto btn-outline border border-alert text-first hover:text-alert"
                >
                  Hinzufügen
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div> 
    */}
  );
};

export default AddSessionMenu;

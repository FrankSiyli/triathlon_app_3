import React from "react";

const Activity = ({ openDay, dayIndex, activity, toggleOverlay }) => {
  return (
    <>
      <div className="flex flex-col w-full max-w-xl rounded-md">
        {
          activity.map((singleActivity, activityIndex) => (
            <button
              key={activityIndex}
              onClick={() => {
                toggleOverlay(dayIndex, activityIndex);
              }}
              className=""
            >
              <div
                className={`hover:bg-third/10 relative flex justify-between shadow-sm items-center rounded-sm ${
                  singleActivity[3] === true
                    ? " border-l-2 border-r-2 border-green"
                    : null
                }`}
              >
                <div className="w-full my-2 text-center sm:text-left ml-1">
                  <p className="underline underline-offset-2">
                    {singleActivity[0]}
                  </p>
                  <p className="text-xs">{singleActivity[1]}</p>
                </div>
              </div>
            </button>
          ))}
      </div>
    </>
  );
};

export default Activity;

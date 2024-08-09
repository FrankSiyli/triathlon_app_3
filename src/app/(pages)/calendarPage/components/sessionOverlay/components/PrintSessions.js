import React, { forwardRef, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logoBlack from "../../../../../../../public/images/logoSmallBlack.png";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { savedSwimTimeState } from "@/app/recoil/atoms/user/savedSwimTimeState";
import { savedHrMaxState } from "@/app/recoil/atoms/user/savedHrMaxState";
import getZones from "@/app/helperFunctions/getZones";
import { formatTime } from "@/app/helperFunctions/formatTime";
import { savedWattState } from "@/app/recoil/atoms/user/savedWattState";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";

const PrintSessions = forwardRef(
  (
    {
      activity,
      totalDistance,
      totalDuration,
      wattIsActive,
      handleViewClick,
      toggleOverlay,
    },
    ref
  ) => {
    const savedSwimTime = useRecoilValue(savedSwimTimeState);
    const savedHrMax = useRecoilValue(savedHrMaxState);
    const savedWattValue = useRecoilValue(savedWattState);

    const [openWarmUpImage, setOpenWarmUpImage] = useState(null);
    const [openMainImage, setOpenMainImage] = useState(null);
    const [openCoolDownImage, setOpenCoolDownImage] = useState(null);

    const printComponentRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printComponentRef.current,
    });

    const renderSection = (
      sectionData,
      sectionType,
      openImageState,
      setOpenImageState
    ) => {
      if (
        sectionType !== "Hauptteil" &&
        sectionData[0]?.exercises[0]?.name === ""
      ) {
        return null;
      }

      return (
        <div>
          <p>{sectionType}</p>
          {sectionData.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="border">
              {section.multiplier > 1 && (
                <p className="flex justify-start mx-3">
                  {section.multiplier} x
                </p>
              )}

              {section.exercises.map((exercise, exerciseIndex) => (
                <div
                  key={`exercise-${sectionIndex}-${exerciseIndex}`}
                  className="flex flex-row justify-between mx-3"
                >
                  <div className="flex flex-row justify-between gap-3">
                    {exercise.distance > 0 ? (
                      <p>{exercise.distance}m</p>
                    ) : exercise.duration > 0 ? (
                      <p>{formatTime(exercise.duration)}</p>
                    ) : null}
                    <p>
                      {getZones(
                        exercise,
                        savedSwimTime,
                        savedHrMax,
                        savedWattValue,
                        wattIsActive
                      )}
                    </p>
                  </div>
                  <div
                    className={`${
                      exercise.duration === 0 && exercise.distance === 0
                        ? "w-full "
                        : "w-1/2 text-right"
                    }`}
                  >
                    {exercise.imageLink ? (
                      <button
                        className="text-sm rounded-md underline cursor-pointer"
                        onClick={() => {
                          setOpenImageState(
                            exerciseIndex === openImageState
                              ? null
                              : exerciseIndex
                          );
                        }}
                      >
                        {exercise.name}
                      </button>
                    ) : (
                      <p
                        className={`${
                          exercise.duration === 0 && exercise.distance === 0
                            ? ""
                            : "text-right"
                        }`}
                      >
                        {exercise.name}
                      </p>
                    )}
                    {exerciseIndex === openImageState && (
                      <div className="flex flex-col items-center bg-second m-3 rounded-md">
                        <Image
                          width={200}
                          height={200}
                          src={`/images/yoga_images/${exercise.imageLink}.png`}
                          alt="yoga pose"
                          className="my-5"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div ref={ref}>
        {Array.isArray(activity.sessionParts) &&
          activity.sessionParts.map((sessionSections, sessionIndex) => (
            <div
              key={`sessionPart-${sessionIndex}`}
              className="print-page p-1 m-3 mx-auto min-h-screen"
            >
              <div className="flex justify-between">
                <Image
                  src={logoBlack}
                  alt="logo"
                  className="w-20 object-contain"
                  width={200}
                  height={200}
                />
                <div className="text-right mr-3">
                  <p className="underline underline-offset-2">
                    {activity.activity}
                  </p>
                  <p className="my-1">{activity.description}</p>
                  {totalDistance > 0 && <p>Distanz: {totalDistance}m</p>}
                  {totalDistance > 0 && totalDuration > 0 && <p>+</p>}
                  {totalDuration > 0 && (
                    <p>Zeit: {formatTime(totalDuration)}</p>
                  )}
                </div>
              </div>

              {renderSection(
                sessionSections.warmUp,
                "Warm Up",
                openWarmUpImage,
                setOpenWarmUpImage
              )}

              {renderSection(
                sessionSections.main,
                "Hauptteil",
                openMainImage,
                setOpenMainImage
              )}

              {renderSection(
                sessionSections.coolDown,
                "Cool Down",
                openCoolDownImage,
                setOpenCoolDownImage
              )}
            </div>
          ))}
        
      </div>
    );
  }
);

PrintSessions.displayName = "PrintSessions";

export default PrintSessions;

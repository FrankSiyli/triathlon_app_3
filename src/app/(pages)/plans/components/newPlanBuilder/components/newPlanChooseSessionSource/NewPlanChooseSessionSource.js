import React from "react";
import CalculatorSvg from "@/app/components/SVGs/CalculatorSvg";
import FolderSvg from "@/app/components/SVGs/FolderSvg";
import LibrarySvg from "@/app/components/SVGs/LibrarySvg";
import ArrowRightSvg from "@/app/components/SVGs/arrows/ArrowRightSvg";

const NewPlanChooseSessionSource = ({
  setShowAlert,
  setError,
  setActiveComponent,
}) => {
  const handleNewSessionClick = () => {
    setShowAlert(true);
    setError("Feature ist in Arbeit");
  };
  const handleMySessionsClick = () => {
    setShowAlert(true);
    setError("Feature ist in Arbeit");
  };

  const handleLibraryClick = () => {
    setActiveComponent("appLibrary");
  };
  const sessionBuildTypes = [
    {
      component: <CalculatorSvg />,
      label: "Neue Einheit",
      subLabel: "Feature ist in Arbeit",
      textSize: "text-xs",
      cursor: "not-allowed",
      arrow: "",
      align: "",
      backGround: "",
      onclick: () => handleNewSessionClick(),
    },
    {
      component: <FolderSvg />,
      label: "Meine Vorlagen",
      subLabel: "Feature ist in Arbeit",
      textSize: "text-xs",
      cursor: "not-allowed",
      arrow: "",
      align: "",
      backGround: "",
      onclick: () => handleMySessionsClick(),
    },
    {
      component: <LibrarySvg />,
      label: "App-Bibliothek",
      subLabel: "",
      textSize: "text-sm",
      cursor: "pointer",
      arrow: <ArrowRightSvg />,
      align: "justify-between",
      backGround: "bg-fourth/5",
      onclick: () => handleLibraryClick(),
    },
  ];

  return (
    <>
      {sessionBuildTypes.map((sessionBuildType, sessionBuildTypeIndex) => (
        <div
          className={`flex min-h-12 m-0.5 p-1 items-center ${sessionBuildType.align} text-center  ${sessionBuildType.backGround} rounded shadow cursor-${sessionBuildType.cursor}`}
          key={sessionBuildTypeIndex}
          onClick={sessionBuildType.onclick}
        >
          <span className="ml-2 ">{sessionBuildType.component}</span>
          <div className="flex flex-col mx-auto">
            <p className={`${sessionBuildType.textSize}`}>
              {sessionBuildType.label}
            </p>
            <p className="text-xs text-alert">{sessionBuildType.subLabel}</p>
          </div>
          {sessionBuildType.arrow}
        </div>
      ))}
    </>
  );
};

export default NewPlanChooseSessionSource;

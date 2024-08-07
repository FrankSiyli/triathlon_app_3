"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Login from "./components/Login/Login";
import Zones from "./components/Zones/Zones";
import Infos from "./components/Infos/Infos";
import WishYouWhat from "./components/WishYouWhat/WishYouWhat";
import Trainingpeaks from "./components/Trainingpeaks/Trainingpeaks";
import MyPlans from "./components/MyPlans/MyPlans";
import UserInfo from "./components/UserInfo/UserInfo";
import Image from "next/image";
import logo from "../../../../public/images/logoSmall.png";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import HeartrateByAge from "./components/Infos/components/calculators/HeartrateByAge/HeartrateByAge";
import HeartrateMax from "./components/Infos/components/calculators/HeartrateMax/HeartrateMax";
import PowerWatt from "./components/Infos/components/calculators/PowerWatt/PowerWatt";
import Agb from "./components/legal/Agb";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import Impressum from "./components/legal/Impressum";
import Link from "next/link";
import trainingpeaksLogo from "../../../../public/images/trainingpeaks_logo_2.png";
import ArrowRightSvg from "@/app/components/SVGs/arrows/ArrowRightSvg";

function ProfilView() {
  const [activeComponent, setActiveComponent] = useState("profil");
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();

  const renderButton = (label, component, icon) => (
    <button
      onClick={() => setActiveComponent(component)}
      className="flex justify-between w-full max-w-xl shadow hover:shadow-md p-2 rounded-md my-1 transform transition-all duration-300"
    >
      <div className="ml-2">{label}</div>
      {icon || <ArrowRightSvg />}
    </button>
  );

  const renderContent = () => {
    switch (activeComponent) {
      case "login":
        return (
          <Login
            setShowProfil={() => setActiveComponent("profil")}
            setShowRegisterForm={() => setActiveComponent("registerForm")}
          />
        );
      case "zones":
        return <Zones setShowProfil={() => setActiveComponent("profil")} />;
      case "infos":
        return (
          <Infos
            setShowProfil={() => setActiveComponent("profil")}
            setShowHeartrateByAge={() => setActiveComponent("heartrateByAge")}
            setShowHeartrateMax={() => setActiveComponent("heartrateMax")}
            setShowPowerWatt={() => setActiveComponent("powerWatt")}
          />
        );
      case "wishYouWhat":
        return (
          <WishYouWhat setShowProfil={() => setActiveComponent("profil")} />
        );
      case "trainingpeaks":
        return (
          <Trainingpeaks setShowProfil={() => setActiveComponent("profil")} />
        );
      case "myPlans":
        return <MyPlans setShowProfil={() => setActiveComponent("profil")} />;
      case "userInfo":
        return <UserInfo setShowProfil={() => setActiveComponent("profil")} />;
      case "registerForm":
        return (
          <RegisterForm
            setShowProfil={() => setActiveComponent("profil")}
            setShowRegisterForm={() => setActiveComponent("login")}
          />
        );
      case "agb":
        return <Agb setShowProfil={() => setActiveComponent("profil")} />;
      case "privacyPolicy":
        return (
          <PrivacyPolicy setShowProfil={() => setActiveComponent("profil")} />
        );
      case "impressum":
        return <Impressum setShowProfil={() => setActiveComponent("profil")} />;
      case "heartrateByAge":
        return (
          <HeartrateByAge setShowInfos={() => setActiveComponent("infos")} />
        );
      case "heartrateMax":
        return (
          <HeartrateMax setShowInfos={() => setActiveComponent("infos")} />
        );
      case "powerWatt":
        return <PowerWatt setShowInfos={() => setActiveComponent("infos")} />;
      default:
        return renderProfileView();
    }
  };

  const renderProfileView = () => (
    <>
      <div className="flex justify-center mx-auto bg-fourth/10 text-fifth/80 mt-5 mb-5 px-3 py-1 rounded-sm">
        <span>Willkommen {session?.user.name}</span>
      </div>
      <div className="w-full">
        {!session && renderButton("Anmelden", "login")}
        {renderButton("Persönliche Kalenderwerte", "zones")}
        {renderButton("Informationen", "infos")}
        {renderButton("Wünsch dir was", "wishYouWhat")}
        {session && renderButton("Meine Pläne", "myPlans")}
        {session && renderButton("Konto", "userInfo")}
        {renderButton(
          "Trainingpeaks",
          "trainingpeaks",
          <Image
            alt="trainingpeaks"
            className="w-auto h-7"
            src={trainingpeaksLogo}
          />
        )}
        <Image
          priority
          src={logo}
          alt="logo"
          className="mx-auto w-40 mt-20"
          width={200}
          height={200}
        />
        <Link
          target="_blank"
          href="https://www.instagram.com/siyli_app.de"
          className="relative flex text-center justify-center items-center m-10 border border-first w-8 h-8 rounded-md cursor-pointer shadow-sm"
        >
          <span className="absolute top-1 right-1 border border-first rounded-full w-1 h-1 shadow-xl bounce-point"></span>
          <span className="border border-first rounded-full w-4 h-4 shadow-xl"></span>
        </Link>
        {renderButton("Impressum", "impressum")}
       {/* {renderButton("AGB", "agb")} */}
        {renderButton("Datenschutz", "privacyPolicy")}
        <div className="my-5 text-center flex justify-center">
          © Siyli-endurance-coaching 2022-{currentYear}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center w-screen mx-auto gap-2 max-w-xl">
      {renderContent()}
    </div>
  );
}

export default ProfilView;

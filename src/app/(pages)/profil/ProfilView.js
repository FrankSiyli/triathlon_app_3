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
  const [showLogin, setShowLogin] = useState(false);
  const { data: session } = useSession();

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setShowLogin(false);
  };

  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="flex flex-col items-center gap-2 max-w-xl">
      {activeComponent === "profil" && (
        <>
          <Image
            className="absolute top-0 right-0 h-16 w-full z-10 object-cover object-top opacity-50"
            src="/images/triathlonImage_2.jpg"
            alt="sport image"
            quality={100}
            priority
            width={600}
            height={600}
          />
          <div className="h-16 absolute right-0 top-0 w-full  bg-gradient-to-b from-transparent via-transparent via-80% to-first z-10"></div>

          <div className="flex items-center mx-auto text-center border border-sixth/50 mt-11 mb-10 px-3 py-1 z-20 rounded-md backdrop-blur-sm shadow-xl">
            <span>Willkommen {session?.user.name}</span>
          </div>

          {!session && (
            <button
              onClick={() => handleComponentChange("login")}
              className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md my-1 "
            >
              <div className="ml-5">Anmelden</div>
              <ArrowRightSvg />
            </button>
          )}

          <button
            onClick={() => handleComponentChange("zones")}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
          >
            <div className="ml-5">Persönliche Kalenderwerte</div>
            <ArrowRightSvg />
          </button>

          <button
            onClick={() => handleComponentChange("infos")}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
          >
            <div className="ml-5">Informationen</div>
            <ArrowRightSvg />
          </button>

          <button
            onClick={() => handleComponentChange("wishYouWhat")}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
          >
            <div className="ml-5">Wünsch dir was</div>
            <ArrowRightSvg />
          </button>

          {session && (
            <button
              onClick={() => handleComponentChange("myPlans")}
              className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md my-1 "
            >
              <div className="ml-5">Meine Pläne</div>
              <ArrowRightSvg />
            </button>
          )}

          {session && (
            <button
              onClick={() => handleComponentChange("userInfo")}
              className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
            >
              <div className="ml-5">Konto</div>
              <ArrowRightSvg />
            </button>
          )}

          <button
            onClick={() => handleComponentChange("trainingpeaks")}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1"
          >
            <div className="ml-5  bg-first rounded-md">
              <Image
                alt="trainingpeaks"
                className="w-auto h-7 "
                src={trainingpeaksLogo}
              />
            </div>
            <ArrowRightSvg />
          </button>

         
        </>
      )}
      {activeComponent === "heartrateByAge" && (
        <HeartrateByAge setShowInfos={() => handleComponentChange("infos")} />
      )}
      {activeComponent === "heartrateMax" && (
        <HeartrateMax setShowInfos={() => handleComponentChange("infos")} />
      )}
      {activeComponent === "powerWatt" && (
        <PowerWatt setShowInfos={() => handleComponentChange("infos")} />
      )}
      {activeComponent === "login" && (
        <Login
          setShowProfil={() => handleComponentChange("profil")}
          setShowRegisterForm={() => handleComponentChange("registerForm")}
        />
      )}
      {activeComponent === "zones" && (
        <Zones setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "infos" && (
        <Infos
          setShowProfil={() => handleComponentChange("profil")}
          setShowHeartrateByAge={() => handleComponentChange("heartrateByAge")}
          setShowHeartrateMax={() => handleComponentChange("heartrateMax")}
          setShowPowerWatt={() => handleComponentChange("powerWatt")}
        />
      )}
      {activeComponent === "wishYouWhat" && (
        <WishYouWhat setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "trainingpeaks" && (
        <Trainingpeaks setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "myPlans" && (
        <MyPlans setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "userInfo" && (
        <UserInfo setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "appUpdates" && (
        <AppUpdates setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "registerForm" && (
        <RegisterForm
          setShowProfil={() => handleComponentChange("profil")}
          setShowRegisterForm={setShowLogin}
        />
      )}
      {activeComponent === "agb" && (
        <Agb setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "impressum" && (
        <Impressum setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "privacyPolicy" && (
        <PrivacyPolicy setShowProfil={() => handleComponentChange("profil")} />
      )}
      {activeComponent === "profil" && (
        <>
          <Image
            priority
            src={logo}
            alt="logo"
            className="mx-auto w-40 mt-20"
            width={100}
            height={100}
          />
          <Link
            target="_blank"
            href="https://www.instagram.com/siyli_app.de?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
            className="relative flex text-center justify-center items-center m-10 border border-first w-8 h-8 rounded-md cursor-pointer shadow-sm"
          >
            <span className="absolute top-1 right-1 border border-first rounded-full w-1 h-1 shadow-xl bounce-point "></span>
            <span className="border border-first rounded-full w-4 h-4  shadow-xl"></span>
          </Link>
          <button
            onClick={() => handleComponentChange("impressum")}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
          >
            <div className="ml-5">Impressum</div>
            <ArrowRightSvg />
          </button>
          <button
            onClick={() => handleComponentChange("agb")}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
          >
            <div className="ml-5">AGB</div>
            <ArrowRightSvg />
          </button>
          <button
            onClick={() => handleComponentChange("privacyPolicy")}
            className="flex justify-between w-full max-w-xl shadow-md p-2 rounded-md  my-1 "
          >
            <div className="ml-5">Datenschutz</div>
            <ArrowRightSvg />
          </button>
          <div className="my-5 text-center flex  justify-center">
            © Siyli-endurance-coaching 2022-{currentYear}{" "}
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default ProfilView;

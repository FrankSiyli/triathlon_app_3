import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";
import React from "react";

function Impressum({ setShowProfil }) {
  const handleBackClick = () => {
    setShowProfil();
  };

  return (
    <div>
      <div className="w-full max-w-xl mx-auto">
        <button
          className="top-5 left-5 btn btn-ghost btn-sm  m-3 border border-transparent text-first "
          onClick={handleBackClick}
        >
          <ArrowLeftSvg />
        </button>
      </div>

      <div className="flex min-h-screen flex-col p-4 text-center">
        <p>Frank Siyli</p>
        <p>Siyli endurance coaching</p>
        <p>Vogt Groth Weg 45a</p>
        <p>22609 Hamburg</p>
        <p>E-Mail: info@siyli-endurance-coaching.com</p>
        <p>
          USt. wird nicht ausgewiesen, da der Verkäufer/ die Verkäuferin
          Kleinunternehmer:in im Sinne des UStG ist.
        </p>
        <p>
          Plattform der EU-Kommission zur Online-Streitbeilegung:
          https://ec.europa.eu/odr
        </p>
        <p>
          Ich bin zur Teilnahme an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
        </p>
      </div>
    </div>
  );
}

export default Impressum;

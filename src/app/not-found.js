import Image from "next/image";
import React from "react";
import logo from "../../public/images/logoSmall.png";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col  justify-center content-center text-center mx-auto w-screen h-screen">
        <Image
          priority
          src={logo}
          alt="logo"
          className="mx-auto"
          width={200}
          height={200}
        />
        <h2 className="my-5">uups... da ist etwas schief gelaufen</h2>
        <p>
          <Link
            className="underline text-alert decoration-alert underline-offset-2"
            href="/"
          >
            Hier
          </Link>{" "}
          geht es wieder zur App
        </p>
      </div>
    </>
  );
};

export default NotFound;

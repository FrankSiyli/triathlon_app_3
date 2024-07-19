import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      className="w-auto h-20 fixed left-2 top-2 bg-appGrey/80"
      src="/images/logoSmallBlack.png"
      alt="logo"
      width={200}
      height={200}
      priority
    />
  );
};

export default Logo;

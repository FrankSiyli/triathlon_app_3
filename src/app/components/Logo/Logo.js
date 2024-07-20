import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      className="absolute left-0 top-0 w-20 h-20 drop-shadow-lg"
      src="/images/logoSmallBlack.png"
      alt="logo"
      width={200}
      height={200}
      priority
    />
  );
};

export default Logo;

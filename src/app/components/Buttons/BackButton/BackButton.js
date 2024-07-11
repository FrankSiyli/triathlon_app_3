import Link from "next/link";
import React from "react";

function BackButton({ href }) {
  return (
    <>
      <div className="w-screen max-w-xl mx-auto">
        <Link
          href={href}
          className="top-5 left-5 btn btn-ghost btn-sm  m-3 border border-transparent text-first "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default BackButton;

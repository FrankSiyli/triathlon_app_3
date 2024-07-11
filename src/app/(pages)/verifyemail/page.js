"use client";
import Loader from "@/app/components/Loader/Loader";
import React, { useEffect, useState } from "react";
import Alert from "@/app/components/Alerts/Alert";
import Link from "next/link";

const VarifyEmailPage = () => {
  const [tokenIsSet, setTokenIsSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const urlToken = async () => {
      const newToken = window.location.search.split("=")[1];
      setToken(newToken || "");
      setTokenIsSet(true);
    };
    urlToken();
  }, []);

  if (tokenIsSet) {
    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/user/verifyEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        });
        if (response.ok) {
          setTokenIsSet(false);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        setShowAlert(true);
        setError("Etwas ist schief gelaufen");
        setIsLoading(false);
        setTokenIsSet(false);
        return;
      }
    };
    verifyEmail();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-full py-2">
        {isLoading ? (
          <>
            <Loader isLoading={isLoading} />
          </>
        ) : (
          <>
            <div className="text-center mx-5">
              Konto wurde erstellt 🎉
              <br />
              Du kannst dich jetzt anmelden.
            </div>
            <Link className="underline mt-10" href="/">
              zurück zur App
            </Link>
          </>
        )}

        {error && showAlert && (
          <Alert alertText={error} setShowAlert={setShowAlert} />
        )}
      </div>
    </>
  );
};

export default VarifyEmailPage;

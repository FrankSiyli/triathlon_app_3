import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UncheckSvg from "@/app/components/SVGs/UncheckSvg";
import { showAddSessionMenuState } from "@/app/recoil/atoms/addSession/showAddSessionMenuState";
import SessionCategories from "./menu 1 categories/SessionCategories";
import { clickedSessionCategoryApiState } from "@/app/recoil/atoms/addSession/clickedSessionCategoryApiState";

const AddSessionMenu = () => {
  const [showAddSessionMenu, setShowAddSessionMenu] = useRecoilState(showAddSessionMenuState);
  const [singleSessions, setSingleSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedSessionCategoryApi] = useRecoilState(clickedSessionCategoryApiState);

  const menuRef = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(clickedSessionCategoryApi);
        const contentType = response.headers.get("content-type");
  
        if (response.ok && contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setSingleSessions(data.sessions);
        } else {
          console.error("Failed to fetch sessions. Status:", response.status);
          const errorText = await response.text(); 
          console.error("Received response:", errorText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (clickedSessionCategoryApi) {
      fetchData();
    }
  }, [clickedSessionCategoryApi]);
  

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scrollTo(0, 0);
    }
  }, [clickedSessionCategoryApi]);

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 z-40 h-screen overflow-scroll overflow-x-hidden w-full max-w-3xl sm:w-1/2 bg-lightBlue shadow-2xl flex flex-col"
    >
      <button
        onClick={() => setShowAddSessionMenu(false)}
        className="fixed top-2 left-2 w-8 flex items-center justify-center border border-alert bg-first shadow rounded"
      >
        <UncheckSvg />
      </button>
      <SessionCategories isLoading={isLoading} singleSessions={singleSessions} />
    </div>
  );
};

export default AddSessionMenu;

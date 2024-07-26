import { useEffect, useRef, useState } from "react";

const useToggleItems = () => {
  const [showAllItems, setShowAllItems] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("7rem");

  useEffect(() => {
    if (showAllItems) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentHeight("7rem");
    }
  }, [showAllItems]);

  const handleToggleItemsClick = () => {
    setShowAllItems(!showAllItems);
  };

  return { showAllItems, contentRef, contentHeight, handleToggleItemsClick };
};

export default useToggleItems;

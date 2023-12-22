import { useState, useEffect } from "react";

function useOnlineStatus() {
  const getOnlineStatus = () => {
    console.log("Checking initial online status:", navigator.onLine);
    return navigator.onLine;
  };

  const [isOnline, setIsOnline] = useState(getOnlineStatus);

  useEffect(() => {
    function handleOnline() {
      console.log("Browser went online");
      setIsOnline(true);
    }

    function handleOffline() {
      console.log("Browser went offline");
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export default useOnlineStatus;

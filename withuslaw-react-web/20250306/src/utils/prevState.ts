import { useEffect, useCallback } from "react";

const useHandlePopstate = (callback: () => void) => {
  const handlePopstate = useCallback(() => {
    if (typeof callback === "function") {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [handlePopstate]);

  return handlePopstate;
};

export { useHandlePopstate };

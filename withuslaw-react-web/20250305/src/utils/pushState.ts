import { useEffect } from "react";

export function usePrevEvent(handlePrev: () => void, condition: boolean) {
  useEffect(() => {
    const onPopState = () => {
      handlePrev();
    };

    if (condition) {
      history.pushState(null, "", location.href);
    }

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [handlePrev, condition]);
}

import { useEffect, useState } from "react";

const usePulltoRefresh = (el: any, onRefresh: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    function handleTouchStart(event: any) {
      setStartY(event.touches[0].clientY);
    }

    function handleTouchMove(event: any) {
      const moveY = event.touches[0].clientY;
      const pullDistance = moveY - startY;

      if (pullDistance > 0 && window.scrollY === 0 && el !== "") {
        event.preventDefault();

        if (pullDistance > 80) {
          el.current.style.transform = "translate(0, 40px)";
          el.current.style.transition = "0.3s";
          setRefreshing(true);
        }
      }
    }

    function handleTouchEnd() {
      if (refreshing) {
        setTimeout(() => {
          setRefreshing(false);
          if (typeof onRefresh === "function") {
            onRefresh();
          }
          el.current.style.transform = "translate(0,0)";
        }, 100);
      }
    }

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [refreshing, startY, el, onRefresh]);
};

export default usePulltoRefresh;

import { useRef } from "react";

function useMoveScroll() {
  const element = useRef<any>(null);

  const onMoveToScroll = () => {
    if (element.current) {
      setTimeout(() => {
        element.current.scrollIntoView({ block: "start", behavior: "smooth" });
      }, 200);
    }
  };

  return { element, onMoveToScroll };
}

export default useMoveScroll;

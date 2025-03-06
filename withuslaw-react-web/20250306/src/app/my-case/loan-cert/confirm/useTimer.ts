import { useEffect, useState } from "react";

export default function useTimer(initTime: number) {
  const [time, setTime] = useState(initTime);

  const reset = () => setTime(initTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return { time, reset };
}

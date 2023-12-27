import { useState, useEffect } from 'react';

export const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  const startTimer = (duration: number) => {
    setTime(duration);
    if (timerId) clearInterval(timerId);
    const id = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(id);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimerId(id);
  };

  const stopTimer = () => {
    if (timerId) clearInterval(timerId);
    setTimerId(null);
  };

  return { time, setTime, startTimer, stopTimer };
};

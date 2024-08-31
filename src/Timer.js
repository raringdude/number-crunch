import React, { useState, useEffect } from 'react';

const Timer = ({ isRunning, onTimeCaptured, reset }) => {
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setMilliseconds(prevMilliseconds => {
          if (prevMilliseconds >= 99) {
            setSeconds(prevSeconds => prevSeconds + 1);
            return 0;
          }
          return prevMilliseconds + 1;
        });
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning && (seconds > 0 || milliseconds > 0)) {
      onTimeCaptured(seconds, milliseconds);
    }
  }, [isRunning, seconds, milliseconds, onTimeCaptured]);

  useEffect(() => {
    if (reset) {
      setSeconds(0);
      setMilliseconds(0);
    }
  }, [reset]);

  return (
    <div>
      <h1>Timer</h1>
      <p>
        {String(seconds).padStart(2, '0')}:
        {String(milliseconds).padStart(2, '0')}
      </p>
    </div>
  );
};

export default Timer;

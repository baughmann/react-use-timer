import { useState, useEffect } from "react";

/**
 * @description A simple timer that you can pause, resume, reset, and do something when the countdown completes.
 */
export type Timer = {
  /**
   * @description The decimal number of seconds remaining before the timer has reached the `stopAtSeconds` (i.e. 6.342)
   */
  seconds: number;

  /**
   * @description Pauses the timer
   */
  pause: () => void;

  /**
   * @description Starts or resumes the timer
   */
  start: () => void;

  /**
   * @description Resets the timer back to 0.00
   */
  reset: () => void;

  /**
   * @description Whether or not the timer is currently running
   */
  isActive: boolean;

  /**
   * @description The amount of time that passed during the last active period
   */
  lastElapsed: number;

  /**
   * @description Erases the last recorded segment of the timer
   */
  rewind: () => void
};

/**
 * @description A simple timer that you can pause, resume, reset, and do something when the countdown completes.
 * @param {number} stopAtSeconds The number of seconds until the timer should stop on it's own and fire the `onStop` callback
 * @param {() => void} onStop Optional callback to be fired when the timer has run out
 */
export default (stopAtSeconds?: number, onStop?: () => void): Timer => {
  const [startTime, setStartTime] = useState<number>();
  // seconds that have ellapsed this time
  const [seconds, setSeconds] = useState<number>(0);
  // seconds that have ellapsed since the timer was created
  const [prevSeconds, setPrevSeconds] = useState<number>(0);
  const [lastElapsed, setLastElapsed] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  const reset = () => {
    setSeconds(0);
    setPrevSeconds(0);
    setLastElapsed(0);
    setIsActive(false);
  };

  const pause = () => {
    setIsActive(false);
    setLastElapsed(seconds - prevSeconds);
    setPrevSeconds(seconds);
  };

  const rewind = () => {
    setSeconds(seconds - lastElapsed)
  }

  const start = () => {
    setStartTime(Date.now());
    setIsActive(true);
    setLastElapsed(0);
  };

  useEffect(() => {
    if (stopAtSeconds && seconds >= stopAtSeconds) {
      reset();
      onStop && onStop();
    }

    let interval: any = null;
    if (isActive && startTime) {
      interval = setInterval(() => {
        setSeconds((Date.now() - startTime) / 1000 + prevSeconds);
      }, 10);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return { seconds, pause, start, reset, isActive, lastElapsed, rewind };
};

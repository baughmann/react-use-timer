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
   * @description Sets the seconds passed to the desired number
   */
  setSeconds: (next: number) => void
};

/**
 * @description A simple timer that you can pause, resume, reset, and do something when the countdown completes.
 * @param {number} stopAtSeconds The number of seconds until the timer should stop on it's own and fire the `onStop` callback
 * @param {() => void} onStop Optional callback to be fired when the timer has run out
 */
export default (stopAtSeconds?: number, onStop?: () => void): Timer => {
  const [startTime, setStartTime] = useState<number>();
  // seconds that have ellapsed this time
  const [seconds, _setSeconds] = useState<number>(0);
  // seconds that have ellapsed since the timer was created
  const [prevSeconds, setPrevSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  const reset = () => {
    _setSeconds(0);
    setPrevSeconds(0);
    setIsActive(false);
  };

  const pause = () => {
    setIsActive(false);
    setPrevSeconds(seconds);
  };

  const start = () => {
    setStartTime(Date.now());
    setIsActive(true);
  };

  const setSeconds = (next: number) => {
    _setSeconds(next)
    setPrevSeconds(next)
  }

  useEffect(() => {
    if (stopAtSeconds && seconds >= stopAtSeconds) {
      reset();
      onStop && onStop();
    }

    let interval: any = null;
    if (isActive && startTime) {
      interval = setInterval(() => {
        _setSeconds((Date.now() - startTime) / 1000 + prevSeconds);
      }, 10);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return { seconds, pause, start, reset, isActive, setSeconds };
};

import { useEffect, useState } from 'react';
import { useAlbum } from './useAlbum';

const COOLDOWN_DURATION = 60;

export const useEnvelopeTimer = () => {
  const { state, checkCooldowns } = useAlbum();
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      checkCooldowns();
    }, 1000);

    return () => clearInterval(interval);
  }, [checkCooldowns]);

  useEffect(() => {
    const maxLockTime = Math.max(...state.envelopes.map((e) => e.lockedUntil));
    const now = Date.now();
    const newRemainingTime = Math.max(0, Math.ceil((maxLockTime - now) / 1000));
    setRemainingTime(newRemainingTime);

    if (newRemainingTime > 0) {
      const uiTimer = setTimeout(() => {
        setRemainingTime(newRemainingTime - 1);
      }, 1000);
      return () => clearTimeout(uiTimer);
    }
  }, [state.envelopes]);

  return {
    remainingTime,
    isLocked: state.envelopes.some((e) => e.lockedUntil > Date.now()),
  };
};

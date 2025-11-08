import React, { useEffect, useState } from 'react';

const CooldownTimer = ({ cooldownEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    cooldownEnd ? Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000)) : 0
  );

  useEffect(() => {
    if (!cooldownEnd) return;

    const intervalId = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((cooldownEnd - Date.now()) / 1000)
      );
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cooldownEnd]);

  if (timeRemaining <= 0) {
    return (
      <span className="text-green-500 font-mono text-3xl font-bold tracking-widest">
        DISPONIBLE
      </span>
    );
  }

  return (
    <span className="text-red-500 font-mono text-3xl font-bold tracking-widest [text-shadow:0_0_5px_rgba(239,68,68,0.7)]">
      {timeRemaining} s
    </span>
  );
};

export default CooldownTimer;

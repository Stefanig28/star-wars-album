import React, { useEffect, useState } from 'react';

const CooldownTimer = ({ envelope, dispatch }) => {
    const [_, setTime] = useState(Date.now()); 
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch({ type: 'UPDATE_COOLDOWNS' });
            setTime(Date.now()); 
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);
    
    if (!envelope || envelope.status !== 'cooldown') {
        return (
            <span className="text-green-500 font-mono text-3xl font-bold tracking-widest">
                DISPONIBLE
            </span>
        );
    }

    const now = Date.now();
    const isLocked = envelope.status === 'locked' && envelope.lockedUntil > now;
    
    const timeRemaining = envelope.lockedUntil > now ? envelope.lockedUntil - now : 0;
    
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);

    const displayTime = timeRemaining > 0 ? 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` : 
        '00:00'; 

    return (
        <div className="flex items-center space-x-2">
            <svg
                className="w-5 h-5 text-red-500 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 011-1h4a1 1 0 010 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <span className="text-red-500 font-mono text-3xl font-bold tracking-widest [text-shadow:0_0_5px_rgba(239,68,68,0.7)]">
                {displayTime}
            </span>
        </div>
    );
};

export default CooldownTimer;
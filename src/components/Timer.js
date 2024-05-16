import React, { useState, useEffect } from 'react';

function CountdownTimer() {
    const [timeRemaining, setTimeRemaining] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        // Остановить таймер, когда время истекло
        if (timeRemaining === 0) {
            clearInterval(timer);
        }

        // Очистить таймер при размонтировании компонента
        return () => clearInterval(timer);
    }, [timeRemaining]);

    return (
        <span>
            {timeRemaining} секунд
        </span>
    );
}

export default CountdownTimer;
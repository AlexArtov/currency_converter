import React, { useState, useEffect } from 'react';
import {Button} from "react-bootstrap";

function CountdownTimer() {
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [buttonHeandler, setButtonHeandler] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        // Остановить таймер, когда время истекло
        if (timeRemaining === 0) {
            clearInterval(timer);
            setButtonHeandler(true)
        }

        // Очистить таймер при размонтировании компонента
        return () => clearInterval(timer);
    }, [timeRemaining]);


    const handleReload = () => {
        window.location.reload();
    };


    return (
        <span>
            {timeRemaining} секунд
            {buttonHeandler ? <><br/> <Button className="mt-3" onClick={handleReload}>Пожалуйста нажми на меня ^_^</Button></> : null}
        </span>
    );
}

export default CountdownTimer;
import React, { useState, useEffect } from 'react';
import {Button} from "react-bootstrap";
import luluwpp from "../images/luluwpp.gif";

function CountdownTimer() {
    const [timeRemaining, setTimeRemaining] = useState(45);
    const [buttonHeandler, setButtonHeandler] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        if (timeRemaining === 0) {
            clearInterval(timer);
            setButtonHeandler(true)
        }

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <>
            <label> {timeRemaining} секунд.</label>
            <br/>
            <img className="mt-3" src={luluwpp} alt="luluwpp"/>
            {buttonHeandler ? <><br/> <Button className="mt-3" onClick={handleReload}>Перезагрузить страницу</Button></> : null}
        </>
    );
}

export default CountdownTimer;
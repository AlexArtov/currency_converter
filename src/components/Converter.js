import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, FloatingLabel, FormControl, InputGroup, Row} from "react-bootstrap";

import FormSelectCurrency from "./FormSelectCurrency";
import Loader from "./Loader";

function Converter({value, mainCurrencyValue, setError}) {
    const [quantity, setQuantity] = useState(1)
    const [currencies, setCurrencies] = useState('RUB');
    const [Currency, setCurrency] = useState({})
    const [base_currency, setBase_currency] = useState(mainCurrencyValue);
    const [loading, setLoading] = useState(true);

    const firstKey = Object.keys(Currency)[0];
    const firstValue = Currency[firstKey];

    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=${currencies}&base_currency=${base_currency}`

    const searchQuantity = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setCurrency(response.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 429) {
                setError('Слишком много запросов. Пожалуйста, подождите ');
                setTimeout(() => {
                    setError(null);
                    searchQuantity();
                }, 45000);
            }
        }
    };

    const base_currencyHandleChanger = (event) => {
        setBase_currency(event.target.value);
    };

    const handleSwap = () => {
        setCurrencies(base_currency);
        setBase_currency(currencies);
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if (/^[0-9]*\.?[0-9]*$/.test(value)) {
            setQuantity(value);
        }
    };

    const CurrenciesHandleChanger = (event) => {
        setCurrencies(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'e' || event.key === 'E' || event.key === '-' || event.key === '+') {
            event.preventDefault();
        }
    };

    const handlePaste = (event) => {
        const pastedText = event.clipboardData.getData('text');
        if (!/^\d*\.?\d*$/.test(pastedText)) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        searchQuantity();
    }, [currencies, base_currency]);


    useEffect(() => {
        setBase_currency(mainCurrencyValue)
    }, [mainCurrencyValue]);

    return (
        <Container className="Home">
            <h2 className="my-3">Конвертер валют</h2>
            <Row>
                <Col xs={6}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Введите сумму"
                            aria-label="Введите сумму"
                            onChange={handleQuantityChange}
                            onKeyDown={handleKeyDown}
                            onPaste={handlePaste}
                            type="number"
                            value={quantity}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <label className='mb-3'>Выберите валюты</label>
            <Row className='mb-3'>
                <Col xs={3}>
                    <FloatingLabel controlId="floatingSelect" label="Из" value={base_currency}
                                   onChange={base_currencyHandleChanger}>
                        <FormSelectCurrency value={value} baseValue={base_currency}/>
                    </FloatingLabel>
                </Col>
                <Col xs={3}>
                    <FloatingLabel controlId="floatingSelect" label="В" value={currencies}
                                   onChange={CurrenciesHandleChanger}>
                        <FormSelectCurrency value={value} baseValue={currencies}/>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <Button className='mb-3' onClick={handleSwap}> Поменять значения местами</Button>
                </Col>
            </Row>
            {loading ? <Loader/> :
                <div>{firstValue ? <h2>Итог: {Math.round(firstValue * quantity * 1000) / 1000}</h2> : null}</div>
            }
        </Container>
    );
}

export default Converter;
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import FormSelectCurrensy from "./FormSelectCurrensy";

function Converter({value, mainCurrensyValue}) {
    const [quantity, setQuantity] = useState(1)
    const [currencies, setCurrencies] = useState('RUB');
    const [Currensy, setCurrensy] = useState({})
    const [base_currency, setBase_currency] = useState(mainCurrensyValue);

    const firstKey = Object.keys(Currensy)[0];
    const firstValue = Currensy[firstKey];

    const url =  `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=${currencies}&base_currency=${base_currency}`

    const searchQuantity = () => {
        setTimeout(() => {
            axios.get(url).then((response) => {
                setCurrensy(response.data.data)
            });
        }, 500);
    };

    const base_currencyHandleChanger = (event) => {
        setBase_currency(event.target.value);
    };

    const CurrenciesHandleChanger = (event) => {
        setCurrencies(event.target.value);
    };
    const handleSwap = () => {
        setCurrencies(base_currency);
        setBase_currency(currencies);
    };

    useEffect(() => {
        searchQuantity();
    }, [currencies, base_currency]);


    useEffect(() => {
        setBase_currency(mainCurrensyValue)
    }, [mainCurrensyValue]);

    return(
        <Container className="Home">
            <h1 className="my-3">Конвертер валют</h1>
            <Row >
                <Col xs={6}>
                    <InputGroup  className="mb-3" >
                        <Form.Control
                            placeholder="Введите сумму"
                            aria-label="Введите сумму"
                            onChange={event => setQuantity(event.target.value)}
                            type="number"
                            value={quantity}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <p>Выберите валюты</p>
            <Row className='mb-3'>
                <Col xs={3}>
                <FloatingLabel controlId="floatingSelect" label="Из" value={base_currency} onChange={base_currencyHandleChanger}>
                    <FormSelectCurrensy value={value} baseValue={base_currency}/>
                </FloatingLabel>
                </Col>
                <Col xs={3}>
                    <FloatingLabel controlId="floatingSelect" label="В" value={currencies} onChange={CurrenciesHandleChanger}>
                        <FormSelectCurrensy value={value} baseValue={currencies}/>
                    </FloatingLabel>
                </Col>
            </Row>
            <Button className='mb-3' onClick={handleSwap}> Поменять значения местами</Button>
            <p> {firstValue ? <h1>Итог: {firstValue * quantity}</h1> : <p></p>}</p>
        </Container>);
};

export default Converter;
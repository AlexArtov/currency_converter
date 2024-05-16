import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import FormSelectCurrensy from "./FormSelectCurrensy";
import Loader from "./Loader";

function Converter({value, mainCurrensyValue, setError}) {
    const [quantity, setQuantity] = useState(1)
    const [currencies, setCurrencies] = useState('RUB');
    const [Currensy, setCurrensy] = useState({})
    const [base_currency, setBase_currency] = useState(mainCurrensyValue);
    const [loading, setLoading] = useState(true);

    const firstKey = Object.keys(Currensy)[0];
    const firstValue = Currensy[firstKey];

    const url =  `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=${currencies}&base_currency=${base_currency}`

    const searchQuantity = () => {
        setTimeout(() => {
            axios.get(url).then((response) => {
                setCurrensy(response.data.data)
            })
            .catch(error => {
                if (error.response && error.response.status === 429) {
                    setError('Слишком много запросов. Пожалуйста, подождите ');
                } else {
                    // Обработка других ошибок
                    console.error('Ошибка:', error.message);
                    setTimeout(()=> {
                        setError(null)
                        searchQuantity()
                    },60000)
                };
            });
            setLoading(false)
        }, 500);
    }

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

    window.onerror = function(message, source, lineno, colno, error) {
        // Обработка ошибки
        return true; // Предотвращает появление всплывающего окна с ошибкой в браузере
    };

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
            {loading ? <Loader /> :
                <p> {firstValue ? <h1>Итог: {firstValue * quantity}</h1> : <p></p>}</p>
            }
        </Container>);
};

export default Converter;
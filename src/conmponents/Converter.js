import React, {useState} from "react";
import axios from "axios";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Placeholder, Row} from "react-bootstrap";

function Converter() {
    const [quantity, setQuantity] = useState(0)
    const [curensy, setCurensy] = useState({})
    const [currencies, setCurrencies] = useState('');
    const [base_currency, setBase_currency] = useState('');

    const firstKey = Object.keys(curensy)[0];
    const firstValue = curensy[firstKey];

    const url =  `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=${currencies}&base_currency=${base_currency}`

    const CurrenciesHandleChanger = (event) => {
        setCurrencies(event.target.value);
    };
    const base_currencyHandleChanger = (event) => {
        setBase_currency(event.target.value);
    };

    const searchQuantity = (event) => {
        axios.get(url).then((response) =>{
            setCurensy(response.data.data)
            console.log(response.data.data)
        })
    }

    return(
        <Container className="Home">
            <h1 className="my-3">Конвертер валют</h1>
            <Row>
                <Col xs={6}>
                    <InputGroup  className="mb-3" >
                        <Form.Control
                            placeholder="Введите сумму"
                            aria-label="Введите сумму"
                            onChange={event => setQuantity(event.target.value)}
                            type="number"
                        />
                        <Button type="radio" variant="primary" onClick={searchQuantity} xs={6}>Посчитать курс</Button>
                    </InputGroup>
                </Col>
            </Row>
            <p>Выбирите валюты</p>
            <Row>
                <Col xs={3}>
                <FloatingLabel controlId="floatingSelect" label="Из" value={base_currency} onChange={base_currencyHandleChanger}>
                    <Form.Select aria-label="Из">
                        <option value="">Выберите значение</option>
                        <option value="RUB">Russian Ruble</option>
                        <option value="EUR">Euro</option>
                    </Form.Select>
                </FloatingLabel>
                </Col>
                <Col xs={3}>
                    <FloatingLabel controlId="floatingSelect" label="В" value={currencies} onChange={CurrenciesHandleChanger}>
                        <Form.Select aria-label="в" className="mb-3">
                            <option value="">Выберите значение</option>
                            <option value="RUB">Russian Ruble</option>
                            <option value="CAD">Canadian Dollar</option>
                            <option value="EUR">Euro</option>
                            <option value="USD">US Dollar</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <p>Итог: {firstValue ? <h1>{firstValue * quantity} {currencies}</h1> : <p></p>}</p>
        </Container>);
}

export default Converter;
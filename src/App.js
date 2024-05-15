import React, {useEffect, useState} from "react";
import {
    Routes,
    Route,
} from "react-router-dom"
import Converter from "./components/Converter";
import AllCurrencies from "./components/AllCurrencies";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import FormSelectCurrensy from "./components/FormSelectCurrensy";

function App() {
    const [mainCurrensy, setMainCurrensy] = useState(localStorage.getItem('mainCurrensy') || 'EUR')
    const [allСurrencies, setAllСurrencies] = useState({});
    const urlAllСurrencies =`https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_AFN5lDQngxQbpNzlcbkv9UsgT33HHG50fYOhYdJD&currencies=`

    const searchQuantityForAll = (event) => {
        setTimeout(() => {
        axios.get(urlAllСurrencies).then((response) =>{
            setAllСurrencies(response.data.data)
        })
        }, 100);
    };

    const mainCurrensyHandler = (event) => {
        const newValue = event.target.value;
        setMainCurrensy(newValue)
        localStorage.setItem('mainCurrensy', newValue)
    };

    useEffect(() => {
        searchQuantityForAll()
    }, []);

    return (
        <div className="app">
            <nav className="navigation">
                <Container>
                    <Row>
                        <Col>
                            <ButtonGroup direction="horizontal" gap={3}>
                                <Button type="radio" variant="outline-dark" href="/currency_converter/">Конвертер Валют</Button>
                                <Button type="radio" variant="outline-dark" href="/currency_converter/about" >Все валюты</Button>
                            </ButtonGroup>
                        </Col>
                        <Col xs={3}>
                            <FormSelectCurrensy value={allСurrencies} baseValue={mainCurrensy} onChange={mainCurrensyHandler}/>
                        </Col>
                    </Row>
                </Container>
            </nav>
            <Container maxWidth="lg">
            <Routes>
                <Route path="/" exact  element={<Converter value={allСurrencies} mainCurrensyValue={mainCurrensy}/>}></Route>
                <Route path="/about"  element={<AllCurrencies value={allСurrencies} mainCurrensyValue={mainCurrensy}/>}></Route>
            </Routes>
            </Container>
        </div>
    );
};

export default App;




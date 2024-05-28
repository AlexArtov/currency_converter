import React, {useEffect, useState} from "react";
import {
    Routes,
    Route, Link,
} from "react-router-dom"
import Converter from "./components/Converter";
import AllCurrencies from "./components/AllCurrencies";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import FormSelectCurrensy from "./components/FormSelectCurrency";
import Timer from "./components/Timer";

function App() {
    const [mainCurrency, setMainCurrency] = useState(localStorage.getItem('mainCurrensy') || 'EUR')
    const [allСurrencies, setAllСurrencies] = useState({});
    const urlAllСurrencies = `https://api.freecurrencyapi.com/v1/currencies?apikey=${process.env.REACT_APP_API_KEY}&currencies=`
    const [error, setError] = useState(null);

    const searchQuantityForAll = (event) => {
        setTimeout(() => {
            axios.get(urlAllСurrencies).then((response) => {
                setAllСurrencies(response.data.data)
            })
                .catch(error => {
                    if (error.response && error.response.status === 429) {
                        setError('Слишком много запросов. Пожалуйста, подождите ');
                        setTimeout(() => {
                            setError(null)
                            searchQuantityForAll()
                        }, 45000)
                    }
                });
        },);
    };

    const mainCurrensyHandler = (event) => {
        const newValue = event.target.value;
        setMainCurrency(newValue)
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
                                <Button as={Link} to="/" type="radio" variant="outline-dark">Конвертер Валют</Button>
                                <Button as={Link} to="/allcurrencies" type="radio" variant="outline-dark">Все
                                    валюты</Button>
                            </ButtonGroup>
                        </Col>
                        <Col xs={3}>
                            <FormSelectCurrensy value={allСurrencies} baseValue={mainCurrency} onChange={mainCurrensyHandler}/>
                        </Col>
                    </Row>
                </Container>
            </nav>
            <Container maxWidth="lg">
                {error ? <>
                        <div className="mt-3">{error}<Timer/></div></> :
                    <Routes>
                        <Route path="/" exact element={<Converter value={allСurrencies} mainCurrencyValue={mainCurrency} setError={setError} error={error}/>}></Route>
                        <Route path="/allcurrencies" element={<AllCurrencies value={allСurrencies} mainCurrencyValue={mainCurrency} setError={setError} error={error}/>}></Route>
                    </Routes>
                }
            </Container>
        </div>
    );
};

export default App;





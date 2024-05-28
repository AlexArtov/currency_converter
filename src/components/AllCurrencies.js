import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, FloatingLabel, Row, Stack} from "react-bootstrap";
import FormSelectCurrensy from "./FormSelectCurrency";
import Loader from "./Loader";

function AllCurrencies({value, mainCurrencyValue, setError}) {
    const [baseCurrencyForAll, setBaseCurrencyForAll] = useState(mainCurrencyValue);
    const [CurrencyForAll, setCurrencyForAll] = useState({})
    const CurrencyKeysArray = Object.keys(CurrencyForAll);
    const [loading, setLoading] = useState(true);

    const urlForAll = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=&base_currency=${baseCurrencyForAll}`
    const base_currencyHandleChangerForAll = (event) => {
        setBaseCurrencyForAll(event.target.value)
    };

    const searchQuantityForAll = async () => {
        setLoading(true);
        try {
            const response = await axios.get(urlForAll);
            setCurrencyForAll(response.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 429) {
                setError('Слишком много запросов. Пожалуйста, подождите ');
                setTimeout(() => {
                    setError(null);
                    searchQuantityForAll();
                }, 45000);
            }
        }
    };

    useEffect(() => {
        searchQuantityForAll()
    }, [baseCurrencyForAll]);

    useEffect(() => {
        setBaseCurrencyForAll(mainCurrencyValue)
    }, [mainCurrencyValue]);

    return (
        <Container>
            <h2 className="my-3">Список всех валют</h2>
            <Row className='mb-3'>
                <Col xs={3}>
                    <label className='mb-3'>Выберите валюту</label>
                    <FloatingLabel controlId="floatingSelect" label="Из" value={baseCurrencyForAll}
                                   onChange={base_currencyHandleChangerForAll}>
                        <FormSelectCurrensy value={value} baseValue={baseCurrencyForAll}/>
                    </FloatingLabel>
                </Col>
            </Row>
            <h2 className="my-3">Курсы валют</h2>
                {loading ? <Loader/> :
                    <Row>
                        {CurrencyKeysArray.reduce((acc, key, index) => {
                            const chunkIndex = Math.floor(index / 11);
                            if (!acc[chunkIndex]) {
                                acc[chunkIndex] = [];
                            }
                            acc[chunkIndex].push(
                                <React.Fragment key={index}>
                                    <Stack direction="horizontal">
                                        <div className="pb-2">{key} - {value[key].name} - {value[key].symbol_native}</div>
                                        <div className="ms-auto">{Math.round(CurrencyForAll[key] * 1000) / 1000}</div>
                                    </Stack>
                                    <hr className="mt-1"/>
                                </React.Fragment>
                            );
                            return acc;
                        }, []).map((column, index) => (
                            <Col key={index} md={4}>
                                {column}
                            </Col>
                        ))}
                    </Row>
                }
        </Container>
    );
}

export default AllCurrencies;
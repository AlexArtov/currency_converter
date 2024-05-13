import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Stack} from "react-bootstrap";

function All_currencies() {
    const [base_currencyForAll, setBase_currencyForAll] = useState('RUB');
    const [curensyForAll, setCurensyForAll] = useState({})

    const urlForAll =`https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=EUR%2CUSD%2CJPY%2CBGN%2CCZK%2CDKK%2CGBP%2CHUF%2CPLN%2CRON%2CSEK%2CCHF%2CISK%2CNOK%2CHRK%2CRUB%2CTRY%2CAUD%2CBRL%2CCAD%2CCNY%2CHKD%2CIDR%2CILS%2CINR%2CKRW%2CMXN%2CMYR%2CNZD%2CPHP%2CSGD%2CTHB%2CZAR&base_currency=${base_currencyForAll}`
    const base_currencyHandleChangerForAll = (event) => {
        setBase_currencyForAll(event.target.value); // Обновляем состояние выбранного значения
    };
    const searchQuantityForAll = (event) => {
        axios.get(urlForAll).then((response) =>{
            setCurensyForAll(response.data.data)
            console.log(response.data.data)
        })
    }

    const curensyKeysArray = Object.keys(curensyForAll);

    useEffect(() => {
    searchQuantityForAll()
    }, []);
    return (
        <Container>
            <h2 className="my-3">Список всех валют</h2>
            <div>
                <Row>
                    <Col xs={6}>
                        <InputGroup  className="mb-3" >
                            <FloatingLabel controlId="floatingSelect" label="Выберите базовую валюту">
                                <Form.Select value={base_currencyForAll} onChange={base_currencyHandleChangerForAll}>
                                    <option value="RUB">Russian Ruble</option>
                                    <option value="EUR">Euro</option>
                                </Form.Select>
                            </FloatingLabel>
                            <Button type="radio" variant="primary" onClick={searchQuantityForAll} xs={6}>Посчитать курс</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <h3 className="my-3">Курсы валют</h3>
                <Row>
                    {curensyKeysArray.reduce((acc, key, index) => {
                        const chunkIndex = Math.floor(index / 11);
                        if (!acc[chunkIndex]) {
                            acc[chunkIndex] = [];
                        }
                        acc[chunkIndex].push(
                            <React.Fragment key={index}>
                                <Stack direction="horizontal">
                                    <div className="pb-2">{key}</div>
                                    <div className="ms-auto">{curensyForAll[key]}</div>
                                </Stack>
                                <hr className="mt-1" />
                            </React.Fragment>
                        );
                        return acc;
                    }, []).map((column, index) => (
                        <Col key={index} md={4}>
                            {column}
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default All_currencies;
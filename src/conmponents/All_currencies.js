import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Stack} from "react-bootstrap";

function All_currencies() {
    const [base_currencyForAll, setBase_currencyForAll] = useState('RUB');
    const [curensyForAll, setCurensyForAll] = useState({})

    const urlForAll =`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_AFN5lDQngxQbpNzlcbkv9UsgT33HHG50fYOhYdJD&currencies=EUR%2CUSD%2CJPY%2CBGN%2CCZK%2CDKK%2CGBP%2CHUF%2CPLN%2CRON%2CSEK%2CCHF%2CISK%2CNOK%2CHRK%2CRUB%2CTRY%2CAUD%2CBRL%2CCAD%2CCNY%2CHKD%2CIDR%2CILS%2CINR%2CKRW%2CMXN%2CMYR%2CNZD%2CPHP%2CSGD%2CTHB%2CZAR&base_currency=${base_currencyForAll}`
    const base_currencyHandleChangerForAll = (event) => {
        setBase_currencyForAll(event.target.value); // Обновляем состояние выбранного значения
    };
    const searchQuantityForAll = (event) => {
        axios.get(urlForAll).then((response) =>{
            setCurensyForAll(response.data.data)
            console.log(response.data.data)
        })
    }

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
                            <FloatingLabel controlId="floatingSelect" label="Выбирите базовую валюту">
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
                    <Col md={4}>
                        <Stack direction="horizontal">
                            <div className="pb-2">EUR - Euro</div>
                            <div className="ms-auto">{curensyForAll.EUR}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">USD -	US Dollar</div>
                            <div className="ms-auto">{curensyForAll.USD}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">JPY - Japanese Yen</div>
                            <div className="ms-auto"> {curensyForAll.JPY}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">BGN -	Bulgarian Lev</div>
                            <div className="ms-auto">{curensyForAll.BGN}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">CZK -	Czech Republic Koruna</div>
                            <div className="ms-auto">{curensyForAll.CZK}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">DKK -	Danish Krone</div>
                            <div className="ms-auto">{curensyForAll.DKK}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">GBP -	British Pound Sterling</div>
                            <div className="ms-auto">{curensyForAll.GBP}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">HUF -	Hungarian Forint</div>
                            <div className="ms-auto">{curensyForAll.HUF}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">PLN -	Polish Zloty</div>
                            <div className="ms-auto">{curensyForAll.PLN}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">RON -	Romanian Leu</div>
                            <div className="ms-auto">{curensyForAll.RON}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">SEK -	Swedish Krona</div>
                            <div className="ms-auto">{curensyForAll.SEK}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">CHF -	Swiss Franc</div>
                            <div className="ms-auto">{curensyForAll.CHF}</div>
                        </Stack>
                        <hr className="mt-1"/>
                    </Col>
                    <Col md={4}>
                        <Stack direction="horizontal">
                            <div className="pb-2">ISK -	Icelandic Króna </div>
                            <div className="ms-auto">{curensyForAll.ISK}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">NOK -	Norwegian Krone</div>
                            <div className="ms-auto">{curensyForAll.NOK}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">HRK -	Croatian Kuna</div>
                            <div className="ms-auto">{curensyForAll.HRK}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">RUB -	Russian Ruble </div>
                            <div className="ms-auto">{curensyForAll.RUB}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">TRY -	Turkish Lira</div>
                            <div className="ms-auto">{curensyForAll.TRY}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2"> AUD - Australian Dollar</div>
                            <div className="ms-auto">{curensyForAll.AUD}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">BRL -	Brazilian Real</div>
                            <div className="ms-auto">{curensyForAll.BRL}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">CAD -	Canadian Dollar</div>
                            <div className="ms-auto">{curensyForAll.CAD}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">CNY -	Chinese Yuan</div>
                            <div className="ms-auto">{curensyForAll.CNY}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">HKD -	Hong Kong Dollar</div>
                            <div className="ms-auto">{curensyForAll.HKD}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">IDR -	Indonesian Rupiah</div>
                            <div className="ms-auto">{curensyForAll.IDR}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">ILS -	Israeli New Sheqel</div>
                            <div className="ms-auto">{curensyForAll.ILS}</div>
                        </Stack>
                        <hr className="mt-1"/>
                    </Col>
                    <Col md={4}>
                        <Stack direction="horizontal">
                            <div className="pb-2">INR -	Indian Rupee </div>
                            <div className="ms-auto">{curensyForAll.INR}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">KRW -	South Korean Won </div>
                            <div className="ms-auto">{curensyForAll.KRW}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">MXN -	Mexican Peso </div>
                            <div className="ms-auto">{curensyForAll.MXN}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">MYR -	Malaysian Ringgit </div>
                            <div className="ms-auto">{curensyForAll.MYR}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">NZD -	New Zealand Dollar</div>
                            <div className="ms-auto">{curensyForAll.NZD}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">PHP -	Philippine Peso</div>
                            <div className="ms-auto">{curensyForAll.PHP}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">SGD -	Singapore Dollar </div>
                            <div className="ms-auto">{curensyForAll.SGD}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">THB -	Thai Baht </div>
                            <div className="ms-auto">{curensyForAll.THB}</div>
                        </Stack>
                        <hr className="mt-1"/>
                        <Stack direction="horizontal">
                            <div className="pb-2">ZAR -	South African Rand </div>
                            <div className="ms-auto">{curensyForAll.ZAR}</div>
                        </Stack>
                        <hr className="mt-1"/>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default All_currencies;
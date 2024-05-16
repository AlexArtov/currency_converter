import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, FloatingLabel, Row, Stack} from "react-bootstrap";
import FormSelectCurrensy from "./FormSelectCurrensy";
import Loader from "./Loader";

function AllCurrencies({value, mainCurrensyValue, setError}) {
    const [baseCurrencyForAll, setBaseCurrencyForAll] = useState(mainCurrensyValue);
    const [CurrensyForAll, setCurrensyForAll] = useState({})
    const CurrensyKeysArray = Object.keys(CurrensyForAll);
    const [loading, setLoading] = useState(true);

    const urlForAll =`https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.REACT_APP_API_KEY}&currencies=EUR%2CUSD%2CJPY%2CBGN%2CCZK%2CDKK%2CGBP%2CHUF%2CPLN%2CRON%2CSEK%2CCHF%2CISK%2CNOK%2CHRK%2CRUB%2CTRY%2CAUD%2CBRL%2CCAD%2CCNY%2CHKD%2CIDR%2CILS%2CINR%2CKRW%2CMXN%2CMYR%2CNZD%2CPHP%2CSGD%2CTHB%2CZAR&base_currency=${baseCurrencyForAll}`
    const base_currencyHandleChangerForAll = (event) => {
        setBaseCurrencyForAll(event.target.value)
    };

    const searchQuantityForAll = () => {
        setTimeout(() => {
        axios.get(urlForAll).then((response) =>{
            setCurrensyForAll(response.data.data)
        })
        .catch(error => {
                if (error.response && error.response.status === 429) {
                    setError('Слишком много запросов. Пожалуйста, подождите ');
                } else {
                    // Обработка других ошибок
                    console.error('Ошибка:', error.message);
                    setTimeout(()=> {
                        setError(null)
                        searchQuantityForAll()
                    },60000)
                };
        });
        setLoading(false)
        }, 500);
    };

    useEffect(() => {
    searchQuantityForAll()
    }, [baseCurrencyForAll]);

    useEffect(() => {
        setBaseCurrencyForAll(mainCurrensyValue)
    }, [mainCurrensyValue]);

    return (
        <Container>
            <h2 className="my-3">Список всех валют</h2>
            <Row className='mb-3'>
                <Col xs={3}>
                    <FloatingLabel controlId="floatingSelect" label="Из" value={baseCurrencyForAll} onChange={base_currencyHandleChangerForAll}>
                        <FormSelectCurrensy value={value} baseValue={baseCurrencyForAll}/>
                    </FloatingLabel>
                </Col>
            </Row>
            <h3 className="my-3">Курсы валют</h3>
            {loading ? <Loader /> :
                <Row>
                    {CurrensyKeysArray.reduce((acc, key, index) => {
                        const chunkIndex = Math.floor(index / 11);
                        if (!acc[chunkIndex]) {
                            acc[chunkIndex] = [];
                        }
                        acc[chunkIndex].push(
                            <React.Fragment key={index}>
                                <Stack direction="horizontal">
                                    <div className="pb-2">{key} - {value[key].name}</div>
                                    <div className="ms-auto">{CurrensyForAll[key]}</div>
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
            }
        </Container>
    );
};

export default AllCurrencies;


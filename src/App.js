import React, {useState} from "react";
import {
    Routes,
    Route,
    Link
} from "react-router-dom"
import Converter from "./conmponents/Converter";
import All_currencies from "./conmponents/All_currencies";
import {Button, ButtonGroup, Col, Container, Placeholder, Row, Stack, Toast} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <div className="app">
            <nav className="navigation">
                <Container>
                    <ButtonGroup direction="horizontal" gap={3}>
                        <Button type="radio" variant="outline-dark" href="/">Конвертер Валют</Button>
                        <Button type="radio" variant="outline-dark" href="/about" >Все валюты</Button>
                    </ButtonGroup>
                </Container>
            </nav>
            <Container maxWidth="lg">
            <Routes>
                <Route path="/" exact  element={<Converter/>}></Route>
                <Route path="/about"  element={<All_currencies/>}></Route>
            </Routes>
            </Container>

        </div>

    );
}

export default App;




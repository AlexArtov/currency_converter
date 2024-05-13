import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom"
import Converter from "./components/Converter";
import All_currencies from "./components/All_currencies";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <div className="app">
            <nav className="navigation">
                <Container>
                    <ButtonGroup direction="horizontal" gap={3}>
                        <Button type="radio" variant="outline-dark" href="/currency_converter/">Конвертер Валют</Button>
                        <Button type="radio" variant="outline-dark" href="/currency_converter/about" >Все валюты</Button>
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




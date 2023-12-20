import React, {useContext} from 'react';
import {LandingCard} from "../components/LandingCard";
import '../styles/Landing.css'
import categories from '../resources/categories.json'
import {Col, Row} from "react-bootstrap";
import logo from '../resources/logo.svg';
import {DarkLightButton} from "../components/DarkLightButton";
import {StoreContext} from "../context/StoreContext";

// Vista de página de inicio
export const Landing = () => {
    const {isLight} = useContext(StoreContext);

    return (
        <div className="landing-page">
            <img className={`${isLight ? 'landing-logo-light' : 'landing-logo-dark'}`} src={logo} alt="Bassmania"/>
            <p className="landing-subtitle"><i>Donde las bajas frecuencias toman forma</i></p>
            <Row xs={1} md={3} className="g-3">
                {categories.map((category, index) => (
                    <Col key={index}>
                        <LandingCard
                            key={index}
                            name={category.name}
                            description={category.description}
                            img={category.img}
                            uri={category.uri}
                        />
                    </Col>
                ))}
            </Row>
            <DarkLightButton/>
        </div>
    );
}
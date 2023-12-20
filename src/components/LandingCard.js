import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../styles/LandingCard.css'


// Componente de tarjeta de acceso a categorías de la tienda
export const LandingCard = ({name, description, img, uri}) => {
    return (
        <Card as={Link} to={uri} className="category-card">
            <Card.Img className="categoryImg" variant="bottom" src={img} alt={name}/>
            <Card.ImgOverlay>
                <Card.Title className="category-title">
                    <h2>{name}</h2>
                </Card.Title>
            </Card.ImgOverlay>
            <Card.Footer>
                <Card.Text className="text-muted">
                    {description}
                </Card.Text>
            </Card.Footer>
        </Card>
    );
}
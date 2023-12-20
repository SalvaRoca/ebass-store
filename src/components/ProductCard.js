import React, {useContext} from "react";
import {createSearchParams, Link} from "react-router-dom";
import {Card, ListGroup} from "react-bootstrap";
import '../styles/ProductCard.css'
import {StoreContext} from "../context/StoreContext";

// Componente de tarjeta de producto para mostrar en vista general de productos
export const ProductCard = ({product}) => {
    const {setShow, setSelectedProduct} = useContext(StoreContext);

    const handleShow = () => {
        setShow(true);
        setSelectedProduct(product);
    }

    return (
        <Card className="product-card">
            <Card.Img variant="top" src={product.img}/>
            <Card.Body>
                <Card.Title>{product.brand}</Card.Title>
                <Card.Subtitle>{product.name}</Card.Subtitle>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <Link to={{
                            search: `?${createSearchParams({
                                productRef: product.productRef
                            })}`
                        }} className="details-btn" onClick={handleShow}>
                            Ver detalles
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item><b>Precio: {product.price} €</b></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}


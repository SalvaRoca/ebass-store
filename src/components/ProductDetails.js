import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import '../styles/ProductDetails.css'
import {StoreContext} from "../context/StoreContext";
import {Modal} from "react-bootstrap";

// Componente de detalle de producto como ventana emergente
export const ProductDetails = () => {
    const navigate = useNavigate();
    const {show, setShow, selectedProduct, setSelectedProduct, cart, setCart} = useContext(StoreContext);

    const handleClose = () => {
        setShow(false);
        setSelectedProduct({});
        navigate(window.location.pathname);
    }

    const addToCart = () => {
        const tempCart = [...cart, selectedProduct];
        setCart(tempCart);
        handleClose();
    }

    // Devuelve el componente solo si selectedProduct existe
    return selectedProduct && (
        <Modal show={show} scrollable={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.brand} {selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="product-image" src={selectedProduct.img} alt="product"/>
                {selectedProduct.description}
                <h3 className="price-field">Precio: {selectedProduct.price} €</h3>
            </Modal.Body>
            <Modal.Footer className="product-details-footer">
                <div className="product-ref">Referencia de producto: {selectedProduct.productRef}</div>
                <button className="add-to-cart-btn" onClick={addToCart}>
                    <i className="bi bi-cart-plus"></i> Añadir al Carrito
                </button>
            </Modal.Footer>
        </Modal>
    );
}
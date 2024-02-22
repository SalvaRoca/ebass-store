import React, {useContext, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import '../styles/ProductDetails.css'
import {StoreContext} from "../context/StoreContext";
import {Modal} from "react-bootstrap";

// Componente de detalle de producto como ventana emergente
export const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {show, setShow, selectedProduct, setSelectedProduct, cart, setCart} = useContext(StoreContext);

    const handleClose = () => {
        setShow(false);
        setSelectedProduct({});
        navigate(location.pathname);
    }

    const addToCart = () => {
        const tempCart = [...cart, selectedProduct.productRef];
        setCart(tempCart);
        handleClose();
    }

    // EventListener que detecta cuándo el usuario navega hacia atrás con su navegador, para que tenga el mismo efecto que cerrar el modal
    useEffect(() => {
        window.addEventListener('popstate', handleClose);

        return () => {
            window.removeEventListener('popstate', handleClose);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Devuelve el componente solo si selectedProduct existe
    return selectedProduct && (
        <Modal show={show} scrollable={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.brand} {selectedProduct.model}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="product-image" src={selectedProduct.img} alt="product"/>
                {selectedProduct.description}
                <h3 className="price-field">Precio: {selectedProduct.price} €</h3>
            </Modal.Body>
            <Modal.Footer className="product-details-footer">
                <div className="product-ref">Referencia de producto: {selectedProduct.productRef}</div>
                {cart.some(item => item === selectedProduct.productRef) ? (
                    <button disabled className="btn btn-secondary">
                        <i className="bi bi-cart-check"></i> Ya está en tu carrito
                    </button>
                ) : (
                    <button className="add-to-cart-btn" onClick={addToCart}>
                        <i className="bi bi-cart-plus"></i> Añadir al Carrito
                    </button>
                )}
            </Modal.Footer>
        </Modal>
    );
}
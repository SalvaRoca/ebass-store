import React, {useContext} from "react";
import '../styles/CartButton.css'
import {Link} from "react-router-dom";
import {StoreContext} from "../context/StoreContext";

// Componente de botón flotante para acceder al carrito
export const CartButton = () => {
    const {cart} = useContext(StoreContext);

    return (
        <Link to="/cart" className="cart-button">
            <i className="bi bi-cart"></i>
            <span> Carrito ({cart.length})</span>
        </Link>
    );
}
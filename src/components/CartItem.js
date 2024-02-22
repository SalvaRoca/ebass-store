import React, {useEffect, useRef, useState, useContext} from "react";
import '../styles/CartItem.css'
import {Button, Spinner} from "react-bootstrap";
import {StoreContext} from "../context/StoreContext";

export const CartItem = ({productRef, updateOrderTotal}) => {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {cart, setCart} = useContext(StoreContext);
    const isMounted = useRef(false);

    // Método para hacer fetch a la API de Productos según su referencia
    const fetchProductsByProductRef = async (productRef) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://spring-cloud-gateway-filters-production.up.railway.app/ms-store-products/api/v1/products/${productRef}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "targetMethod": "GET"
                })
            });
            setIsLoading(false);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    // Método para eliminar un producto del carrito
    const removeItem = (productRef) => {
        const updatedCart = cart.filter(item => item !== productRef);
        setCart(updatedCart);
        updateOrderTotal(-product.price);
    }

    useEffect(() => {
        if (isMounted.current) {
            fetchProductsByProductRef(productRef).then(product => {
                setProduct(product);
                updateOrderTotal(product.price);
            });
        } else {
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isLoading ? (
        <tr>
            <td colSpan="5" className="text-center"><Spinner animation="grow" size="sm"/> Cargando detalles del
                producto...
            </td>
        </tr>
    ) : (
        <tr>
            <td className="cart-item-sm-td"><img className="cart-item-img" src={product.img} alt={product.productRef}/>
            </td>
            <td className="cart-item-sm-td">{product.productRef}</td>
            <td className="cart-item-ref-td">{product.brand} {product.model}</td>
            <td className="cart-item-sm-td">{product.price} €</td>
            <td className="cart-item-sm-td">
                <Button variant="outline-danger" onClick={() => removeItem(productRef)}>
                    <i className="bi bi-cart-x-fill"></i>
                </Button></td>
        </tr>
    );
}
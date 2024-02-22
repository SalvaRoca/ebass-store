import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {StoreContext} from "../context/StoreContext";
import '../styles/Cart.css'
import {CartItem} from "../components/CartItem";
import {Button, Modal, Spinner, Table} from "react-bootstrap";

// Vista de carrito
export const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {cart, setCart, orderTotal, setOrderTotal, setOrderConfirm, setOrderCancel} = useContext(StoreContext);
    const navigate = useNavigate();

    // Método para realizar un pedido a través de la API de Pedidos
    const fetchPlaceOrder = async (cart) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ms-store-orders/api/v1/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "targetMethod": "POST",
                    "body": {
                        "products": cart
                    }
                })
            });
            setIsLoading(false);
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    }

    const updateOrderTotal = (productPrice) => {
        setOrderTotal(orderTotal => orderTotal + productPrice);
    }

    // Al realizar pedido, muestra una ventana de carga, añade referencia y timestamp, registra el pedido, vacía el
    // carrito, oculta la ventana de carga y redirige a la vista de pedidos realizados
    const placeOrder = () => {
        fetchPlaceOrder(cart).then((order) =>{
            setCart([]);
            setOrderConfirm(order.orderRef);
            setOrderCancel('');
            navigate("/orders");
        });
    }

    useEffect(() => {
        setOrderTotal(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="cart-page">
            <h1 className="cart-title">Carrito</h1>
            <div className="cart-list">
                {cart.length === 0 ? (
                    <div>
                        <p>¡Aquí no hay nada! Prueba a añadir artículos al carrito.</p>
                    </div>
                ) : (
                    <div>
                        <Table striped bordered hover className="align-middle">
                            <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Ref.</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map((productRef) => (<CartItem key={productRef} productRef={productRef} updateOrderTotal={updateOrderTotal}/>))}
                            </tbody>
                        </Table>
                        <h4 className="cart-total">Total: {orderTotal} €</h4>
                        <p>
                            <Button variant="success" size="lg" onClick={placeOrder}>
                                <i className="bi bi-cart-check"></i> Tramitar compra
                            </Button>
                        </p>
                        <p>
                            <Button variant="danger" size="sm"
                                    onClick={() => {
                                        setCart([]);
                                        setOrderTotal(0);
                                    }
                                }>
                                <i className="bi bi-trash3"></i> Vaciar carrito
                            </Button>
                        </p>
                    </div>
                )}
            </div>
            <Modal className="loading-modal" show={isLoading}>
                <Modal.Header>
                    Un momento, estamos procesando tu pedido...
                </Modal.Header>
                <Modal.Body>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Modal.Body>
            </Modal>
        </div>
    );
}
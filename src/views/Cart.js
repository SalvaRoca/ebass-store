import React, {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {StoreContext} from "../context/StoreContext";
import '../styles/Cart.css'
import {CartItem} from "../components/CartItem";
import {Button, Modal, Spinner, Table} from "react-bootstrap";

// Vista de carrito
export const Cart = () => {
    const [orderTotal, setOrderTotal] = useState();
    const {show, setShow, cart, setCart, orderList, setOrderList, setOrderConfirm, setOrderCancel} = useContext(StoreContext);
    const navigate = useNavigate();

    // Al realizar pedido, muestra una ventana de carga, añade referencia y timestamp, registra el pedido, vacía el
    // carrito, oculta la ventana de carga y redirige a la vista de pedidos realizados
    const placeOrder = () => {
        setShow(true);
        const orderDate = new Date();
        setTimeout(() => {
            const orderObj = {
                orderRef: 'PO-' + orderDate.getFullYear() + (orderDate.getMonth() + 1) + orderDate.getDate() + '-' + (orderList.length + 1),
                orderDate: orderDate,
                orderTotal: orderTotal,
                orderProducts: cart,
                orderStatus: "Confirmado"
            };
            const tempOrderList = [...orderList, orderObj];
            setOrderList(tempOrderList);
            setShow(false);
            setCart([]);
            setOrderConfirm(orderObj.orderRef);
            setOrderCancel('');
            navigate("/orders");
        }, 3000);
    }

    // Actualiza el total del carrito cada vez que se modifica
    useEffect(() => {
        setOrderTotal(cart.reduce((acc, product) => acc + product.price, 0));
    }, [cart]);

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
                            {cart.map((item, index) => (<CartItem key={index} product={item}/>))}
                            </tbody>
                        </Table>
                        <h4 className="cart-total">Total: {orderTotal} €</h4>
                        <p>
                            <Button variant="success" size="lg" onClick={placeOrder}>
                                <i className="bi bi-cart-check"></i> Tramitar compra
                            </Button>
                        </p>
                        <p>
                            <Button variant="danger" size="sm" onClick={() => setCart([])}>
                                <i className="bi bi-trash3"></i> Vaciar carrito
                            </Button>
                        </p>
                    </div>
                )}
            </div>
            <Modal className="loading-modal" show={show}>
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
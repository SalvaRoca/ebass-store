import React, {useContext, useEffect} from "react";
import '../styles/Orders.css'
import {StoreContext} from "../context/StoreContext";
import {Alert} from "react-bootstrap";
import {PurchaseOrder} from "../components/PurchaseOrder";

// Vista de pedidos realizados
export const Orders = () => {
    const { orderList, orderConfirm, setOrderConfirm, orderCancel, setOrderCancel } = useContext(StoreContext);

    // Si se ha realizado un pedido, mantiene mensaje de confirmación durante un minuto
    useEffect(() => {
        if (orderConfirm) {
            setTimeout(() => {
                setOrderConfirm(false);
            }, 60000);
        }
    }, [orderConfirm, setOrderConfirm]);

    // Si se ha cancelado un pedido, mantiene mensaje de cancelación durante un minuto
    useEffect(() => {
        if (orderCancel) {
            setTimeout(() => {
                setOrderCancel(false);
            }, 60000);
        }
    }, [orderCancel, setOrderCancel]);

    return (
        <div className="orders-page">
            <h1 className="orders-title">Pedidos</h1>
            <Alert className="order-alert" show={orderConfirm} variant="success">
                <Alert.Heading>¡Pedido {orderConfirm} confirmado!</Alert.Heading>
                Nos ponemos manos a la obra para que lo tengas cuanto antes.
            </Alert>
            <Alert className="order-alert" show={orderCancel} variant="danger">
                <Alert.Heading>Pedido {orderCancel} cancelado</Alert.Heading>
                Sentimos que no haya salido como esperabas.
            </Alert>
            <div className="orders-list">
                {orderList.length === 0 ? (
                    <div>
                        <p>Aún no has hecho ningún pedido, ¿a qué esperas para animarte?</p>
                    </div>
                ) : (
                    <div>
                        {orderList.map((order, index) => (
                            <p key={index}><PurchaseOrder order={order}/></p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
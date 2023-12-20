import React, {useContext, useEffect} from "react";
import '../styles/Orders.css'
import {StoreContext} from "../context/StoreContext";
import {Alert} from "react-bootstrap";
import {PurchaseOrder} from "../components/PurchaseOrder";

// Vista de pedidos realizados
export const Orders = () => {
    const { orderList, orderConfirm, setOrderConfirm } = useContext(StoreContext);

    // Si se ha realizado un pedido, mantiene mensaje de confirmación durante un minuto
    useEffect(() => {
        if (orderConfirm) {
            setTimeout(() => {
                setOrderConfirm(false);
            }, 60000);
        }
    }, [orderConfirm, setOrderConfirm]);

    return (
        <div className="orders-page">
            <h1 className="orders-title">Pedidos</h1>
            <Alert className="order-confirm-alert" show={orderConfirm} variant="success">
                <Alert.Heading>¡Pedido {orderConfirm} confirmado!</Alert.Heading>
                Nos ponemos manos a la obra para que lo tengas cuanto antes.
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
import React, {useContext, useEffect, useRef, useState} from "react";
import '../styles/Orders.css'
import {StoreContext} from "../context/StoreContext";
import {Alert, Spinner} from "react-bootstrap";
import {PurchaseOrder} from "../components/PurchaseOrder";

// Vista de pedidos realizados
export const Orders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const {orderConfirm, setOrderConfirm, orderCancel, setOrderCancel} = useContext(StoreContext);
    const isMounted = useRef(false);

    // Método para hacer fetch a la API de Pedidos
    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://spring-cloud-gateway-filters-production.up.railway.app/ms-store-orders/api/v1/orders/`, {
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

    useEffect(() => {
        if (isMounted.current) { // Evita que se duplique la petición al montar el componente
            fetchOrders().then(orderList => setOrderList(orderList));
        } else {
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        fetchOrders().then(orderList => {
            setOrderList(orderList);
            if (orderCancel) {
                setTimeout(() => {
                    setOrderCancel(false);
                }, 60000);
            }
        });
    }, [orderCancel, setOrderCancel]);

    return (
        <div className="orders-page">
            <h1 className="orders-title">Pedidos</h1>
            <Alert className="order-alert" show={orderConfirm !== ''} variant="success">
                <Alert.Heading>¡Pedido {orderConfirm} confirmado!</Alert.Heading>
                Nos ponemos manos a la obra para que lo tengas cuanto antes.
            </Alert>
            <Alert className="order-alert" show={orderCancel !== ''} variant="danger">
                <Alert.Heading>Pedido {orderCancel} cancelado</Alert.Heading>
                Sentimos que no haya salido como esperabas.
            </Alert>
            <div className="orders-list">
                {isLoading ? (
                    <div>
                        <p>Cargando los pedidos...</p>
                        <Spinner animation="border" role="status"/>
                    </div>
                ) : orderList.length === 0 ? (
                    <div>
                        <p>Aún no has hecho ningún pedido, ¿a qué esperas para animarte?</p>
                    </div>
                ) : (
                    <div>
                        {orderList.map((order, index) => (
                            <div key={order.orderRef}><PurchaseOrder order={order}/></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
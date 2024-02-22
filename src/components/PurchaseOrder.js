import React, {useContext, useState} from "react";
import {Badge, Button, Card, Modal, Table} from "react-bootstrap";
import '../styles/PurchaseOrder.css'
import {OrderItem} from "./OrderItem";
import {StoreContext} from "../context/StoreContext";

// Componente de pedido realizado para mostrar como tarjeta en la vista de pedidos
export const PurchaseOrder = ({order}) => {
    const orderDate = new Date(order.date);
    const weekday = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const month = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const [show, setShow] = useState(false);
    const {setOrderConfirm, setOrderCancel} = useContext(StoreContext);

    // Método para cancelar un pedido a través de la API de Pedidos
    const fetchCancelOrder = async (orderId) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/ms-store-orders/api/v1/orders/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "targetMethod": "PATCH",
                    "queryParams": {
                        "status": ["Cancelled"]
                    }
                })
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const cancelOrder = (order) => {
        console.log(order);
        fetchCancelOrder(order.id).then(() => {
            setOrderConfirm('');
            setOrderCancel(order.orderRef);
        });
    }

    return (
        <Card className="purchase-order-card">
            <Card.Header className="purchase-order-card-header">
                <div>Pedido # {order.orderRef}</div>
                <div className="purchase-order-datetime">
                    {weekday[orderDate.getDay()]}, {orderDate.getDate()} {month[orderDate.getMonth()]} {orderDate.getFullYear()}
                </div>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover className="align-middle">
                    <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Ref.</th>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.products.map((item, index) => (<OrderItem key={index} product={item}/>))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="3"><b>Total</b></td>
                        <td><b>{order.total} €</b></td>
                    </tr>
                    </tfoot>
                </Table>
            </Card.Body>
            <Card.Footer className="purchase-order-card-footer">
                {!(order.status === 'Cancelled') ? (
                    <>
                        <div>
                            Estado del pedido: <Badge bg="success">Confirmado</Badge>
                        </div>
                            <Button variant="danger" size="sm" onClick={() => setShow(true)}>
                                <i className="bi bi-clipboard2-x"></i> Cancelar pedido
                            </Button>
                    </>
                ) : (
                    <Badge bg="danger">Cancelado</Badge>
                )}
            </Card.Footer>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancelar pedido {order.orderRef}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres cancelar este pedido? Una vez hagas click, no habrá vuelta atrás.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={() => {
                        cancelOrder(order);
                        setShow(false);
                    }}>
                        Sí, cancelar pedido
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}


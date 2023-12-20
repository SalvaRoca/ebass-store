import React, {useState} from "react";
import {Badge, Button, Card, Modal, Table} from "react-bootstrap";
import '../styles/PurchaseOrder.css'
import {OrderItem} from "./OrderItem";
import {useCancelOrder} from "../hooks/useCancelOrder";

// Componente de pedido realizado para mostrar como tarjeta en la vista de pedidos
export const PurchaseOrder = ({order}) => {
    const orderDate = new Date(order.orderDate);
    const weekday = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const month = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const cancelOrder = useCancelOrder();
    const [show, setShow] = useState(false);

    return (
        <Card className="purchase-order-card">
            <Card.Header className="purchase-order-card-header">
                <div>Pedido # {order.orderRef}</div>
                <div className="purchase-order-datetime">
                    {weekday[orderDate.getDay()]}, {orderDate.getDate()} {month[orderDate.getMonth()]} {orderDate.getFullYear()} ({orderDate.toLocaleTimeString('es-ES', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })})
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
                    {order.orderProducts.map((item, index) => (<OrderItem key={index} product={item}/>))}
                    </tbody>
                </Table>
            </Card.Body>
            <Card.Footer className="purchase-order-card-footer">
                <div>Estado del pedido: <Badge bg={order.orderStatus === 'Cancelado' ? 'danger' : 'success'}>{order.orderStatus}</Badge></div>
                {!(order.orderStatus === 'Cancelado') && ( // Mostrar el botón solo si no está cancelado
                    <Button variant="danger" size="sm" onClick={() => setShow(true)}>
                        <i className="bi bi-clipboard2-x"></i> Cancelar pedido
                    </Button>
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


import React from "react";
import '../styles/OrderItem.css'

// Componente de producto incluido como fila de la tabla de pedido realizado
export const OrderItem = ({product}) => {
    return (
        <tr>
            <td className="order-item-sm-td"><img className="order-item-img" src={product.img} alt={product.productRef}/></td>
            <td className="order-item-sm-td">{product.productRef}</td>
            <td className="order-item-product-td">{product.brand} {product.model}</td>
            <td className="order-item-sm-td">{product.price} €</td>
        </tr>
    );
}
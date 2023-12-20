import React from "react";
import '../styles/CartItem.css'
import {Button} from "react-bootstrap";
import {useRemoveItem} from "../hooks/useRemoveItem";

export const CartItem = ({product}) => {
    const removeItem = useRemoveItem();

    return (
        <tr>
            <td className="cart-item-sm-td"><img className="cart-item-img" src={product.img} alt={product.productRef}/></td>
            <td className="cart-item-sm-td">{product.productRef}</td>
            <td className="cart-item-ref-td">{product.brand} {product.name}</td>
            <td className="cart-item-sm-td">{product.price} €</td>
            <td className="cart-item-sm-td">
                <Button variant="outline-danger" onClick={() => removeItem(product)}>
                    <i className="bi bi-cart-x-fill"></i>
                </Button></td>
        </tr>
    );
}
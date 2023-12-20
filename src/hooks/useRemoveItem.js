import {useContext} from "react";
import {StoreContext} from "../context/StoreContext";

// Custom hook para eliminar un producto del carrito
export const useRemoveItem = () => {
    const {cart, setCart} = useContext(StoreContext);

    return (productToRemove) => {
        const updatedCart = cart.filter(item => item !== productToRemove);
        setCart(updatedCart);
    };
}
import {useContext} from "react";
import {StoreContext} from "../context/StoreContext";

// Custom hook para cancelar un pedido
export const useCancelOrder = () => {
    const {orderList, setOrderList} = useContext(StoreContext);

    return (orderToCancel) => {
        const updatedOrderList = orderList.map(order => {
            if (order === orderToCancel) {
                return {...order, orderStatus: "Cancelado"};
            }
            return order;
        });
        setOrderList(updatedOrderList);
    };
};
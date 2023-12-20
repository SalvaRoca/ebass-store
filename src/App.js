import React, {useEffect, useState} from "react";
import {StoreContext} from "./context/StoreContext";
import {GlobalRouter} from "./router/GlobalRouter";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [orderList, setOrderList] = useState(() => JSON.parse(localStorage.getItem('orderList')) || [])
    const [orderConfirm, setOrderConfirm] = useState('');
    const [orderCancel, setOrderCancel] = useState('');
    const [isLight, setIsLight] = useState(() => JSON.parse(localStorage.getItem('isLight')) || false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('orderList', JSON.stringify(orderList));
    }, [orderList]);

    useEffect(() => {
        localStorage.setItem('isLight', JSON.stringify(isLight));
    }, [isLight]);

    useEffect(() => {
        document.querySelector('body').setAttribute('data-bs-theme', isLight ? 'light' : 'dark');
    })

    return (
        <div className="App">
            <StoreContext.Provider
                value={{
                    searchTerm, setSearchTerm,
                    show, setShow,
                    selectedProduct, setSelectedProduct,
                    cart, setCart,
                    orderList, setOrderList,
                    orderConfirm, setOrderConfirm,
                    orderCancel, setOrderCancel,
                    isLight, setIsLight
                }}>
                <GlobalRouter/>
            </StoreContext.Provider>
        </div>
    );
}

export default App;

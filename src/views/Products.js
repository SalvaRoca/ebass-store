import React, {useState, useEffect, useContext} from 'react';
import {useLocation} from "react-router-dom";
import {Col, Row} from 'react-bootstrap';
import '../styles/Products.css'
import {ProductCard} from '../components/ProductCard';
import {ProductDetails} from '../components/ProductDetails';
import {CartButton} from '../components/CartButton';
import basses from '../resources/basses.json';
import amps from '../resources/amps.json';
import fx from '../resources/fx.json';
import {StoreContext} from "../context/StoreContext";

// Vista general de productos por categorías o resultado de búsqueda
export const Products = () => {
    const location = useLocation();
    const {searchTerm, setSelectedProduct, setShow} = useContext(StoreContext);
    const [title, setTitle] = useState('');
    const [productList, setProductList] = useState([]);

    // Muestra resultados de búsqueda si hay texto en el buscador, de lo contrario muestra productos según URI
    useEffect(() => {
        switch (location.pathname) {
            case '/search':
                setTitle('Búsqueda');
                setProductList(
                    [...basses, ...amps, ...fx].filter((product) =>
                        searchTerm.toLowerCase().split(' ').every((word) =>
                            [
                                product.productRef.toLowerCase(),
                                product.brand.toLowerCase(),
                                product.name.toLowerCase()
                            ].some((field) => field.includes(word))
                        )
                    )
                );
                break;
            case '/basses':
                setTitle('Bajos');
                setProductList(basses);
                break;
            case '/amps':
                setTitle('Amplificadores');
                setProductList(amps);
                break;
            case '/fx':
                setTitle('Efectos');
                setProductList(fx);
                break;
            default:
                break;
        }
    }, [location.pathname, searchTerm]);

    // Muestra el modal de ProductDetails si en la URL existe un parámetro productRef válido
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const productRef = params.get('productRef');

        if (productRef) {
            const foundProduct = productList.find(product => product.productRef === productRef);
            setSelectedProduct(foundProduct);
            setShow(true);
        }
    }, [location.search, productList, setSelectedProduct, setShow]);

    return (
        <div className="products-page">
            <h1 className="products-title">{title}</h1>
            <div className="products-list">
                {productList.length === 0 ? (
                    <p>¡Lo sentimos! No hemos encontrado lo que buscas.</p>
                ) : (
                    <Row xs={1} md={5} className="g-1">
                        {productList.map((product, index) => (
                            <Col key={index}>
                                <ProductCard product={product}/>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
            <CartButton/>
            <ProductDetails/>
        </div>
    );
};
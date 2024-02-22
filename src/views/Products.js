import React, {useState, useContext, useEffect, useRef} from 'react';
import {useLocation} from "react-router-dom";
import {Col, Dropdown, Row, Spinner} from 'react-bootstrap';
import {Slider} from 'primereact/slider';
import '../styles/Products.css'
import {ProductCard} from '../components/ProductCard';
import {ProductDetails} from '../components/ProductDetails';
import {CartButton} from '../components/CartButton';
import {StoreContext} from "../context/StoreContext";

// Vista general de productos por categorías o resultado de búsqueda
export const Products = () => {
    const location = useLocation();
    const {title, setTitle, searchTerm, setSelectedProduct, setShow} = useContext(StoreContext);
    const [queryParams, setQueryParams] = useState({});
    const [productList, setProductList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [lowerPriceLimit, setLowerPriceLimit] = useState(0);
    const [upperPriceLimit, setUpperPriceLimit] = useState(0);
    const [lowerPriceLabel, setLowerPriceLabel] = useState(0);
    const [upperPriceLabel, setUpperPriceLabel] = useState(0);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [isLoadingBrands, setIsLoadingBrands] = useState(false);
    const [isLoadingPrices, setIsLoadingPrices] = useState(false);
    const [enableQuery, setEnableQuery] = useState(false);
    const isMounted = useRef(false);


    // Método para obtener productos de la API según queryParams
    const fetchProducts = async (queryParams) => {
        setIsLoadingProducts(true);
        try {
            const response = await fetch(`https://spring-cloud-gateway-filters-production.up.railway.app/ms-store-products/api/v1/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "targetMethod": "GET",
                    "queryParams": queryParams
                })
            });
            setIsLoadingProducts(false);
            const data = await response.json();
            return data.products;
        } catch (error) {
            console.error('Error:', error);
            setIsLoadingProducts(false);
        }
    };

    // Método para obtener marcas y número de productos de cada una de la API
    const fetchBrands = async (queryParams) => {
        setIsLoadingBrands(true);
        const brandQueryParams = {...queryParams, aggregate: ["brand"]};
        try {
            const response = await fetch(`https://spring-cloud-gateway-filters-production.up.railway.app/ms-store-products/api/v1/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "targetMethod": "GET",
                    "queryParams": brandQueryParams
                })
            });
            setIsLoadingBrands(false);
            const data = await response.json();
            return data.aggs;
        } catch (error) {
            console.error('Error:', error);
            setIsLoadingBrands(false);
        }
    };

    //Método para obtener precios mínimo y máximo de una lista de productos
    const fetchPrices = async (queryParams) => {
        setIsLoadingPrices(true);
        const priceQueryParams = {...queryParams, aggregate: ["price"]};
        try {
            const response = await fetch(`https://spring-cloud-gateway-filters-production.up.railway.app/ms-store-products/api/v1/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "targetMethod": "GET",
                    "queryParams": priceQueryParams
                })
            });
            setIsLoadingPrices(false);
            const data = await response.json();
            return data.aggs;
        } catch (error) {
            console.error('Error:', error);
            setIsLoadingPrices(false);
        }
    }

    // Al entrar a una categoría, mostrar los productos de esa categoría limpiando previamente los filtros
    useEffect(() => {
        if (isMounted.current) {
            let category;

            setEnableQuery(false); // Previene que se ejecuten más consultas de las necesarias a la API

            switch (location.pathname) {
                case '/basses':
                    setTitle('Bajos');
                    category = ['basses'];
                    break;
                case '/amps':
                    setTitle('Amplificadores');
                    category = ['amps'];
                    break;
                case '/fx':
                    setTitle('Efectos');
                    category = ['fx'];
                    break;
                default:
                    break;
            }

            let newState = {category};
            fetchBrands(newState).then(data => setBrandList(data));

            fetchPrices(newState).then(data => {
                if (data) {
                    setMinPrice(Math.floor(data[0].minPrice / 50) * 50);
                    setMaxPrice(Math.ceil(data[0].maxPrice / 50) * 50);
                    setLowerPriceLimit(Math.floor(data[0].minPrice / 50) * 50);
                    setUpperPriceLimit(Math.ceil(data[0].maxPrice / 50) * 50);
                    setLowerPriceLabel(Math.floor(data[0].minPrice / 50) * 50);
                    setUpperPriceLabel(Math.ceil(data[0].maxPrice / 50) * 50);
                }
            });

            setQueryParams(newState);
            setSelectedBrand(null);
        } else {
            isMounted.current = true;
        }
    }, [location.pathname, setTitle]);

    // Obtiene la lista de productos al montar el componente o al cambiar los parámetros de búsqueda
    useEffect(() => {
        if (isMounted.current) {
            if (Object.keys(queryParams).length > 0) {
                console.log("fetch");
                fetchProducts(queryParams).then(data => setProductList(data));
            }
        } else {
            isMounted.current = true;
        }
    }, [queryParams, enableQuery]);

    // Actualiza los límites de precio
    useEffect(() => {
        if (isMounted.current) {
            setQueryParams(prevState => ({
                ...prevState,
                minPrice: [lowerPriceLimit],
                maxPrice: [upperPriceLimit]
            }));
            setEnableQuery(true)
        } else {
            isMounted.current = true;
        }
    }, [lowerPriceLimit, upperPriceLimit]);

    // Actualiza los parámetros de búsqueda
    useEffect(() => {
        if (isMounted.current) {
            setQueryParams(prevState => ({
                ...prevState,
                description: [searchTerm]
            }));
        } else {
            isMounted.current = true;
        }
    }, [searchTerm]);

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
            <div className="products-banner">
                <div className="brands-dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="brands-dropdown">
                            <i className="bi bi-funnel"/>
                            {selectedBrand ? ` ${selectedBrand.key} (${selectedBrand.count})` : ' Filtrar por marca'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {isLoadingBrands ? (
                                <div>
                                    <p>Cargando las marcas...</p>
                                    <Spinner animation="grow" size="sm" role="status"/>
                                </div>
                            ) : (
                                <>
                                    {selectedBrand && (
                                        <Dropdown.Item
                                            onClick={() => {
                                                setQueryParams(prevState => {
                                                    delete prevState.brand;
                                                    return {...prevState};
                                                });
                                                setSelectedBrand(null);
                                            }}
                                        >
                                            <i className="bi bi-eraser"/>
                                            <i> Borrar filtro</i>
                                        </Dropdown.Item>
                                    )}
                                    {brandList.map((brand, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={() => {
                                                setQueryParams(prevState => ({
                                                    ...prevState,
                                                    brand: [brand.key]
                                                }));
                                                setSelectedBrand(brand);
                                            }}
                                        >
                                            {brand.key} ({brand.count})
                                        </Dropdown.Item>
                                    ))}
                                </>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h1 className="products-title">{title}</h1>
                <div className="slider-container">
                    <div className="slider-labels">
                        {isLoadingPrices ? (
                            <>

                                <div>
                                    <Spinner animation="grow" size="sm" role="status"/>
                                </div>
                                <div>
                                    <Spinner animation="grow" size="sm" role="status"/>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>{lowerPriceLabel} €</div>
                                <div>{upperPriceLabel} €</div>
                            </>
                        )}
                    </div>
                    <Slider
                        className={"price-slider"}
                        range={true}
                        step={10}
                        min={minPrice}
                        max={maxPrice}
                        value={[lowerPriceLabel, upperPriceLabel]}
                        onChange={(e) => {
                            setLowerPriceLabel(e.value[0]);
                            setUpperPriceLabel(e.value[1]);
                        }}
                        onSlideEnd={(e) => {
                            setLowerPriceLimit(e.value[0]);
                            setUpperPriceLimit(e.value[1]);
                        }}
                    />
                </div>
            </div>
            <div className="products-list">
                {isLoadingProducts ? (
                    <div>
                        <p>Cargando los resultados...</p>
                        <Spinner animation="border" role="status"/>
                    </div>
                ) : (productList.length === 0) ? (
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
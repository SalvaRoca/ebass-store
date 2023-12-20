import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Header} from "../components/Header";
import {Landing} from '../views/Landing';
import {Products} from "../views/Products";
import {Cart} from "../views/Cart";
import {Footer} from "../components/Footer";
import {Orders} from "../views/Orders";
import {DarkLightButton} from "../components/DarkLightButton";

export const GlobalRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/basses" element={<Layout><Products/></Layout>}/>
                <Route path="/amps" element={<Layout><Products/></Layout>}/>
                <Route path="/fx" element={<Layout><Products/></Layout>}/>
                <Route path="/search" element={<Layout><Products/></Layout>}/>
                <Route path="/cart" element={<Layout><Cart/></Layout>}/>
                <Route path="/orders" element={<Layout><Orders/></Layout>}/>
            </Routes>
        </BrowserRouter>
    );
}

const Layout = ({children}) => (
    <>
        <Header/>
        {children}
        <Footer/>
        <DarkLightButton/>
    </>
);

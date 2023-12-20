import {useContext, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import "../styles/Header.css"
import {Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {StoreContext} from '../context/StoreContext';
import logo from '../resources/logo.svg';


// Componente de barra de navegación en cabecera, incluyendo buscador de productos funcional
export const Header = () => {
    const [searchInput, setSearchInput] = useState('');
    const {setSearchTerm} = useContext(StoreContext);
    const navigate = useNavigate();

    const handleSearch = (term) => {
        const trimmedTerm = term ? term.trim() : ''; // Verifica que term tenga valor antes de aplicar trim()
        setSearchInput(term);
        setSearchTerm(trimmedTerm); // Actualiza el término de búsqueda en el contexto al realizar la búsqueda
        navigate('/search'); // Navega a la página de búsqueda
    };

    const handleMenuClick = () => {
        // Borra el contenido de la búsqueda
        setSearchTerm('');
        setSearchInput('');
        // Si se muestra navbar-collapse, lo oculta al hacer
        if (document.querySelector('.navbar-collapse').classList.contains('show')) {
            document.querySelector('.header-navbar-toggler').click();
        }
    }

    // Deshabilita el onSubmit de la barra de búsqueda
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Navbar data-bs-theme="dark" className="header-navbar position-sticky" expand="lg">
            <Link to="/" onClick={() => setSearchTerm('')}>
                <img className="header-logo" src={logo} alt="Bassmania"/>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="header-navbar-toggler"/>
            <Navbar.Collapse id="basic-navbar-nav" data-toggle="collapse" data-target=".navbar-collapse">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/basses" onClick={handleMenuClick}>Bajos</Link>
                    <Link className="nav-link" to="/amps" onClick={handleMenuClick}>Amplificadores</Link>
                    <Link className="nav-link" to="/fx" onClick={handleMenuClick}>Efectos</Link>
                </Nav>
                <NavDropdown className="nav-user-dropdown" title="¡Hola cliente!">
                    <NavDropdown.Item as={Link} to="/orders" onClick={handleMenuClick}>Pedidos</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item as={Link} to="/" onClick={handleMenuClick}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
                <Form data-bs-theme="light" className="d-flex search-form" onSubmit={onSubmit}>
                    <Nav.Item><i className="bi bi-search search-icon"></i></Nav.Item>
                    <FormControl
                        type="search"
                        placeholder="Busca en el catálogo..."
                        className="mr-2"
                        aria-label="Search"
                        value={searchInput}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};
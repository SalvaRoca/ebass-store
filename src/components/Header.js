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

    const clearSearch = () => {
        setSearchTerm('');
        setSearchInput('');
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
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/basses" onClick={clearSearch}>
                        Bajos
                    </Link>
                    <Link className="nav-link" to="/amps" onClick={clearSearch}>
                        Amplificadores
                    </Link>
                    <Link className="nav-link" to="/fx" onClick={clearSearch}>
                        Efectos
                    </Link>
                </Nav>
                <NavDropdown className="nav-user-dropdown" title="¡Hola cliente!">
                    <NavDropdown.Item as={Link} to="/orders">Pedidos</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item as={Link} to="/">Cerrar sesión</NavDropdown.Item>
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
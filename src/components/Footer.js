import React from "react";
import '../styles/Footer.css'

// Componente de pie de página
export const Footer = () => {
    return (
        <footer>
            <p>© 2023 Salva Roca <a href="https://github.com/SalvaRoca" target="_blank" rel="noreferrer">
                <i className="bi bi-github"></i></a>
            </p>
            <p className="unir-text">Creado para la asignatura Desarrollo Web Full Stack del <a
                href="https://www.unir.net/ingenieria/master-ingenieria-software/" target="_blank" rel="noreferrer">Máster
                Universitario en Ingeniería de Software y Sistemas Informáticos de la UNIR</a></p>
        </footer>
    );
}
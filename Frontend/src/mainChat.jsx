import React from 'react';
import ReactDOM from 'react-dom';
import AppChat from './app/AppChat'; // Reemplaza la ruta con la ubicación correcta
import './CssAdministracion.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <AppChat />
    </React.StrictMode>,
    document.getElementById('Chat') // Asegúrate de que el ID coincida con tu HTML
);
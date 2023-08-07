import React from 'react'
import ReactDOM from 'react-dom'
import AppCargarNotas from './app/AppCargarNotas.jsx' 
import './CssAdministracion.css'

ReactDOM.render(
    <React.StrictMode>
        <AppCargarNotas/>
    </React.StrictMode>,
    document.getElementById('CargarNotas')
)
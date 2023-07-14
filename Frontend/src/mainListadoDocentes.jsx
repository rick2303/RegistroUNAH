import React from 'react'
import ReactDOM from 'react-dom'
import AppListadoDocentes from './app/AppListadoDocentes.jsx' 
import './CssAdministracion.css'

ReactDOM.render(
    <React.StrictMode>
        <AppListadoDocentes/>
    </React.StrictMode>,
    document.getElementById('ListadoDocentes')
)
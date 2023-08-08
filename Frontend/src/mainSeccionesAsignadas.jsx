import React from 'react'
import ReactDOM from 'react-dom'
import AppSeccionesAsignadas from './app/AppSeccionesAsignadas.jsx' 
import './CssAdministracion.css'

ReactDOM.render(
    <React.StrictMode>
        <AppSeccionesAsignadas/>
    </React.StrictMode>,
    document.getElementById('SeccionesAsignadas')
)
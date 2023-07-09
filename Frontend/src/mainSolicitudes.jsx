import React from 'react'
import ReactDOM from 'react-dom'
import AppSolicitudesF from './app/AppSolicitudes.jsx' 
import './CssAdministracion.css'

ReactDOM.render(
  <React.StrictMode>
    <AppSolicitudesF />
  </React.StrictMode>,
  document.getElementById('solicitudes')
)
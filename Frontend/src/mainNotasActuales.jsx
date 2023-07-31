import React from 'react'
import ReactDOM from 'react-dom'
import AppNotasActuales from './app/AppNotasActuales.jsx' 
import './CssAdministracion.css'

ReactDOM.render(
    <React.StrictMode>
      <AppNotasActuales />
    </React.StrictMode>,
    document.getElementById('NotasActuales')
  )
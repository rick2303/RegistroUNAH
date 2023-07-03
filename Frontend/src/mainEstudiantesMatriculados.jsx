import React from 'react'
import ReactDOM from 'react-dom'
import EstudiantesMatriculados from './app/AppEstMatriculados.jsx' 
import './CssAdministracion.css'


console.log("Hello World from mainEstudiantesMatriculados.jsx!");
ReactDOM.render(
    <React.StrictMode>
        <EstudiantesMatriculados/>
    </React.StrictMode>,
    document.getElementById('historial')
)
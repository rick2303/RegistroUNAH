import React from 'react'
import ReactDOM from 'react-dom'
import EstudiantesFiltradosMatriculados from './app/AppFiltradoMatriculado.jsx' 
import './CssAdministracion.css'


console.log("Hello World from mainEstudiantesMatriculados.jsx!");
ReactDOM.render(
    <React.StrictMode>
        <EstudiantesFiltradosMatriculados/>
    </React.StrictMode>,
    document.getElementById('historial')
)
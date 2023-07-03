import '../App.css'
import Navbar from "../components/Navbar.jsx";
import EstudiantesMatriculadosMain from "../components/EstudiantesMatri.jsx";
import EspacioBotonFiltradoDepartamento from "../components/EstFiltradosMatri.jsx";

function EstudiantesMatriculados() {

    return (
    <>
        <Navbar /> 
        <EspacioBotonFiltradoDepartamento/>
        <EstudiantesMatriculadosMain/> 
    </>
    )
}

export default EstudiantesMatriculados;
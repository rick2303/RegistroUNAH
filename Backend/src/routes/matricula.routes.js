import { Router } from 'express';
import {seccionesMatricula, asignturaClase, mostrarSeccionesMatricula, obtenerCupos, verificarConflictosHorarios, verificarSiYaTieneLaClaseMatriculada, matricularClase, obtenerUVS, updateUVS, obtenerFechasMatricula, obtenerFechasCancelaciones, restriccionCambioCentro, obtenerReposiciones} from "../controllers/matricula.controllers"

const routerMatricula = Router();

routerMatricula.post('/ClasesParaMatricula',seccionesMatricula);

routerMatricula.post('/AsignaturaParaMatricula',asignturaClase)

routerMatricula.post('/MostrarSeccionesMatricula',mostrarSeccionesMatricula)

routerMatricula.post('/verificarCupos', obtenerCupos)

routerMatricula.post('/verificarConflicto', verificarConflictosHorarios);

routerMatricula.post('/verificarClaseMatriculaONo', async (req, res) => {
    try {
    const { IdEstudiante,IdClase } = req.body;
    const totalConflicts = await verificarSiYaTieneLaClaseMatriculada(IdEstudiante, IdClase);
    console.log(totalConflicts);
    res.json({ totalConflicts });
    } catch (error) {
        console.error("Error al verificar conflictos de horarios:", error);
        res.status(500).json({ message: "Error al verificar conflictos de horarios" });
    }
});

routerMatricula.post('/MatricularClase',matricularClase); 

routerMatricula.post('/ObtenerUVS',obtenerUVS);

routerMatricula.post('/actualizarUVS', updateUVS)

routerMatricula.post('/ObtenerFechasMatricula',obtenerFechasMatricula);

routerMatricula.post('/ObtenerFechasCancelaciones',obtenerFechasCancelaciones);

routerMatricula.post('/RestriccionCambioCentro', restriccionCambioCentro);

routerMatricula.post('/SolicitudesReposicion', obtenerReposiciones);


export default routerMatricula;

import {Router} from 'express';
import { getConnection } from '../Database';
import { obtenerCarerras, obtenerInfoEstudent, solicitudSubidaEstudiante, ObtenerSoliSubidaEstudiante, EliminarsolicitudSubidaEstudiante, ObtenerSoliCambioCarreraCoordinador, EnviarDictamenCambioCarrera, actualizarCarreraEstudiante } from '../controllers/cambioCarerra.controllers.js';

const routerCambioCarrera = Router();

routerCambioCarrera.get('/carreras', obtenerCarerras);

routerCambioCarrera.post('/obtenerInfoEstudiant', obtenerInfoEstudent);

routerCambioCarrera.post('/ObtenerSolicitudCambioCarrera', ObtenerSoliSubidaEstudiante);

routerCambioCarrera.post('/subirSolicitudCambioCarrera', solicitudSubidaEstudiante);

routerCambioCarrera.post('/eliminarSolicitudCambioCarrera', EliminarsolicitudSubidaEstudiante);

// PARA COORDINADOR

routerCambioCarrera.post('/ObtenerSolicitudesCambioCarreraCoordinador', ObtenerSoliCambioCarreraCoordinador);

routerCambioCarrera.post('/EnviarDictamenCambioCarrera', EnviarDictamenCambioCarrera);

routerCambioCarrera.post('/realizarCambioDeCarrera', actualizarCarreraEstudiante);

export default routerCambioCarrera;
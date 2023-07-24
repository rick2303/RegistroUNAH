import {Router} from 'express';
import { getConnection } from '../Database';
import { obtenerCarerras, obtenerInfoEstudent, solicitudSubidaEstudiante, ObtenerSoliSubidaEstudiante, EliminarsolicitudSubidaEstudiante} from '../controllers/cambioCarerra.controllers.js';

const routerCambioCarrera = Router();

routerCambioCarrera.get('/carreras', obtenerCarerras);

routerCambioCarrera.post('/obtenerInfoEstudiant', obtenerInfoEstudent);

routerCambioCarrera.post('/ObtenerSolicitudCambioCarrera', ObtenerSoliSubidaEstudiante);

routerCambioCarrera.post('/subirSolicitudCambioCarrera', solicitudSubidaEstudiante);

routerCambioCarrera.post('/eliminarSolicitudCambioCarrera', EliminarsolicitudSubidaEstudiante);

export default routerCambioCarrera;
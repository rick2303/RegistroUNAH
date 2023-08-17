import { Router } from 'express';
import {obtenerNumeroMatriculados, obtenerNumeroEspera, obtenerNumeroSecciones, obtenerNumeroDocentes, obtenerGrafica1} from "../controllers/estadisticas.controllers"

const routerEstadisticas = Router();


routerEstadisticas.post('/obtenerNumeroMatriculados', obtenerNumeroMatriculados);

routerEstadisticas.post('/obtenerNumeroEspera', obtenerNumeroEspera);

routerEstadisticas.post('/obtenerNumeroSecciones', obtenerNumeroSecciones);

routerEstadisticas.post('/obtenerNumeroDocentes', obtenerNumeroDocentes);

routerEstadisticas.post('/obtenerGraficaClases', obtenerGrafica1);

export default routerEstadisticas;

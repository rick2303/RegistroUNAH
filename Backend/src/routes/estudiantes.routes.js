import {Router} from 'express';
import { ingresarEvaluacionesDocentes } from '../controllers/estudiantes.controllers';

const routerEstudiante = Router();

//Ruta para registrar evaluación de docente por estudiante (POST)
routerEstudiante.post('/subirEvaluacionDocente', ingresarEvaluacionesDocentes)

export default routerEstudiante;
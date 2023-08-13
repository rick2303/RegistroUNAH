import {Router} from 'express';
import { ingresarEvaluacionesDocentes } from '../controllers/estudiantes.controllers';
import { informarNotas } from '../controllers/enviarCorreos.controllers';

const routerEstudiante = Router();

//Ruta para registrar evaluación de docente por estudiante (POST)
routerEstudiante.post('/subirEvaluacionDocente', ingresarEvaluacionesDocentes)

routerEstudiante.post('/informarNotas', informarNotas)
export default routerEstudiante;
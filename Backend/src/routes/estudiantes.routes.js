import {Router} from 'express';
import { existenciaEvaluacion, ingresarEvaluacionesDocentes } from '../controllers/estudiantes.controllers';
import { informarNotas } from '../controllers/enviarCorreos.controllers';

const routerEstudiante = Router();

//Ruta para registrar evaluación de docente por estudiante (POST)
routerEstudiante.post('/subirEvaluacionDocente', ingresarEvaluacionesDocentes)

routerEstudiante.post('/informarNotas', informarNotas)

routerEstudiante.post('/existenciaEvaluacion', existenciaEvaluacion)

export default routerEstudiante;
import { Router } from "express";
import { historialAcademico, historialAcademicoPrueba } from "../controllers/estudiantes.historial.controllers";

const routerhistorial = Router();

routerhistorial.post('/historial', historialAcademico);
//routerhistorial.get('/historiales', historialAcademicoPrueba)
export default routerhistorial;
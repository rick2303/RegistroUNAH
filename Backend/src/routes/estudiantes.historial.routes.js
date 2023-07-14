import { Router } from "express";
import { historialAcademico,historialPDF} from "../controllers/estudiantes.historial.controllers";

const routerhistorial = Router();

routerhistorial.post('/historial', historialAcademico);
routerhistorial.post('/historialPDF/:id', historialPDF);
//routerhistorial.get('/historiales', historialAcademicoPrueba)
export default routerhistorial;
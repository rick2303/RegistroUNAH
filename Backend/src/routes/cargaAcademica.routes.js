
import { Router } from "express";
import { cargaAcademicaPDF,cargaAcademicaEXCEL} from "../controllers/cargaAcademica.controllers";

const routerCargaAcademica = Router();

routerCargaAcademica.post('/cargaAcademicaPDF', cargaAcademicaPDF);
routerCargaAcademica.post('/cargaAcademicaEXCEL', cargaAcademicaEXCEL);

export default routerCargaAcademica;
import { Router } from 'express';
import {secciones,traerClases,traerDocentes,crearSeccion,getAulas,deleteSeccion,agregarCupos} from "../controllers/secciones.controllers"

const routerMatricula = Router();

routerMatricula.get('/secciones',secciones);



export default routerMatricula;
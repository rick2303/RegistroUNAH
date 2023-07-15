import { Router } from 'express';
import { getConnection, querys, sql } from "../Database";
import {secciones,traerClases,traerDocentes,crearSeccion,getAulas} from "../controllers/secciones.controllers"

const routerSecciones = Router();

routerSecciones.post('/secciones',secciones);

routerSecciones.post('/TraerClases',traerClases);

routerSecciones.post('/TraerDocentes', traerDocentes);

routerSecciones.post('/crearSeccion', crearSeccion);

routerSecciones.get('/Aulas/:id', getAulas);

export default routerSecciones;
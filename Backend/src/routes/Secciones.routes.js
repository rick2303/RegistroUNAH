import { Router } from 'express';
import { getConnection, querys, sql } from "../Database";
import {secciones,traerClases,traerDocentes,crearSeccion,getAulas,deleteSeccion,agregarCupos} from "../controllers/secciones.controllers"

const routerSecciones = Router();

routerSecciones.post('/secciones',secciones);

routerSecciones.post('/TraerClases',traerClases);

routerSecciones.post('/TraerDocentes', traerDocentes);

routerSecciones.post('/crearSeccion', crearSeccion);

routerSecciones.get('/Aulas/:id', getAulas);

routerSecciones.delete('/seccionEliminar/:id', deleteSeccion);

routerSecciones.put('/agregarCupos/:id', agregarCupos);

export default routerSecciones;
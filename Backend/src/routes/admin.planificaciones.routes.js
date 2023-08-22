import {Router} from 'express';
import { EliminarCancelacionesExcepcionales, EliminarMatricula, EliminarPlanificacion, EliminarFechaNotas, pagarTodo, validacionJefe, validacionCoordi } from '../controllers/admin.controllers';

const routerAdmin = Router();


routerAdmin.post('/EliminarPlanificacion', EliminarPlanificacion);
routerAdmin.post('/EliminarMatricula', EliminarMatricula);
routerAdmin.post('/EliminarFechaNotas', EliminarFechaNotas);
routerAdmin.post('/EliminarCancelacionesExcepcionales', EliminarCancelacionesExcepcionales);
routerAdmin.post('/simularPago', pagarTodo);
routerAdmin.post('/jefeDepto', validacionJefe)
routerAdmin.post('/coordiDepto', validacionCoordi)


export default routerAdmin;
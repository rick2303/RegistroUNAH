import {Router} from 'express';
import { EliminarCancelacionesExcepcionales, EliminarMatricula, EliminarPlanificacion, EliminarFechaNotas, pagarTodo } from '../controllers/admin.controllers';

const routerAdmin = Router();


routerAdmin.post('/EliminarPlanificacion', EliminarPlanificacion);
routerAdmin.post('/EliminarMatricula', EliminarMatricula);
routerAdmin.post('/EliminarFechaNotas', EliminarFechaNotas);
routerAdmin.post('/EliminarCancelacionesExcepcionales', EliminarCancelacionesExcepcionales);
routerAdmin.post('/simularPago', pagarTodo);


export default routerAdmin;
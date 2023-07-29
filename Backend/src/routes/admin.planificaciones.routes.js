import {Router} from 'express';
import { EliminarCancelacionesExcepcionales, EliminarMatricula, EliminarPlanificacion, EliminarFechaNotas } from '../controllers/admin.controllers';

const routerAdmin = Router();


routerAdmin.post('/EliminarPlanificacion', EliminarPlanificacion);
routerAdmin.post('/EliminarMatricula', EliminarMatricula);
routerAdmin.post('/EliminarFechaNotas', EliminarFechaNotas);
routerAdmin.post('/EliminarCancelacionesExcepcionales', EliminarCancelacionesExcepcionales);


export default routerAdmin;
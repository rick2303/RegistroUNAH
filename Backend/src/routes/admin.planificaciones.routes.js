import {Router} from 'express';
import { EliminarCancelacionesExcepcionales, EliminarMatricula, EliminarPlanificacion } from '../controllers/admin.controllers';

const routerAdmin = Router();


routerAdmin.post('/EliminarPlanificacion', EliminarPlanificacion);
routerAdmin.post('/EliminarMatricula', EliminarMatricula);
routerAdmin.post('/EliminarCancelacionesExcepcionales', EliminarCancelacionesExcepcionales);


export default routerAdmin;
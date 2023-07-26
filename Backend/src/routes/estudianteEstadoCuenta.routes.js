import {Router} from 'express';
import { obtenerEstadoCuenta } from '../controllers/estudianteEstadoCuenta.controllers';

const routerEstado = Router();

routerEstado.get('/estadoCuenta/:id', obtenerEstadoCuenta)

export default routerEstado
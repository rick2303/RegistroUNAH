import {Router} from 'express';
import { obtenerEstadoCuenta, crearSolicitudReposicion, existenciaSolicitudMatricula, existenciaSolicitudReposicion } from '../controllers/estudianteEstadoCuenta.controllers';

const routerEstado = Router();

routerEstado.post('/estadoCuenta', obtenerEstadoCuenta)
routerEstado.post('/subirSolicitud', crearSolicitudReposicion)
//routerEstado.get('/existenciaSolicitudMatricula', existenciaSolicitudMatricula)
routerEstado.get('/existenciaSolicitudReposicion', existenciaSolicitudReposicion)


export default routerEstado
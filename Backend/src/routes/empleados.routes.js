import {Router} from 'express';

import {getDocentes,registrarDocente} from '../controllers/empleados.controllers';

const routerEmpleados = Router();

routerEmpleados.get('/docentes', getDocentes);

routerEmpleados.post('/registrarDocentes', registrarDocente);

export default routerEmpleados;
import {Router} from 'express';

import {getDocentes,registrarDocente,actualizarDocente} from '../controllers/empleados.controllers';

const routerEmpleados = Router();

routerEmpleados.get('/docentes', getDocentes);

routerEmpleados.post('/registrarDocentes', registrarDocente);

routerEmpleados.put('/actualizarDocente/:id', actualizarDocente);

export default routerEmpleados;
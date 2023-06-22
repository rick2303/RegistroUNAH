import {Router} from 'express';

import {getDocentes,registrarDocente} from '../controllers/empleados.controllers';

const router = Router();

router.get('/docentes', getDocentes);

export default router;
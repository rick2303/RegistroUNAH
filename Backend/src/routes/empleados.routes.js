import {Router} from 'express';

import {getDocentes,registrarDocente,loginUsuarios} from '../controllers/empleados.controllers';

const router = Router();

router.get('/docentes', getDocentes);

router.post('/registrarDocentes', registrarDocente);

router.post('/login',loginUsuarios)

export default router;
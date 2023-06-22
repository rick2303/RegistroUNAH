import {Router} from 'express';

import {getDocentes} from '../controllers/empleados.controllers';

const router = Router();

router.get('/docentes', getDocentes);

export default router;
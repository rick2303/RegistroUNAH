import {Router} from 'express';

import {getUsuarios} from '../controllers/usuarios.controllers';

const router = Router();

router.get('/usuarios', getUsuarios);

export default router;
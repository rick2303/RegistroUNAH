import {Router} from 'express';

import {loginUsuarios} from '../controllers/login.controllers';

const router = Router();

router.post('/login',loginUsuarios)

export default router;
import {Router} from 'express';

import {getEstudiantes, createNewStudent} from '../controllers/usuarios.controllers';

const router = Router();

router.get('/students', getEstudiantes);

router.post("/students", createNewStudent);

console.log('router funcionando')


export default router;
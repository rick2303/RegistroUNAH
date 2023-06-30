import {Router} from 'express';

import {getEstudianteXperfil} from '../controllers/estudiantePerfil.controllers';

const routerEstudiantePerfil = Router();

routerEstudiantePerfil.get('/perfil', getEstudianteXperfil);

export default routerEstudiantePerfil;
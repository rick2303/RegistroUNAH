import {Router} from 'express';

import {paginaCoordinacion,paginaJefatura,paginaAdmin,paginaEstudianttes,paginaDocente} from '../controllers/redireccionamientos.controllers';

const routerDireccionamientos = Router();

routerDireccionamientos.get('/iswCoordinacion', paginaCoordinacion);

routerDireccionamientos.get('/iswJefatura',paginaJefatura);

routerDireccionamientos.get('/iswAdmin',paginaAdmin);

routerDireccionamientos.get('/iswEstudiantes',paginaEstudianttes);

routerDireccionamientos.get('/iswDocente',paginaDocente);



export default routerDireccionamientos;
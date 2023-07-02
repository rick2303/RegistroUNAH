import {Router} from 'express';
const multer = require('multer');
import {insertPerfilEmpleado,updatePerfilEmpleado} from '../controllers/EmpleadosPerfil';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directorio donde se guardarán las fotos
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Nombre único para la foto
    }
  });
  const upload = multer({ storage });

const routerEstudiantePerfil = Router();

routerEstudiantePerfil.post('/perfilEmpleado',upload.array('files', 3), insertPerfilEmpleado);

routerEstudiantePerfil.post('/perfilEmpleadoUpdate',upload.array('files', 3), updatePerfilEmpleado);

export default routerEstudiantePerfil;
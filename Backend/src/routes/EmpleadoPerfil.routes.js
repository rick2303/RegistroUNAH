import {Router} from 'express';
const multer = require('multer');
import path from 'path';
import {insertPerfilEmpleado,updatePerfilEmpleado} from '../controllers/EmpleadosPerfil';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = path.join(__dirname, '../../../Frontend/src/img/uploads');
      cb(null, destinationPath); // Directorio donde se guardarán las fotos
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = uniqueSuffix + '-' + file.originalname;
      cb(null, fileName);
    }
  });
  const upload = multer({ storage });

const routerEstudiantePerfil = Router();

routerEstudiantePerfil.post('/perfilEmpleado',upload.array('files', 3), insertPerfilEmpleado);

routerEstudiantePerfil.post('/perfilEmpleadoUpdate',upload.array('files', 3), updatePerfilEmpleado);

export default routerEstudiantePerfil;
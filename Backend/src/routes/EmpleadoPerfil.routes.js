import {Router} from 'express';
const multer = require('multer');
import path from 'path';
import {insertPerfilEmpleado,updatePerfilEmpleado, insertVideoPerfilEmpleado, updateVideoPerfilEmpleado, insertDescripcionPerfilEmpleado, updateDescripcionPerfilEmpleado, updateCorreoPersonalEmpleado} from '../controllers/EmpleadosPerfil';

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

const routerEmpleadoPerfil = Router();

routerEmpleadoPerfil.post('/perfilEmpleado',upload.array('files', 2), insertPerfilEmpleado);

routerEmpleadoPerfil.post('/perfilEmpleadoUpdate',upload.array('files', 2), updatePerfilEmpleado);

routerEmpleadoPerfil.post('/perfilEmpleadoDescripcion', insertDescripcionPerfilEmpleado);

routerEmpleadoPerfil.post('/perfilEmpleadoUpdateDescripcion', updateDescripcionPerfilEmpleado);

routerEmpleadoPerfil.post('/perfilEmpleadoVideo',upload.array('files', 1), insertVideoPerfilEmpleado);

routerEmpleadoPerfil.post('/perfilEmpleadoUpdateVideo',upload.array('files', 1), updateVideoPerfilEmpleado);

routerEmpleadoPerfil.post('/updateCorreo', updateCorreoPersonalEmpleado);


export default routerEmpleadoPerfil;
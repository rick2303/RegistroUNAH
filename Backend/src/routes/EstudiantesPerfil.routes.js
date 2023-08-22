import {Router} from 'express';
const multer = require('multer');
import path from 'path';
import {insertPerfilEstudiante,updatePerfilEstudiante, insertDescripcionPerfilEstudiante, updateDescripcionPerfilEstudiante, updateCorreoPersonalEstudiante} from '../controllers/estudiantePerfil.controllers';

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

routerEstudiantePerfil.post('/perfilEstudiante',upload.array('files', 3), insertPerfilEstudiante);

routerEstudiantePerfil.post('/perfilEstudianteUpdate',upload.array('files', 3), updatePerfilEstudiante);

routerEstudiantePerfil.post('/perfilEstudianteDescripcion', insertDescripcionPerfilEstudiante);

routerEstudiantePerfil.post('/perfilEstudianteUpdateDescripcion', updateDescripcionPerfilEstudiante);
routerEstudiantePerfil.post('/perfilEstudianteUpdateCorreo', updateCorreoPersonalEstudiante);

export default routerEstudiantePerfil;
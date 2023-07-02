import {Router} from 'express';
const multer = require('multer');
import {insertPerfilEstudiante,updatePerfilEstudiante} from '../controllers/estudiantePerfil.controllers';

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

routerEstudiantePerfil.post('/perfilEstudiante',upload.array('files', 3), insertPerfilEstudiante);

routerEstudiantePerfil.post('/perfilEstudianteUpdate',upload.array('files', 3), updatePerfilEstudiante);

export default routerEstudiantePerfil;
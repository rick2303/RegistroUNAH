import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { insertPdfEstudiante, insertSolicitudCancel, enviarSoliCancelion } from '../controllers/estudiantePerfil.controllers';
import router from './usuarios.routes';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join(__dirname, '../../../Frontend/src/UploadsPDF');
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = uniqueSuffix + '-' + file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({ storage });

const routerCancelacionesExep = Router();

routerCancelacionesExep.post('/subirPDF', upload.single('file'), insertPdfEstudiante);

routerCancelacionesExep.post('/subirSolicitudCancelacion', insertSolicitudCancel);

routerCancelacionesExep.post('/enviarSolicitudesRealizadas', enviarSoliCancelion);

export default routerCancelacionesExep;
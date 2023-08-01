import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { insertPdfEstudiante, insertSolicitudCancel, enviarSoliCancelion, enviarSoliCancelCoordi, downloadPdfCancelacion, enviarSoliCancelCount, enviarClasesdeSolicitudes, DictamenSolicitud, EliminarClaseExep, EliminarClaseMatriculada} from '../controllers/estudiantePerfil.controllers';
import router from './usuarios.routes';
import { ro } from 'date-fns/locale';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join(__dirname, '../UploadsPDF');
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

//Ruta para lo que ve el coordinador

routerCancelacionesExep.post('/enviarSolicitudesRealizadasCoordinador', enviarSoliCancelCoordi);

routerCancelacionesExep.post('/download-pdf', downloadPdfCancelacion);

routerCancelacionesExep.get('/enviarSolicitudesContadas', enviarSoliCancelCount);    

routerCancelacionesExep.post('/enviarClasesdeSolicitudes', enviarClasesdeSolicitudes);

routerCancelacionesExep.put('/dictamenSolicitudEnviar', DictamenSolicitud);

routerCancelacionesExep.delete('/eliminarClase', EliminarClaseExep);

routerCancelacionesExep.delete('/eliminarClaseMatriculada', EliminarClaseMatriculada);

export default routerCancelacionesExep;
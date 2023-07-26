import {Router} from 'express';
import multer from 'multer';
import path from 'path';
import {solicitudCambioCentro,getSolicitudCambioCentroCoordinador,DictamenCambioCentro,descargarPDFCambioCarrera} from '../controllers/solicitudes.controllers';

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

const routerSolicitudes = Router();

routerSolicitudes.post('/CambioCentro/:id', upload.single('file'), solicitudCambioCentro)

routerSolicitudes.get('/descargarPDFCambioCarrera/:id', descargarPDFCambioCarrera);

routerSolicitudes.get('/CambioCentroCoordi',getSolicitudCambioCentroCoordinador)

routerSolicitudes.put('/DictamenCambioCentro/:id',DictamenCambioCentro)

export default routerSolicitudes

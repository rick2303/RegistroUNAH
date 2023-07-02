import {Router} from 'express';

import {getEstudiantes, createNewStudent} from '../controllers/usuarios.controllers';
import {sendEmail} from '../controllers/recuperacionContra.controllers';
import {procesarArchivo} from '../csv/csv'
const router = Router();


// Configuración de multer para guardar los archivos en la carpeta "uploads"


router.get('/students', getEstudiantes);

router.post("/students", createNewStudent);

router.post("/updatePassword", updatePassword);

// Ruta para recibir el archivo de estudiantes desde el frontend

const multer = require('multer');
const storage = multer.diskStorage({
  destination: '../../uploads/', // Ruta donde se almacenará el archivo
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Define el nombre original del archivo
  }
});

const upload = multer({
  storage: storage,
  
});

router.post('/ReceiveStudents', upload.single('file'), (req, res) => {
  try {
    // Obtener el archivo subido desde el frontend
    const file = req.file;

    // Verificar si se envió un archivo
    if (!file) {
      return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }

    // Obtener la ruta del archivo subido
    const filePath = file.path;

    // Llamar a la función para procesar el archivo y guardarlo en la base de datos
    const process= procesarArchivo(filePath);
    

      res.send('Archivo recibido y procesado correctamente');

    // Enviar respuesta exitosa al frontend
    
  } catch (error) {
    console.error('Error:', error);    
  }
});


console.log('router funcionando')

module.exports = router;
export default router;

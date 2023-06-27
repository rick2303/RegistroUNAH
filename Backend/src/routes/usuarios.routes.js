import {Router} from 'express';

import {getEstudiantes, createNewStudent} from '../controllers/usuarios.controllers';
import {procesarArchivo} from '../csv/csv'
const router = Router();


// Configuración de multer para guardar los archivos en la carpeta "uploads"


router.get('/students', getEstudiantes);

router.post("/students", createNewStudent);

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
  fileFilter: function (req, file, callback) {
    // Verificar la extensión y el tipo MIME del archivo
    if (file.mimetype !== 'text/csv') {
      const error = new Error('El archivo debe ser de tipo CSV');
      error.status = 400; // Establecer el código de estado del error
      return callback(error);
    }
    callback(null, true);
  }
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
    procesarArchivo(filePath);

    // Enviar respuesta exitosa al frontend
    res.status(200).json({ message: 'Archivo recibido y procesado correctamente' });
  } catch (error) {
    console.error('Error:', error);

    
  // Verificar si es un error específico de tipo CSV
  if (error.message === 'El archivo debe ser de tipo CSV') {
    res.status(400).json({ error: error.message });
  } else {
    // Manejar otros errores
    res.status(500).json({ error: 'Error interno del servidor', errorCode: 500 });
  }
    
  }
});


console.log('router funcionando')

module.exports = router;
export default router;
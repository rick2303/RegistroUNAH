import {Router} from 'express';

import {getEstudiantes, createNewStudent} from '../controllers/usuarios.controllers';
import {procesarArchivo} from '../csv/csv'
const router = Router();
const multer = require('multer');

// Configuración de multer para guardar los archivos en la carpeta "uploads"
const upload = multer({ dest: 'uploads/' });

router.get('/students', getEstudiantes);

router.post("/students", createNewStudent);

// Ruta para recibir el archivo de estudiantes desde el frontend

router.post('/ReceiveStudents', upload.single('file'), (req, res) => {
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
});

console.log('router funcionando')

module.exports = router;
export default router;

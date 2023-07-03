import {Router} from 'express';

import {getEstudiantes, createNewStudent, updatePassword, getEstudiantesMatriculados} from '../controllers/usuarios.controllers';
import {sendEmail} from '../controllers/recuperacionContra.controllers';
import {procesarArchivo} from '../csv/csv'
const router = Router();


// Configuración de multer para guardar los archivos en la carpeta "uploads"


router.get('/students', getEstudiantes);

router.get('/estudiantesMatriculados', getEstudiantesMatriculados);

router.post('/estudiantesMatriculadosDepto', async (req, res) => {

    try {
        const { Carrera} = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT est.NumCuenta, est.Nombre, est.Apellido, est.CorreoInstitucional, est.Carrera, est.IndicePeriodo, est.IndiceGlobal
        FROM (
            SELECT DISTINCT estudiante.NumCuenta, estudiante.Nombre, estudiante.Apellido, estudiante.CorreoInstitucional, estudiante.Carrera, estudiante.IndiceGlobal, estudiante.IndicePeriodo
            FROM [dbo].[estudiantes] as estudiante
            INNER JOIN [dbo].[empleados] as empleado
            ON estudiante.Carrera = empleado.Carrera
            WHERE empleado.Carrera = '${Carrera}'
        ) est
        WHERE est.NumCuenta IN (
            SELECT NumCuenta
            FROM [dbo].[estudiantes]
            WHERE Estado = 'Matriculado'
        );`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }  
  }
);

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

import {Router} from 'express';
import { getConnection } from '../Database';
import {crearNuevaPlanificacion, renderizarPlanificacion, crearNuevaMatricula, renderizarMatricula, crearNuevoProcesoCancelacion, renderizarCancelaciones, enviarIPAC, enviarIIPAC, enviarIIIPAC} from '../controllers/admin.controllers';
import {getEstudiantes, createNewStudent, updatePassword, getEstudiantesMatriculados} from '../controllers/usuarios.controllers';
import {sendEmail} from '../controllers/recuperacionContra.controllers';
import {procesarArchivo} from '../csv/csv'
const router = Router();


// RUTAS PARA ADMINISTRAR LA PLANIFICACIÓN DE CLASES

router.post('/enviarPlanificacion', crearNuevaPlanificacion);

router.get('/renderizarPlanificacion', renderizarPlanificacion);

router.get('/enviarPlanificacionIPAC', enviarIPAC);

router.get('/enviarPlanificacionIIPAC', enviarIIPAC);

router.get('/enviarPlanificacionIIIPAC', enviarIIIPAC);

router.post('/enviarMatricula', crearNuevaMatricula);

router.get('/renderizarMatricula', renderizarMatricula);

router.post('/enviarCancelaciones', crearNuevoProcesoCancelacion);

router.get('/renderizarCancelaciones', renderizarCancelaciones);


// Configuración de multer para guardar los archivos en la carpeta "uploads"


router.get('/students', getEstudiantes);

router.get('/estudiantesMatriculados', getEstudiantesMatriculados);

router.post('/estudiantesMatriculadosDepto', async (req, res) => {

    try {
        const { Carrera, CentroRegional} = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT DISTINCT NumCuenta, Nombre, Apellido, CorreoInstitucional, Carrera, IndiceGlobal, IndicePeriodo FROM [dbo].[estudiantes] e inner join registro_estudiante_clases re on re.IdEstudiante = numCuenta inner join secciones s on re.idSeccion = s.idseccion where YEAR(re.fecha) = year(getdate()) and month(RE.Fecha) > '05' and carrera = '${Carrera}' and CentroRegional = '${CentroRegional}'
`);
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

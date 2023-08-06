import {Router} from 'express';
const multer = require('multer');
import path from 'path';
import {getDocentes,registrarDocente,actualizarDocente,getCarreras, getDocenteById, clasesAsignadas, mostrarPerfilSeccion, mostrarEvaluacionesDocentes, mostrarDocentePorDepartamento, subirNotaEstudiante, notasEstudiantes, getDocenteByIdDep, notasSecciones} from '../controllers/empleados.controllers';

const routerEmpleados = Router();

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

routerEmpleados.get('/docentes', getDocentes);

routerEmpleados.post('/docentesDNI', getDocenteById);

routerEmpleados.post('/registrarDocentes', upload.array('files', 1), registrarDocente);

routerEmpleados.put('/actualizarDocente/:id', actualizarDocente);

routerEmpleados.get('/carreras',getCarreras)

routerEmpleados.post('/seccionesAsignadas', clasesAsignadas)

routerEmpleados.post('/mostrarPerfilDocente', mostrarPerfilSeccion)

routerEmpleados.post('/mostrarEvaluacionesDocente', mostrarEvaluacionesDocentes)

routerEmpleados.post('/docentesDepartamento', mostrarDocentePorDepartamento )

routerEmpleados.post('/subirNota', subirNotaEstudiante)

routerEmpleados.post('/verNotasSeccion', notasEstudiantes)

routerEmpleados.post('/docentesDNIDep', getDocenteByIdDep);

routerEmpleados.post('/verNotas', notasSecciones);




export default routerEmpleados;

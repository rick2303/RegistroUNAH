import express from "express";
import config from './config';
import empleadosRoute from './routes/empleados.routes'
import usuariosRoute from "./routes/usuarios.routes";
import loginRoute from './routes/login.routes'
import perfilEstudiante from './routes/EstudiantesPerfil.routes'
import perfilEmpleado from './routes/EmpleadoPerfil.routes'
import historialAcademico from './routes/estudiantes.historial.routes'
import routerCancelacionesExep from './routes/CancelacionesExepPFD.routes'
//import {} from "./csv/csv";
const app= express();
const cors = require('cors');


// Configurar los encabezados CORS
app.use(cors({
    origin: 'http://127.0.0.1:5173'
  }));
export default app

// Resto de tu configuración del servidor y definición de rutas
// ...

app.set('port',config.port);
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

console.log(config.port);

app.use(empleadosRoute,loginRoute,perfilEstudiante,perfilEmpleado);
app.use(usuariosRoute, historialAcademico, routerCancelacionesExep);



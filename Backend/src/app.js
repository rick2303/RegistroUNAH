import express from "express";
import config from './config';
import empleadosRoute from './routes/empleados.routes'
import usuariosRoute from "./routes/usuarios.routes";
import loginRoute from './routes/login.routes'
import perfilEstudiante from './routes/EstudiantesPerfil.routes'
import perfilEmpleado from './routes/EmpleadoPerfil.routes'
import historialAcademico from './routes/estudiantes.historial.routes'
import routerCancelacionesExep from './routes/CancelacionesExepPFD.routes'
import routerCambioCarrera from './routes/CambioCarrera.routes'
import routerSecciones from "./routes/Secciones.routes";
import { Console } from "console";
import routerAdmin from "./routes/admin.planificaciones.routes";
import routerEstado from "./routes/estudianteEstadoCuenta.routes";
import routerSolicitudes from "./routes/solicitudes.routes"
//import {} from "./csv/csv";
const app= express();
const cors = require('cors');
const path = require('path');

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

// Configurar la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'UploadsPDF')));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// Ruta para descargar un archivo PDF
app.get('/download-PDF', (req, res) => {
  const { documento } = req.query;
  const filePath = path.join(__dirname, 'UploadsPDF', documento);
  res.download(filePath);
});

console.log(config.port);

app.use(empleadosRoute,loginRoute,perfilEstudiante,perfilEmpleado);
app.use(usuariosRoute, historialAcademico, routerCancelacionesExep,routerSolicitudes);
app.use(routerSecciones, routerAdmin, routerEstado, routerCambioCarrera);


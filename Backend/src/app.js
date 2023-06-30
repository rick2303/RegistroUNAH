import express from "express";
import config from './config';
import empleadosRoute from './routes/empleados.routes'
import usuariosRoute from "./routes/usuarios.routes";
import loginRoute from './routes/login.routes'
<<<<<<< HEAD
import redireccionamientoRoute from './routes/redireccionamientos.routes'
import historialAcademico from './routes/estudiantes.historial.routes'
=======

import estudiantePerfil from './routes/estudiantePerfil.routes'
>>>>>>> ec4e88790f340c2c30af8248967827a9b7a4e1ec
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

<<<<<<< HEAD
app.use(empleadosRoute,loginRoute,redireccionamientoRoute);
app.use(usuariosRoute, historialAcademico);

=======
app.use(empleadosRoute,loginRoute,estudiantePerfil);
app.use(usuariosRoute);
>>>>>>> ec4e88790f340c2c30af8248967827a9b7a4e1ec


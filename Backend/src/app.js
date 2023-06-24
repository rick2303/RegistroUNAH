import express from "express";
import config from './config';
import empleadosRoute from './routes/empleados.routes'
import usuariosRoute from "./routes/usuarios.routes";
import loginRoute from './routes/login.routes'
import redireccionamientoRoute from './routes/redireccionamientos.routes'
import {} from "./csv/csv";

const app= express();

app.set('port',config.port);

app.use(express.json());
app.use(express.urlencoded({ extended:false}));

console.log(config.port);

app.use(empleadosRoute,loginRoute,redireccionamientoRoute);
app.use(usuariosRoute);

export default app


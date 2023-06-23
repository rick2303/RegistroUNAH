import express from "express";
import config from './config';
import empleadosRoute from './routes/empleados.routes'
import loginRoute from './routes/login.routes'
import redireccionamientoRoute from './routes/redireccionamientos.routes'

const app= express();

app.set('port',config.port);

app.use(express.json());
app.use(express.urlencoded({ extended:false}));

console.log(config.port);

app.use(empleadosRoute,loginRoute,redireccionamientoRoute);

export default app


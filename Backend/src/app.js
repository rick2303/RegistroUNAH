import express from "express";
import config from './config';
import usuariosRoute from './routes/usuarios.routes'

const app= express();

app.set('port',config.port);

app.use(express.json());
app.use(express.urlencoded({ extended:false}));

console.log(config.port);

app.use(usuariosRoute);

export default app


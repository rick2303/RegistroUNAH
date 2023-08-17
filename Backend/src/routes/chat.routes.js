import {Router} from 'express';

import {SolicitudAmistad,aceptarSolicitud,rechazarSolicitud,Contactos,buscarEstudiante} from '../controllers/chat.controller';

const routerChat = Router();

routerChat.post('/enviarSolicitudAmistad',SolicitudAmistad)

routerChat.post('/aceptarSolicitud/:id/:id2',aceptarSolicitud)

routerChat.post('/rechazarSolicitud/:id/:id2',rechazarSolicitud)

routerChat.post('/contactos',Contactos)

routerChat.post('/buscarEstudiante',buscarEstudiante)

export default routerChat;
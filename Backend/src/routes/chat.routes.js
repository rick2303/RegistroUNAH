import {Router} from 'express';

import {SolicitudAmistad,aceptarSolicitud,rechazarSolicitud} from '../controllers/chat.controller';

const routerChat = Router();

routerChat.post('/enviarSolicitudAmistad',SolicitudAmistad)

routerChat.post('/aceptarSolicitud/:id/:id2',aceptarSolicitud)

routerChat.post('/rechazarSolicitud/:id/:id2',rechazarSolicitud)

export default routerChat;
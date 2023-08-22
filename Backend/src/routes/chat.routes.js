import {Router} from 'express';
import { getConnection,sql, queries} from "../Database"
import {SolicitudAmistad,aceptarSolicitud,rechazarSolicitud,Contactos,buscarEstudiante,getHistorialChat,enviarMensaje, ContactosEspera} from '../controllers/chat.controller';

const routerChat = Router();

routerChat.post('/enviarSolicitudAmistad',SolicitudAmistad)

routerChat.post('/aceptarSolicitud/:id/:id2',aceptarSolicitud)

routerChat.post('/rechazarSolicitud/:id/:id2',rechazarSolicitud)

routerChat.post('/contactos',Contactos)

routerChat.post('/contactosEspera',ContactosEspera)

routerChat.post('/buscarEstudiante',buscarEstudiante)

routerChat.post('/historialChat',getHistorialChat)

routerChat.post('/mandarMensajes',enviarMensaje)

routerChat.get('/getUserStatus', async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT UserId, IsOnline FROM EstadoUsuarios');
      const userStatusList = result.recordset.map(row => ({
        userId: row.UserId,
        isOnline: row.IsOnline
      }));
      console.log(result.recordset)
      res.json(userStatusList);
    } catch (error) {
      console.error('Error fetching user status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default routerChat;
import express from "express";
import config from './config';
import http from 'http';
import socketIo from 'socket.io';
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
import routerCargaAcademica from "./routes/cargaAcademica.routes";
import routerEstudiante from "./routes/estudiantes.routes";
import routerMatricula from "./routes/matricula.routes";
import routerChat from "./routes/chat.routes"
import {MensajesChat} from "./controllers/chat.controller"
import { getConnection,sql, queries} from "./Database"
import {loginUsuarios} from './controllers/login.controllers';
import routerEstadisticas from "./routes/estadisticas.routes";

//import {} from "./csv/csv";
const app= express();
const cors = require('cors');
const path = require('path');

// Configurar los encabezados CORS
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:9000']
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

app.use(empleadosRoute,loginRoute,perfilEstudiante,perfilEmpleado,routerCargaAcademica,routerChat);
app.use(usuariosRoute, historialAcademico, routerCancelacionesExep,routerSolicitudes,routerEstadisticas);
app.use(routerSecciones, routerAdmin, routerEstado, routerCambioCarrera, routerEstudiante, routerMatricula);

// Crear el servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO en el servidor HTTP
export const io = socketIo(server, {
  cors: {
    origin: 'http://127.0.0.1:5173'
  }
});

//app.post("/login", (req, res) => loginUsuarios(req, res, io));

const updateOnlineStatus = async (userId, isOnline) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`SELECT * FROM EstadoUsuarios WHERE UserId = '${userId}'`);

    if (result.recordset.length === 0) {
      // Si no existe una fila para el usuario, insertar una nueva fila
      await pool
        .request()
        .query(`INSERT INTO EstadoUsuarios (UserId, IsOnline) VALUES ('${userId}', ${isOnline ? 1 : 0})`);
    } else {
      // Si ya existe una fila, actualizar el estado
      await pool
        .request()
        .query(`UPDATE EstadoUsuarios SET IsOnline = ${isOnline ? 1 : 0} WHERE UserId = '${userId}'`);
    }
  } catch (error) {
    console.error('Error al actualizar el estado en línea:', error);
  }
};

const userConnections = {}; // Objeto para almacenar las conexiones de usuarios

io.on('connection', async (socket) => {
  try {
    
    socket.on('userConnectRequest', async ({ userId }) => {
      try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT NumCuenta FROM Estudiantes WHERE Numcuenta = '${userId}'`);
        const userIds = result.recordset.map(row => row.NumCuenta);

        // Emitir evento de conexión a todos los demás usuarios
        userConnections[userId] = socket.id;
        userIds.forEach(userId => {
          // Asignar la conexión de socket al usuario correspondiente
          updateOnlineStatus(userId, true);
          // Emitir evento de conexión solo al usuario actual
          io.emit('userConnected', { userId: userId, isOnline: true });
          //console.log('Usuario conectado:', userId);
        });
        
        socket.broadcast.emit('userConnected', { userId: userId, isOnline: true });
        //console.log('Usuarios conectados:', userConnections);

        
        // Llamar a la función para manejar los mensajes de chat
       // MensajesChat(io, socket);
    
        socket.on('disconnect', () => {
          userIds.forEach(userId => {
            delete userConnections[userId]; // Eliminar la conexión del usuario al desconectar
            updateOnlineStatus(userId, false);
            io.emit('userDisconnected', { userId: userId, isOnline: false });
            // Emitir evento de desconexión al usuario
            socket.broadcast.emit('userDisconnected', { userId: userId, isOnline: false });
           // console.log('Usuario desconectado:', userId);
           // console.log('Usuarios conectados:', userConnections)
          });
        });
      } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
      }
    });

  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
});



// Objeto para mantener un seguimiento de los usuarios conectados



// Iniciar el servidor HTTP
server.listen(config.socketPort, () => {
  console.log(`Servidor de socket en funcionamiento en el puerto ${config.socketPort}`);
});


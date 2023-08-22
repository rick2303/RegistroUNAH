import nodemailer from 'nodemailer';
import { getConnection, queries, sql } from "../Database";

export async function enviarEmailAmistad(correo,Solicitante,idP,idS) {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.USEREMAIL,
      pass: process.env.PASS,
    },
  };

  const transport = nodemailer.createTransport(config);

  const mensaje = {
    from: 'gelenamador26@gmail.com',
    to: `${correo}`,
    subject: 'Solicitud de amistad',
  html: `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Solicitud de amistad</title>
  </head>
  <body>
      <div style="margin-top: 20px;">
          <p>¡Hola!</p>
          <p>Has recibido una solicitud de amistad de ${Solicitante}.</p>
          <p>¿Deseas aceptar o rechazar la solicitud?</p>
          
          <form id="aceptarForm" method="post" action="http://localhost:5000/aceptarSolicitud/${idP}/${idS}">
              <button id="aceptarButton" type="submit" name="accion" value="aceptar" style="background-color: #28a745; color: white; border: none; padding: 10px 20px; cursor: pointer;">Aceptar</button>
          </form>
          <br />
          <form id="rechazarForm" method="post" action="http://localhost:5000/rechazarSolicitud/${idP}/${idS}">
              <button id="rechazarButton" type="submit" name="accion" value="rechazar" style="background-color: #dc3545; color: white; border: none; padding: 10px 20px; cursor: pointer;">Rechazar</button>
          </form>
      </div>
  </body>
  </html>
  `,
  };

  const info = await transport.sendMail(mensaje);
}

export const SolicitudAmistad = async (req,res)=>{

    
    const {NumCuentaAmigo,NumCuentaPropietario}= req.body;

    const pool = await getConnection();

    const existencia = await pool.request()
    .input("NumCuentaPropietario",sql.VarChar,NumCuentaPropietario)
    .input("NumCuentaAmigo",sql.VarChar,NumCuentaAmigo)
    .query(`SELECT COUNT(*) AS TotalSolicitudes
    FROM contactos
    WHERE 
        ((IdEstudiantePropietario = ${NumCuentaPropietario} AND IdEstudianteAgregado = ${NumCuentaAmigo})
        OR
        (IdEstudiantePropietario = ${NumCuentaAmigo} AND IdEstudianteAgregado = ${NumCuentaPropietario}))
        AND EstadoSolicitud IN ('AGREGADO', 'EN ESPERA');
    ;
    ` )
    
    const totalSolicitudes = existencia.recordset[0].TotalSolicitudes;

if (totalSolicitudes > 0) {
    res.status(500).json({ message: "Solicitud rechazada, ya tienes este contacto agregado o en lista de espera" });
}else{

    const correo = await pool.request()
    .input("NumCuentaAmigo",sql.VarChar,NumCuentaAmigo)
    .input("NumCuentaPropietario",sql.VarChar,NumCuentaPropietario)
    .query(`SELECT CorreoPersonal FROM estudiantes WHERE Numcuenta=${NumCuentaAmigo}`)

    const solicitante = await pool.request()
    .input("NumCuentaPropietario",sql.VarChar,NumCuentaPropietario)
    .input("NumCuentaAmigo",sql.VarChar,NumCuentaAmigo)
    .query(`select Nombre from estudiantes where NumCuenta=${NumCuentaPropietario}`)
    

    console.log(correo.recordset[0].CorreoPersonal);
    console.log(solicitante.recordset[0].Nombre);

    enviarEmailAmistad(correo.recordset[0].CorreoPersonal,solicitante.recordset[0].Nombre,NumCuentaPropietario,NumCuentaAmigo)

    const insert2 = await pool.request().query(`INSERT INTO Contactos (IdEstudiantePropietario, IdEstudianteAgregado, EstadoSolicitud) VALUES (${NumCuentaAmigo}, ${NumCuentaPropietario}, 'EN ESPERA')`)



    res.status(200).json({message:"Solicitud enviada"})
    }

}



export const aceptarSolicitud = async (req, res) => {
    const NumCuentaPropietario = req.params.id
    const NumCuentaAmigo = req.params.id2

    const pool = await getConnection();

    const existencia = await pool.request()
    .input("NumCuentaPropietario",sql.VarChar,NumCuentaPropietario)
    .input("NumCuentaAmigo",sql.VarChar,NumCuentaAmigo)
    .query(`SELECT *
    FROM contactos AS c1
    WHERE 
        (c1.IdEstudiantePropietario = ${NumCuentaPropietario} -- Reemplaza esto con el valor del propietario
        AND EXISTS (
            SELECT 1
            FROM contactos AS c2
            WHERE c2.IdEstudianteAgregado = ${NumCuentaAmigo}  -- Valor que deseas verificar
                AND c2.IdEstudiantePropietario = c1.IdEstudiantePropietario AND EstadoSolicitud='AGREGADO'
        ))
        OR
        (c1.IdEstudianteAgregado = ${NumCuentaAmigo} -- Valor que deseas verificar
        AND EXISTS (
            SELECT 1
            FROM contactos AS c3
            WHERE c3.IdEstudiantePropietario = ${NumCuentaPropietario}  -- Reemplaza esto con el valor del propietario
                AND c3.IdEstudianteAgregado = c1.IdEstudianteAgregado AND EstadoSolicitud='AGREGADO'
        ));
    ;` )

            console.log("existencia: "+ existencia.recordset[0])
    if(existencia.recordset[0] !=null){
        const mensaje = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contacto ya agregado</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        </head>
        <body>
            <div class="container mt-5">
        
            </div>
        
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Solicitud</h5>
                            <button type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-danger d-flex align-items-center" role="alert">
                                <i class="fas fa-exclamation-circle me-2" style="color: red;"></i>
                                <div>
                                    Ya tienes agregado este contacto.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
            <script>
                // Abre el modal automáticamente al cargar la página
                document.addEventListener('DOMContentLoaded', function() {
                    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {backdrop: 'static', keyboard: false});
                    myModal.show();
                });
            </script>
        </body>
        </html>
         
      `;
    
      res.send(mensaje);
    }else{

        const aceptar = await pool.request()
        .input("NumCuentaAmigo", sql.VarChar, NumCuentaAmigo)
        .input("NumCuentaPropietario", sql.VarChar, NumCuentaPropietario)
        .query(`UPDATE Contactos SET EstadoSolicitud = 'AGREGADO' WHERE IdEstudiantePropietario = @NumCuentaPropietario AND IdEstudianteAgregado = @NumCuentaAmigo AND EstadoSolicitud = 'EN ESPERA'`);
    
        const aceptar2 = await pool.request()
        .input("NumCuentaAmigo", sql.VarChar, NumCuentaAmigo)
        .input("NumCuentaPropietario", sql.VarChar, NumCuentaPropietario)
        .query(`INSERT INTO Contactos (IdEstudiantePropietario, IdEstudianteAgregado, EstadoSolicitud) VALUES (${NumCuentaAmigo}, ${NumCuentaPropietario}, 'AGREGADO')`);

                const mensaje = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Modal de Bootstrap</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                </head>
                <body>
                    <div class="container mt-5">
                
                    </div>
                
                    <!-- Modal -->
                    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Solicitud</h5>
                                    <button type="button" class="btn-close" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="alert alert-success d-flex align-items-center" role="alert">
                                        <i class="fas fa-check-circle me-2"></i>
                                        <div>
                                            Solicitud aceptada.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
                    <script>
                        // Abre el modal automáticamente al cargar la página
                        document.addEventListener('DOMContentLoaded', function() {
                            var myModal = new bootstrap.Modal(document.getElementById('myModal'), {backdrop: 'static', keyboard: false});
                            myModal.show();
                        });
                    </script>
                </body>
                </html>
                
            `;

            res.send(mensaje);
            }
}

export const rechazarSolicitud = async (req, res) => {
    const NumCuentaPropietario = req.params.id
    const NumCuentaAmigo = req.params.id2
    const pool = await getConnection();



    const existencia = await pool.request()
    .input("NumCuentaPropietario",sql.VarChar,NumCuentaPropietario)
    .input("NumCuentaAmigo",sql.VarChar,NumCuentaAmigo)
    .query(`SELECT *
    FROM contactos AS c1
    WHERE 
        (c1.IdEstudiantePropietario = ${NumCuentaPropietario} -- Reemplaza esto con el valor del propietario
        AND EXISTS (
            SELECT 1
            FROM contactos AS c2
            WHERE c2.IdEstudianteAgregado = ${NumCuentaAmigo}  -- Valor que deseas verificar
                AND c2.IdEstudiantePropietario = c1.IdEstudiantePropietario AND EstadoSolicitud='AGREGADO'
        ))
        OR
        (c1.IdEstudianteAgregado = ${NumCuentaAmigo} -- Valor que deseas verificar
        AND EXISTS (
            SELECT 1
            FROM contactos AS c3
            WHERE c3.IdEstudiantePropietario = ${NumCuentaPropietario}  -- Reemplaza esto con el valor del propietario
                AND c3.IdEstudianteAgregado = c1.IdEstudianteAgregado AND EstadoSolicitud='AGREGADO'
        ));
    ;` )

    if(existencia.recordset[0] !=null ){
        const mensaje = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contacto ya agregado</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        </head>
        <body>
            <div class="container mt-5">
        
            </div>
        
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Solicitud</h5>
                            <button type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-danger d-flex align-items-center" role="alert">
                                <i class="fas fa-exclamation-circle me-2" style="color: red;"></i>
                                <div>
                                    Ya tienes agregado este contacto.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
            <script>
                // Abre el modal automáticamente al cargar la página
                document.addEventListener('DOMContentLoaded', function() {
                    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {backdrop: 'static', keyboard: false});
                    myModal.show();
                });
            </script>
        </body>
        </html>
         
      `;
    
      res.send(mensaje);

    }else{
        const rechazar = await pool.request()
        .input("NumCuentaAmigo", sql.VarChar, NumCuentaAmigo)
        .input("NumCuentaPropietario", sql.VarChar, NumCuentaPropietario)
        .query(`UPDATE Contactos SET EstadoSolicitud = 'RECHAZADO' WHERE IdEstudiantePropietario = @NumCuentaPropietario AND IdEstudianteAgregado = @NumCuentaAmigo AND EstadoSolicitud = 'EN ESPERA'`);
    
        const aceptar2 = await pool.request()
        .input("NumCuentaAmigo", sql.VarChar, NumCuentaAmigo)
        .input("NumCuentaPropietario", sql.VarChar, NumCuentaPropietario)
        .query(`INSERT INTO Contactos (IdEstudiantePropietario, IdEstudianteAgregado, EstadoSolicitud) VALUES (${NumCuentaAmigo}, ${NumCuentaPropietario}, 'RECHAZADO')`);
    
            const mensaje = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Solicitud rechazada</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            </head>
            <body>
                <div class="container mt-5">
            
                </div>
            
                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Solicitud</h5>
                                <button type="button" class="btn-close" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-danger d-flex align-items-center" role="alert">
                                    <i class="fas fa-exclamation-circle me-2" style="color: red;"></i>
                                    <div>
                                        Solicitud Rechazada.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
                <script>
                    // Abre el modal automáticamente al cargar la página
                    document.addEventListener('DOMContentLoaded', function() {
                        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {backdrop: 'static', keyboard: false});
                        myModal.show();
                    });
                </script>
            </body>
            </html>
            
        `;

        res.send(mensaje);
        }
}

export const Contactos = async (req,res)=>{
    const {NumCuenta}= req.body

    const pool = await getConnection();
    const contactos = await pool.request()
    .input('NumCuenta',sql.VarChar,NumCuenta)
    .query(queries.getContactos)

    //console.log(contactos.recordset)

    res.json(contactos.recordset)

}

export const ContactosEspera = async (req, res) => {
    const {NumCuenta}= req.body

    
    const pool = await getConnection()
    const ListaEspera= await pool.request()
    .input('NumCuenta',sql.VarChar,NumCuenta)
    .query(`select distinct c.IdEstudiantePropietario, c.IdEstudianteAgregado,pe.Imagen1,es.Nombre,es.Apellido, eu.IsOnline, es.CorreoInstitucional, es.Carrera from contactos as c 
    left join perfil_estudiante as pe 
    on c.IdEstudianteAgregado = pe.IdPerfil
    left join estudiantes as es
    on c.IdEstudianteAgregado = es.NumCuenta
    left join EstadoUsuarios as eu
	on c.IdEstudianteAgregado = eu.UserId
    where c.IdEstudiantePropietario= @NumCuenta AND EstadoSolicitud='EN ESPERA'`)

    res.json(ListaEspera.recordset)
}

export const buscarEstudiante = async (req,res)=>{

    try {
        const {NumCuenta}= req.body

    const pool = await getConnection();

    const estudiante = await pool.request()
    .input('NumCuenta',sql.VarChar,NumCuenta)
    .query(`SELECT NumCuenta,Nombre, Apellido, CorreoInstitucional,Carrera FROM estudiantes WHERE NumCuenta=${NumCuenta} `)

    res.status(200).json(estudiante.recordset[0])
    } catch (error) {
        res.status(500).json("No se encontro estudiante")
    }
    

}


export const enviarMensaje = async (req, res) => {
  const { emisorId, receptorId, mensaje } = req.body;
  const fechaMensaje = new Date(); // Obtiene la fecha y hora actual

  const query = `
    INSERT INTO historialChat (EmisorId, receptorId, mensaje, fecha_Mensaje)
    VALUES (@emisorId, @receptorId, @mensaje, @fechaMensaje)
  `;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('emisorId', sql.VarChar, emisorId)
      .input('receptorId', sql.VarChar, receptorId)
      .input('mensaje', sql.VarChar, mensaje)
      .input('fechaMensaje', sql.DateTime, fechaMensaje)
      .query(query);

    res.status(200).json({ success: true, message: 'Mensaje enviado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el mensaje en la base de datos:', error);
    res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
  }
};


export const getHistorialChat = async (req, res) => {
  const { emisorId, receptorId } = req.body;

  const query = `
    SELECT Id_Historial,EmisorId, receptorId, mensaje, fecha_Mensaje
    FROM historialChat
    WHERE (EmisorId = @emisorId AND receptorId = @receptorId)
    OR (EmisorId = @receptorId AND receptorId = @emisorId)
    ORDER BY fecha_Mensaje ASC;
  `;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('emisorId', sql.VarChar, emisorId)
      .input('receptorId', sql.VarChar, receptorId)
      .query(query);

    const chatHistory = result.recordset;
    res.json(chatHistory);
  } catch (error) {
    console.error('Error al obtener el historial de chat:', error);
    res.status(500).json({ error: "Error al obtener el historial de chat." });
  }
};

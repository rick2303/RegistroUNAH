import { getConnection, queries,querys, sql } from "../Database";
import path from 'path';
import fs from 'fs';

export const solicitudCambioCentro = async (req,res) =>{
    
        const NumCuenta = req.params.id;
        const pool = await getConnection();
        const solicitudCambio_Centro = await pool
        .request()
        .input("NumCuenta", sql.VarChar, NumCuenta)
        .query(`SELECT IdSolicitud FROM dbo.solicitud_cambiocentro WHERE NumCuenta=${NumCuenta} and Dictamen ='EN ESPERA'`)

        console.log(solicitudCambio_Centro.rowsAffected[0])

        if(solicitudCambio_Centro.rowsAffected[0]<=0){
            const {CentroNuevo} = req.body
            const Justificacion = req.file.filename;
            const centroRegionalQuery = await pool
                .request()
                .input("NumCuenta", sql.VarChar,NumCuenta)
                .query(`SELECT CentroRegional FROM dbo.estudiantes where NumCuenta=${NumCuenta}`)

            const centroRegional= centroRegionalQuery.recordset[0].CentroRegional

            const fechaActual = new Date();
            const anio = fechaActual.getFullYear();
            const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const dia = String(fechaActual.getDate()).padStart(2, '0');
            const fechaSinHora = `${anio}-${mes}-${dia}`;

            const solicitud = await pool
                .request()
                .input("NumCuenta", sql.VarChar, NumCuenta)
                .input("CentroRegional", sql.VarChar, centroRegional)
                .input("CentroNuevo", sql.VarChar, CentroNuevo)
                .input("Justificacion", sql.VarChar, Justificacion)
                .input("FechaSolicitud", sql.Date, fechaSinHora)
                .query(queries.insertSolicitudCambioCentro)

            res.json({message:"Archivo cargado exitosamente, ahora seleccione el centro al que desea cambiarse"})
        }else{
            res.json({message:"Ya tiene una solicitud para cambio de centro en marcha, no es necesario volver a subir otro archivo"})
        }

    
}

export const getSolicitudCambioCentroCoordinador = async(req,res) => {
    try {
        const {CentroRegional,Carrera}= req.body
        console.log(CentroRegional)
        const pool = await getConnection()
        
        const result = await pool.request()
        .input("CentroRegional",sql.VarChar,CentroRegional)
        .input("Carrera",sql.VarChar,Carrera)
        .query(queries.getSolicitudesCambioCentro)
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error con el servidor, pongase en contacto con mantenimiento.'})
    }
}

export const descargarPDFCambioCarrera = async (req, res) => {
    try {
        const NumCuenta = req.params.id;

        const pool = await getConnection();

        const JustificacionQuery = await pool.request().input("NumCuenta",sql.VarChar,NumCuenta).query(`SELECT Justificacion FROM solicitud_cambiocentro where NumCuenta=${NumCuenta} AND Dictamen = 'EN ESPERA' AND Estado ='PAGADO'`)

        const Justificacion= JustificacionQuery.recordset[0].Justificacion

        //console.log(Justificacion)

      const pdfFilePath = path.join(__dirname, '../UploadsCambioCentroPDF', Justificacion);
  
      // Verifica si el archivo existe antes de descargarlo
      if (fs.existsSync(pdfFilePath)) {
        res.download(pdfFilePath); // Descarga el archivo PDF
      } else {
        res.status(404).json({ message: 'El archivo PDF no existe' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al descargar el PDF', error: error.message });
    }
  };

  export const ObtenersolicitudCambioCentro = async (req, res) => {
    const { NumCuenta} = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("NumCuenta", sql.VarChar, NumCuenta)
        .query(querys.getCambioCentroSoli);

        res.json(result.recordset);
};

export const DictamenCambioCentro = async(req, res) => {

    try {
        const NumCuenta = req.params.id;
        const {Dictamen }=req.body
        
        console.log(Dictamen)

        if(Dictamen=="APROBADO"){
            const pool= await getConnection()
            const dictamenSolicitud = await pool.request()
            .input("NumCuenta", sql.VarChar,NumCuenta)
            .input("Dictamen",sql.VarChar,Dictamen)
            .query(queries.UpdateDictamenCambioCentro)


            const centroRegionalQuery = await pool
                .request()
                .input("NumCuenta", sql.VarChar,NumCuenta)
                .query(`SELECT CentroNuevo FROM dbo.solicitud_cambiocentro where NumCuenta=${NumCuenta}`)

            const centroRegional= centroRegionalQuery.recordset[0].CentroNuevo

            const centroNuevo = await pool.request()
            .input("NumCuenta", sql.VarChar,NumCuenta)
            .input("CentroRegional",sql.VarChar,centroRegional)
            .query(queries.UpdateCambioCentro)
            
            
            res.json({message:'Se realizo el dictamen a favor de la solicitud'})
        }else{
            const pool= await getConnection()
            const dictamenSolicitud2 = await pool.request()
            .input("NumCuenta", sql.VarChar,NumCuenta)
            .input("Dictamen",sql.VarChar,Dictamen)
            .query(queries.UpdateDictamenCambioCentro)
            res.json({message:'Se realizo el dictamen y fue rechazado'})
        }
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error con el servidor, pongase en contacto con mantenimiento.'})
    }

}


export const obtenerCentrosRegionales = async (req, res) => {
    try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getCentrosRegionales);
    // Obtener los datos de las carreras desde result.recordset
    const centro = result.recordset.map((centro) => ({
        NombreCentro: centro.NombreCentro,
        Centro: centro.Centro,
    }));

    res.json(centro);

    } catch (error) {
    console.error('Error al obtener carreras:', error);
    res.status(500).json({ message: 'Error al obtener las carreras' });
    }
};

export const updateCambioCentro = async (req, res) => {
    try {
    const { numCuenta, Centro, idSolicitud } = req.body; 

    const pool = await getConnection();
    console.log("NumCuenta:", numCuenta);
    console.log("Centro:", Centro);
    console.log("IdClase:", idSolicitud);

    await pool.request()
        .input("NumCuenta", sql.VarChar, numCuenta)
        .input("CentroNuevo", sql.VarChar, Centro)
        .input("IdSolicitud", sql.Int, idSolicitud)
        .query(querys.updateCentroNuevo.replace("@Centro", Centro).replace("@numCuenta", numCuenta).replace("@idSolicitud", idSolicitud));

    res.json({ message: "Operación completada exitosamente" });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};
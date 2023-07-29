import { getConnection, querys, sql } from "../Database";
const bodyParser = require('body-parser');

export const obtenerCarerras = async (req, res) => {
    try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getCarreras);

    // Obtener los datos de las carreras desde result.recordset
    const carreras = result.recordset.map((carrera) => ({
        IdCarrera: carrera.IdCarrera,
        NombreCarrera: carrera.NombreCarrera,
        Sistema: carrera.Sistema,
    }));

    res.json(carreras);
    } catch (error) {
    console.error('Error al obtener carreras:', error);
    res.status(500).json({ message: 'Error al obtener las carreras' });
    }
};

export const ObtenerSoliCambioCarreraCoordinador = async (req, res) => {
    const { carreraCambio, centroRegional } = req.body;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("carreraCambio", sql.VarChar, carreraCambio)
    .input("CentroRegional", sql.VarChar, centroRegional)
    .query(querys.getSoliCambioDeCarreraCoordi);
res.json(result.recordset);
};

export const EnviarDictamenCambioCarrera = async (req, res) => {
    try {
    const { numCuenta, dictamen, idSolicitud, justificacion  } = req.body; 

    const pool = await getConnection();
    console.log("NumCuenta:", numCuenta);
    console.log("Dictamen:", dictamen);
    console.log("idSolicitud:", idSolicitud);
    console.log("JustificacionCoordi:", justificacion);

    await pool.request()
        .input("NumCuenta", sql.VarChar, numCuenta)
        .input("Dictamen", sql.VarChar, dictamen)
        .input("IdSolicitud", sql.Int, idSolicitud)
        .input("JustificacionCoordi", sql.VarChar, justificacion)
        .query(querys.UpdateEstadoCambioCarrera.replace("@dictamen", dictamen).replace("@numCuenta", numCuenta).replace("@idSolicitud", idSolicitud).replace("@justificacion", justificacion));

    res.json({ message: "Operación completada exitosamente" });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};

export const actualizarCarreraEstudiante  = async (req, res) => {
    try {
        const { NumCuenta, Carrera } = req.body; // Obtener el número de cuenta y la nueva carrera del cuerpo de la solicitu
        const pool = await getConnection();
        console.log("NUEVA CARRERA:", Carrera)
        const result = await pool
        .request()
        .input('NumCuenta', sql.VarChar, NumCuenta)
        .input('Carrera', sql.VarChar, Carrera) // Verifica que el nombre sea 'CarreraCambio' aquí
        .query('UPDATE [dbo].[estudiantes] SET Carrera = @Carrera WHERE NumCuenta = @NumCuenta'); // Verifica que el nombre sea '@CarreraCambio' aquí

        res.json({ message: "Operación completada exitosamente" });
    } catch (error) {
        console.error('Error al obtener información del estudiante:', error);
        res.status(500).json({message: "Error al procesar la solicitud"});
    }
};


export const obtenerInfoEstudent = async (req, res) => {
    try {
    const { NumCuenta } = req.body; // Obtener el número de cuenta del cuerpo de la solicitud
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('NumCuenta', sql.VarChar, NumCuenta) // Asegurarse de definir el tipo de dato adecuado para el número de cuenta en la consulta
    .query(querys.getInfoEstudent);
    res.json(result.recordset);
} catch (error) {
    console.error('Error al obtener información del estudiante:', error);
    res.status(500).json({ message: 'Error al obtener información del estudiante' });
}
};

export const ObtenerSoliSubidaEstudiante = async (req, res) => {
    try {
    const { NumCuenta } = req.body; // Obtener el número de cuenta del cuerpo de la solicitud
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('NumCuenta', sql.VarChar, NumCuenta) // Asegurarse de definir el tipo de dato adecuado para el número de cuenta en la consulta
    .query(querys.getSoliEstu);
    res.json(result.recordset);
} catch (error) {
    console.error('Error al obtener información del estudiante:', error);
    res.status(500).json({ message: 'Error al obtener información del estudiante' });
}
};

export const solicitudSubidaEstudiante = async (req, res) => {
    try {
    const {
    NumCuenta,
    Nombre,
    Apellido,
    Carrera,
    CentroRegional,
    IndiceGlobal,
    PuntajePAA,
    CarreraDeCambio,
    RazonDeCambio,
    FechaSolicitud,
    Dictamen
    } = req.body;

    const pool = await getConnection();

    // Definir todos los parámetros para la consulta de inserción
    const params = {
    NumCuenta: sql.VarChar,
    Nombre: sql.VarChar,
    Apellido: sql.VarChar,
    Carrera: sql.VarChar,
    CentroRegional: sql.VarChar,
    IndiceGlobal: sql.Int,
    PuntajePAA: sql.Int,
    CarreraDeCambio: sql.VarChar,
    RazonDeCambio: sql.VarChar,
    FechaSolicitud: sql.Date,
    Dictamen: sql.VarChar
    };

    // Ejecutar la consulta de inserción
    await pool
    .request()
    .input('NumCuenta', params.NumCuenta, NumCuenta)
    .input('Nombre', params.Nombre, Nombre)
    .input('Apellido', params.Apellido, Apellido)
    .input('Carrera', params.Carrera, Carrera)
    .input('CentroRegional', params.CentroRegional, CentroRegional)
    .input('IndiceGlobal', params.IndiceGlobal, IndiceGlobal)
    .input('PuntajePAA', params.PuntajePAA, PuntajePAA)
    .input('CarreraDeCambio', params.CarreraDeCambio, CarreraDeCambio)
    .input('RazonDeCambio', params.RazonDeCambio, RazonDeCambio)
    .input('FechaSolicitud', params.FechaSolicitud, FechaSolicitud)
    .input('Dictamen', params.Dictamen, Dictamen)
    .query(querys.insertSolicitudCambioCarrera);

    res.json({ message: 'Solicitud insertada correctamente' });
} catch (error) {
    console.error('Error al insertar la solicitud:', error);
    res.status(500).json({ message: 'Error al insertar la solicitud' });
}
};


export const EliminarsolicitudSubidaEstudiante = async (req, res) => {
    try {
    const { IdSolicitud } = req.body;
    const pool = await getConnection();
    const query = `DELETE FROM [dbo].[solicitud_cambiocarrera] WHERE IdSolicitud = @IdSolicitud`;
    const result = await pool.request().input('IdSolicitud', sql.Int, IdSolicitud).query(query);

    res.json({ message: 'Solicitud eliminada correctamente' });
} catch (error) {
    console.error('Error al eliminar la solicitud:', error);
    res.status(500).json({ message: 'Error al eliminar la solicitud' });
}
};



import { getConnection, sql, queries, querys } from "../Database"

export const insertPerfilEstudiante = async (req, res) => {
    const { Id } = req.body;
    const photoPaths = req.files.map(file => file.filename);
    const pool = await getConnection();
    const result = await pool.request()
        .input("Id", sql.VarChar, Id)
        .input('photoPath1', sql.VarChar, photoPaths[0])
        .input('photoPath2', sql.VarChar, photoPaths[1])
        .input('photoPath3', sql.VarChar, photoPaths[2])
        .query(queries.insertPerfilEstudiante);
    const estudiante = await pool.request()
        .input("Id", sql.VarChar, Id)
        .query(queries.getEstudiantes);
    console.log(estudiante);
    const perfilEstudiante = await pool.request().input("Id", sql.VarChar, Id).query(queries.getPerfilestudiante);
    res.json({ url: 'http://127.0.0.1:5173/src/html/Estudiante.html', data: estudiante.recordset[0], perfil: perfilEstudiante.recordset[0] });
}
export const insertPdfEstudiante = async (req, res) => {
    const { Id } = req.body;
    const pdfPath = req.file.filename;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("Id", sql.VarChar, Id)
    .input("pdfPath", sql.VarChar, pdfPath)
    .query(querys.insertPDF);
    res.status(200).json({ message: "Operación completada exitosamente" });
};

export const insertSolicitudCancel = async (req, res) => {
    const cancelaciones = req.body; // Obtener el arreglo de cancelaciones enviado desde el frontend
    const pool = await getConnection();

    // Iterar sobre el arreglo de cancelaciones y ejecutar la consulta para cada objeto
    for (const cancelacion of cancelaciones) {
        const { idClase, asignatura, uv, seccion, año, periodo, estado, descripcion,Id } = cancelacion;

        await pool.request()
            .input("Id", sql.VarChar, Id)
            .input("idClase", sql.VarChar, idClase) // Utilizar "idClase" en lugar de "IdClase"
            .input("Asignatura", sql.VarChar, asignatura)
            .input("UV", sql.Int, uv)
            .input("Seccion", sql.Int, seccion)
            .input("Año", sql.Date, año) // Utilizar "Año" en lugar de "año"
            .input("Periodo", sql.VarChar, periodo) // Utilizar "Periodo" en lugar de "periodo"
            .input("Estado", sql.VarChar, estado)
            .input("Descripcion", sql.VarChar, descripcion)
            .query(querys.insertSoliCancel);
    }

    res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const DictamenSolicitud = async (req, res) => {
    try {
    const { numCuenta, estado, idClase } = req.body; 

    const pool = await getConnection();
    console.log("NumCuenta:", numCuenta);
    console.log("Estado:", estado);
    console.log("IdClase:", idClase);

    await pool.request()
        .input("NumCuenta", sql.VarChar, numCuenta)
        .input("Estado", sql.VarChar, estado)
        .input("IdClase", sql.VarChar, idClase)
        .query(querys.UpdateEstadoCancel.replace("@estado", estado).replace("@numCuenta", numCuenta).replace("@idClase", idClase));

    res.json({ message: "Operación completada exitosamente" });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};

export const updatePerfilEstudiante = async (req, res) => {
    try {
        const { Id } = req.body;
        const photoPaths = req.files.map(file => file.filename);
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.VarChar, Id)
            .input('photoPath1', sql.VarChar, photoPaths[0])
            .input('photoPath2', sql.VarChar, photoPaths[1])
            .input('photoPath3', sql.VarChar, photoPaths[2])
            .query(queries.updatePerfilEstudiante);
        const estudiante = await pool.request()
            .input("Id", sql.VarChar, Id)
            .query(queries.getEstudiantes);
        console.log(estudiante);
        const perfilEstudiante = await pool.request().input("Id", sql.VarChar, Id).query(queries.getPerfilestudiante);
        res.json({ url: 'http://127.0.0.1:5173/src/html/Estudiante.html', data: estudiante.recordset[0], perfil: perfilEstudiante.recordset[0] });
    } catch (error) {
        res.status(500).json({ message: 'error al momento de actualizar foto' })
    }
}

export const updateDescripcionPerfilEstudiante = async (req, res) => {
    const { id, descripcion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.VarChar, id)
        .input("descripcion", sql.VarChar, descripcion)
        .query(queries.updateDescripcionPerfilEstudiantep);
    res.status(200).json({ message: 'Operación completada exitosamente' });
}
export const updateCorreoPersonalEstudiante = async (req, res) => {
    const { id, CorreoPersonal } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("id", sql.VarChar, id)
        .input("CorreoPersonal", sql.VarChar, CorreoPersonal)
        .query(queries.updateCorreoPersonalEstudiante);
    res.status(200).json({ message: 'Operación completada exitosamente' });
}

export const insertDescripcionPerfilEstudiante = async (req, res) => {
    const { Id, descripcion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("Id", sql.VarChar, Id)
        .input("Descripcion", sql.VarChar, descripcion)
        .query(queries.insertDescripcionPerfilEstudiante);
    res.status(200).json({ message: 'Operación completada exitosamente' });
}
export const enviarSoliCancelion = async (req, res) => {
    const { NumCuenta, Periodo } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("NumCuenta", sql.VarChar, NumCuenta)
        .input("Periodo", sql.VarChar, Periodo)
        // .input("año", sql.Int, año)
        .query(querys.getCancelaciones);
    res.json(result.recordset);
};


export const enviarSoliCancelCoordi = async (req, res) => {
    const { carrera, centroRegional } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
    .input("Carrera", sql.VarChar, carrera)
    .input("CentroRegional", sql.VarChar, centroRegional)
    .query(querys.geSoliCancelacionesCoordinador);
    res.json(result.recordset);
};

export const downloadPdfCancelacion = async (req, res) => {
    const { NumCuenta } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
    .input("NumCuenta", sql.VarChar, NumCuenta)
    .query(querys.getPdfSolicitud);
    res.json(result.recordset);
};

export const enviarSoliCancelCount = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .query(querys.getSoliCancelacionesCount);
    res.json(result.recordset);
};

export const enviarClasesdeSolicitudes = async (req, res) => {
    const { NumCuenta } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
    .input("NumCuenta", sql.VarChar, NumCuenta)
    .query(querys.getClasesSolicitud);
    res.json(result.recordset);
}

export const EliminarClaseExep = async (req, res) => {
    const { numCuenta, periodo, idClase, año } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
    .input("NumCuenta", sql.VarChar, numCuenta)
    .input("Periodo", sql.VarChar, periodo)
    .input("IdClase", sql.VarChar, idClase)
    .input("Año", sql.Int, año)
    .query(querys.EliminarClaseExcep);
    res.json(result.recordset);
}


export const EliminarClaseMatriculada = async (req, res) => {
    const { numCuenta, periodo, idClase, año } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
    .input("NumCuenta", sql.VarChar, numCuenta)
    .input("Periodo", sql.VarChar, periodo)
    .input("IdClase", sql.VarChar, idClase)
    .input("Año", sql.Int, año)
    .query(querys.EliminarClaseExcep);
    res.json(result.recordset);
}
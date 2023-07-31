import { Connection } from "tedious";
import { getConnection, sql, queries, queryDocente } from "../Database"
import { generateUniqueEmail, generateRandomPassword, enviarEmail } from "./creacioncorreo.controllers";


export const getDocentes = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.get_Docentes);
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getCarreras = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .query(queries.getCarreras);

    const carreras = result.recordset.map((carrera) => carrera.NombreCarrera);

    res.json(carreras);

}

export const getDocenteById = async (req, res) => {
    const {DNI} = req.body
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input('DNI', sql.VarChar, DNI)
        .query(queries.get_Docente_By_Id);
        res.json(result.recordset[0]);
        res.status(200)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const registrarDocente = async (req, res) => {
    const Rol = 'DOCENTE';
    const SubRol = 'DOCENTE';
    const hoy = new Date();
    const {
        DNI,
        Nombre,
        Apellido,
        NumeroTelefono,
        CorreoPersonal,
        FechaNacimiento,
        Carrera,
        Direccion,
        CentroRegional
    } = req.body;
    // Establece la conexión a la base de datos
    const correoInstitucional = generateUniqueEmail(Nombre, Apellido)
    const contrasena = generateRandomPassword(Nombre, Apellido)
    const pool = await getConnection();
    const photoPaths = req.files.map(file => file.filename);
    // Inserta el nombre de usuario y la Contrasena en la tabla de usuarios
    if (NumeroTelefono === "" || CorreoPersonal === "" || Direccion === "" || DNI === "" || Carrera === "", Nombre === "" || Apellido === "") {
        return res.status(400).json({ message: "Not Found" })
    }
    try {
        await pool.request()
            .input("DNI", sql.VarChar, DNI)
            .input("Nombre", sql.VarChar, Nombre)
            .input("Apellido", sql.VarChar, Apellido)
            .input("NumeroTelefono", sql.VarChar, NumeroTelefono)
            .input("CorreoInstitucional", sql.VarChar, correoInstitucional)
            .input("CorreoPersonal", sql.VarChar, CorreoPersonal)
            .input("Contrasena", sql.VarChar, contrasena)
            .input("FechaNacimiento", sql.Date, FechaNacimiento)
            .input("FechaContratacion", sql.Date, hoy)
            .input("Carrera", sql.VarChar, Carrera.toUpperCase())
            .input("Direccion", sql.VarChar, Direccion)
            .input("Foto", sql.VarChar, photoPaths[0])
            .input("CentroRegional", sql.VarChar, CentroRegional.toUpperCase())
            .input("Rol", sql.VarChar, Rol)
            .input("SubRol", sql.VarChar, SubRol)
            .query(queries.insert_Docentes);
        res.status(200).json({ message: 'Docente registrado correctamente.', status:200});
        const numEmpleado = await pool.request().input('DNI', sql.VarChar, DNI).query(queries.getNumEmpleado)
        enviarEmail(CorreoPersonal, Nombre, Apellido, correoInstitucional, numEmpleado.recordset[0].numEmpleado, contrasena, Carrera)
    } catch (error) {
        res.send(error.message)
    }
}



export const actualizarDocente = async (req, res) => {
    //const NumEmpleado = req.params.id;
    const { NumEmpleado, DNI, Nombre, Apellido, NumeroTelefono, CorreoInstitucional, CorreoPersonal, Contrasena, FechaNacimiento, FechaContratacion, Carrera, Direccion, Foto, CentroRegional, Rol, SubRol, Estado } = req.body;
    const { id } = req.params;
    if (NumeroTelefono == null || CorreoPersonal == null || Direccion == null || DNI == null || Carrera == null, Nombre == null || Apellido == null) {
        return res.status(400).json({ message: "Not Found" })
    }
    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input("NumEmpleado", sql.Int, NumEmpleado)
            .input("DNI", sql.VarChar, DNI)
            .input("Nombre", sql.VarChar, Nombre)
            .input("Apellido", sql.VarChar, Apellido)
            .input("NumeroTelefono", sql.VarChar, NumeroTelefono)
            .input("CorreoInstitucional", sql.VarChar, CorreoInstitucional)
            .input("CorreoPersonal", sql.VarChar, CorreoPersonal)
            .input("Contrasena", sql.VarChar, Contrasena)
            .input("FechaNacimiento", sql.Date, FechaNacimiento)
            .input("FechaContratacion", sql.Date, FechaContratacion)
            .input("Carrera", sql.VarChar, Carrera)
            .input("Direccion", sql.VarChar, Direccion)
            .input("Foto", sql.VarChar, Foto)
            .input("CentroRegional", sql.VarChar, CentroRegional)
            .input("Rol", sql.VarChar, Rol)
            .input("SubRol", sql.VarChar, SubRol)
            .input("Estado", sql.VarChar, Estado)
            .query(queries.updateEmpleado);
        res.status(200).json({ message: 'Docente actualizado correctamente.' });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const clasesAsignadas = async (req, res) => {
    const {NumEmpleado, Sistema} = req.body;
    const pool = await getConnection();
    try {
        const PeriodoAcademico = await pool.request().input('Sistema', sql.VarChar, Sistema).query(`select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = '${Sistema}'`);
        const Periodo = PeriodoAcademico.recordset[0].PeriodoAcademico;
        
        const result = await pool.request()
            .input('NumEmpleado', sql.VarChar, NumEmpleado)
            .input('Periodo', sql.VarChar, Periodo)
            .query(queryDocente.getClasesAsignadas);
        res.status(200).json(result.recordset);
    } catch (error) {
        
    res.status(500).send(error.message);
}
}


export const mostrarPerfilSeccion = async (req, res) => {
    const {IdSeccion} = req.body;
    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('IdSeccion', sql.VarChar, IdSeccion)
            .query(queryDocente.getPerfilSeccion);
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        
    res.status(500).send(error.message);
}
}
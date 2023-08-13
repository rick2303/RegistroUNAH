import { Connection } from "tedious";
import { getConnection, sql, queries, queryDocente, queryJefe } from "../Database"
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
//Busca entre todos los docentes por el DNI
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
//Busca entre los docentes del departamento por el DNI
export const getDocenteByIdDep = async (req, res) => {
    const {DNI, Carrera, CentroRegional} = req.body
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input('DNI', sql.VarChar, DNI)
        .input('Carrera', sql.VarChar, Carrera)
        .input('CentroRegional', sql.VarChar, CentroRegional)
        .query(queries.get_Docente_By_Id_Dep);
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


export const mostrarEvaluacionesDocentes = async (req, res) => {
    const { IdDocente, Sistema } = req.body;
    const pool = await getConnection();
    try {
      /*const PeriodoAcademico = await pool.request().input('Sistema', sql.VarChar, Sistema).query(`select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = '${Sistema}'`); */
      const Periodo = '2PAC'; // PeriodoAcademico.recordset[0].PeriodoAcademico;
      const result = await pool.request()
        .input('IdDocente', sql.Int, IdDocente)
        .input('Periodo', sql.VarChar, Periodo)
        .query(queryJefe.getEvaluaciones);
  
      // Agrupar los filas por asignatura
      const clases = {};
      result.recordset.forEach((filas) => {
        const { Asignatura, Periodo, IdDocente, Nombre, Apellido, CorreoInstitucional } = filas;
        const claveAsignatura = `${Asignatura}_${Periodo}`;
        if (!clases[claveAsignatura]) {
          clases[claveAsignatura] = [];
        }
        clases[claveAsignatura].push({
          idseccion: filas.idseccion,
          Asignatura,
          Periodo,
          IdDocente,
          Nombre,
          Apellido,
          CorreoInstitucional,
          IdEstudiante: filas.IdEstudiante,
          Pregunta1: filas.Pregunta1,
          Pregunta2: filas.Pregunta2,
          Pregunta3: filas.Pregunta3,
          Pregunta4: filas.Pregunta4,
          Pregunta5: filas.Pregunta5,
          Observacion: filas.Observacion
        });
      });
  
      const clasesArray = Object.values(clases);
      res.status(200).json(clasesArray);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  

export const mostrarDocentePorDepartamento = async (req, res) => {
    const {Carrera, CentroRegional} = req.body;
    const pool = await getConnection();
    try {
        const result = await pool.request()
            .input('Carrera', sql.VarChar, Carrera)
            .input('CentroRegional', sql.VarChar, CentroRegional)
            .query(queryJefe.getDocenteDepartamento);
        res.status(200).json(result.recordset);
    } catch (error) {
        
    res.status(500).send(error.message);
}
}

export const subirNotaEstudiante = async (req, res) => {
    const {IdEstudiante, IdSeccion, Nota, EstadoClase} = req.body
    const pool = await getConnection();
    try{
        const result = await pool.request()
        .input("IdEstudiante",sql.VarChar, IdEstudiante)
        .input("IdSeccion", sql.Int, IdSeccion)
        .input("Nota",sql.Int, Nota)
        .input("EstadoClase",sql.VarChar, EstadoClase)
        .query(queryDocente.updateNotaEstudiante)
        res.status(200).json({message: 'Exitoso'})
    }catch(error){
        res.status(500).send(error.message)
    }
}

export const notasEstudiantes = async (req, res) => {
    const {Carrera, Sistema, IdDocente, IdSeccion} = req.body
    const pool = await getConnection();
    try {
        const result = await pool.request()
        .input("Carrera", sql.VarChar, Carrera)
        .input("Sistema", sql.VarChar, Sistema)
        .input("IdDocente", sql.Int, IdDocente)
        .input("IdSeccion", sql.Int, IdSeccion)
        .query(queryJefe.getNotas)
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//Trae todas las notas de todas las secciones por id de docente
export const notasSecciones = async (req, res) => {
    const {Sistema, IdDocente} = req.body
    const pool = await getConnection();
    try {
        const PeriodoAcademico = await pool.request().input('Sistema', sql.VarChar, Sistema).query(`select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = '${Sistema}'`);
        const Periodo = PeriodoAcademico.recordset[0].PeriodoAcademico;
        const result = await pool.request()
        .input("Periodo", sql.VarChar, Periodo)
        .input("IdDocente", sql.Int, IdDocente)
        .query(queryJefe.getSeccionEstudiantes)
        res.status(200).json(result.recordset)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const estudiantesSecciones = async (req, res) => {
    const { Sistema, IdDocente } = req.body;
    const pool = await getConnection();
    try {
      const PeriodoAcademico = await pool
        .request()
        .input('Sistema', sql.VarChar, Sistema)
        .query(
          `select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = '${Sistema}'`
        );
      const Periodo = PeriodoAcademico.recordset[0].PeriodoAcademico;
      const result = await pool
        .request()
        .input('Periodo', sql.VarChar, Periodo)
        .input('IdDocente', sql.Int, IdDocente)
        .query(queryJefe.getSeccionEstudiantes);
  
      // Agrupar registros por Seccion e IdClase
      const groupedResult = {};
      result.recordset.forEach((estudiante) => {
        const { Seccion, IdClase } = estudiante;
        const key = `${Seccion}-${IdClase}`;
        if (!groupedResult[key]) {
          groupedResult[key] = [];
        }
        groupedResult[key].push(estudiante);
      });
  
      // Convertir el objeto a un array de arrays
      const finalResult = Object.values(groupedResult);
  
      res.status(200).json(finalResult);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  export const ingresoNotas = async (req, res) => {
    const {Sistema} = req.body
    const pool = await getConnection();
    try {
        const result = await pool.request()
        .input("Sistema", sql.VarChar, Sistema)
        .query(queryDocente.getIngresoNotas)
        res.status(200).json(result.recordset[0])
    } catch (error) {
        res.status(500).send(error.message)
    } finally {
        pool.close();
    }
}
  
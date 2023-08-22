import { getConnection, querys, sql } from "../Database";
const bodyParser = require('body-parser');

export const obtenerNumeroMatriculados = async (req, res) => {
    const { carrera, centroRegional, periodo } = req.body;
    const pool = await getConnection();

    const query =  `
    SELECT COUNT(DISTINCT rec.IdEstudiante) as NumeroMatriculados
    FROM [dbo].[registro_estudiante_clases] rec
    INNER JOIN estudiantes e 
    ON rec.IdEstudiante = e.NumCuenta 
    INNER JOIN secciones s 
    ON rec.IdSeccion = s.IdSeccion 
    WHERE e.Carrera = '${carrera}'
        AND e.CentroRegional = '${centroRegional}'
        AND rec.EstadoClase IS NULL
        AND s.Periodo='${periodo}'
    `;
    const result = await pool.request()
        .input("carrera", sql.VarChar, carrera)
        .input("periodo", sql.VarChar, periodo)
        .input("centroRegional", sql.VarChar, centroRegional)
        .query(query);

    res.json(result.recordset[0]);
};

export const obtenerNumeroEspera = async (req, res) => {
    const { carrera, centroRegional, periodo } = req.body;
    const pool = await getConnection();

    const query =  `
    SELECT COUNT(DISTINCT rec.IdEstudiante) as NumeroESPERA
    FROM [dbo].[registro_estudiante_clases] rec
    INNER JOIN estudiantes e 
    ON rec.IdEstudiante = e.NumCuenta 
    INNER JOIN secciones s 
    ON rec.IdSeccion = s.IdSeccion 
    WHERE e.Carrera = '${carrera}'
        AND e.CentroRegional = '${centroRegional}'
        AND rec.EstadoMatricula='EN ESPERA'
        AND s.Periodo='${periodo}'
    `;
    const result = await pool.request()
        .input("carrera", sql.VarChar, carrera)
        .input("periodo", sql.VarChar, periodo)
        .input("centroRegional", sql.VarChar, centroRegional)
        .query(query);

    res.json(result.recordset[0]);
};

export const obtenerNumeroSecciones = async (req, res) => {
    const { carrera, centroRegional, periodo } = req.body;
    const pool = await getConnection();

    const query =  `
    SELECT COUNT(*) as NumeroSecciones 
    FROM [dbo].[secciones] as s
    INNER JOIN clases as c
    on c.IdClase = s.IdClase
    where Departamento ='${carrera}'
    AND s.CentroRegional = '${centroRegional}' 
    AND s.Periodo='${periodo}'
    `;
    const result = await pool.request()
        .input("carrera", sql.VarChar, carrera)
        .input("periodo", sql.VarChar, periodo)
        .input("centroRegional", sql.VarChar, centroRegional)
        .query(query);

    res.json(result.recordset[0]);
};

export const obtenerNumeroDocentes = async (req, res) => {
    const { carrera, centroRegional} = req.body;
    const pool = await getConnection();

    const query =  `
    select COUNT(*) AS NumeroDocentes
    from [dbo].[empleados]
    where Carrera='${carrera}'
    AND CentroRegional = '${centroRegional}' 
    AND Estado='ACTIVO'
    `;
    const result = await pool.request()
        .input("carrera", sql.VarChar, carrera)
        .input("centroRegional", sql.VarChar, centroRegional)
        .query(query);

    res.json(result.recordset[0]);
};

export const obtenerGrafica1 = async (req, res) => {
    const { carrera, centroRegional, periodo } = req.body;
    const pool = await getConnection();

    const query =  `
    SELECT c.Nombre AS 'Asignatura', 
        SUM(s.Cupos) AS CuposTotales,
        SUM(CASE WHEN rec.EstadoMatricula = 'EN ESPERA' THEN 1 ELSE 0 END) AS TotalListaEspera
    FROM [dbo].[secciones] s
    INNER JOIN [dbo].[empleados] e ON e.NumEmpleado = s.IdDocente
    INNER JOIN [dbo].[clases] c ON s.IdClase = c.IdClase
    LEFT JOIN [dbo].[registro_estudiante_clases] rec ON rec.IdSeccion = s.IdSeccion
    WHERE c.Departamento = '${carrera}' AND s.CentroRegional = '${centroRegional}' AND s.Periodo = '${periodo}'
    GROUP BY c.Nombre
    ORDER BY TotalListaEspera DESC
    `;
    const result = await pool.request()
        .input("carrera", sql.VarChar, carrera)
        .input("periodo", sql.VarChar, periodo)
        .input("centroRegional", sql.VarChar, centroRegional)
        .query(query);

    res.json(result.recordset);
};
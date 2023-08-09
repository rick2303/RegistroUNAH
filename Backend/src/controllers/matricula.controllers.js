import { getConnection, querys, sql } from "../Database";
const bodyParser = require('body-parser');

export const seccionesMatricula = async (req, res) => {
    const { carrera } = req.body;
    const pool = await getConnection();

    const query = "select * from carrera c where c.deptosprestados like @CarreraParam OR c.deptosprestados = 'TODOS'";
    const result = await pool.request()
        .input("CarreraParam", sql.VarChar, `%${carrera}%`)
        .query(query);

    res.json(result.recordset);
};


export const obtenerCupos = async (req, res) => {
    const { claseId } = req.body;
    const pool = await getConnection();

    const query = "select Cupos from secciones where IdSeccion=@claseId";
    const result = await pool.request()
        .input("claseId", sql.Int, claseId)
        .query(query);

    res.json(result.recordset);
};


// Función para verificar si hay conflictos de horarios
export async function verificarConflictosHorarios(IdEstudiante, Dias, HI, HF, Periodo) {
    try {
        const pool = await getConnection();

        const query = `
            SELECT COUNT(*) AS Total
        FROM [dbo].[registro_estudiante_clases] rec
        INNER JOIN [dbo].[secciones] s ON rec.IdSeccion = s.IdSeccion
        WHERE rec.IdEstudiante = @IdEstudiante
        AND s.Periodo = @Periodo
        AND (
            (@HI BETWEEN s.HI AND s.HF OR @HF BETWEEN s.HI AND s.HF OR s.HI BETWEEN @HI AND @HF OR s.HF BETWEEN @HI AND @HF)
            AND (
                s.Dias LIKE '%Lu%' AND CHARINDEX('Lu', @Dias) > 0
                OR s.Dias LIKE '%Ma%' AND CHARINDEX('Ma', @Dias) > 0
                OR s.Dias LIKE '%Mi%' AND CHARINDEX('Mi', @Dias) > 0
                OR s.Dias LIKE '%Ju%' AND CHARINDEX('Ju', @Dias) > 0
                OR s.Dias LIKE '%Vi%' AND CHARINDEX('Vi', @Dias) > 0
                OR s.Dias LIKE '%Sa%' AND CHARINDEX('Sa', @Dias) > 0
                -- Añade aquí otras combinaciones de días si es necesario (por ejemplo, Jueves, Viernes, etc.)
            )
            AND EXISTS (
                SELECT 1
                FROM [dbo].[registro_estudiante_clases] rec2
                INNER JOIN [dbo].[secciones] s2 ON rec2.IdSeccion = s2.IdSeccion
                WHERE rec2.IdEstudiante = @IdEstudiante
                AND s2.Periodo = @Periodo
                AND (
                    (@HI BETWEEN s2.HI AND s2.HF OR @HF BETWEEN s2.HI AND s2.HF OR s2.HI BETWEEN @HI AND @HF OR s2.HF BETWEEN @HI AND @HF)
                    AND (
                        s2.Dias LIKE '%Lu%' AND CHARINDEX('Lu', @Dias) > 0
                        OR s2.Dias LIKE '%Ma%' AND CHARINDEX('Ma', @Dias) > 0
                        OR s2.Dias LIKE '%Mi%' AND CHARINDEX('Mi', @Dias) > 0
                        OR s2.Dias LIKE '%Ju%' AND CHARINDEX('Ju', @Dias) > 0
                        OR s2.Dias LIKE '%Vi%' AND CHARINDEX('Vi', @Dias) > 0
                        OR s2.Dias LIKE '%Sa%' AND CHARINDEX('Sa', @Dias) > 0
                        -- Añade aquí otras combinaciones de días si es necesario (por ejemplo, Jueves, Viernes, etc.)
                    )
                )
                AND rec2.IdEstudiante = rec.IdEstudiante
                AND rec2.IdSeccion != rec.IdSeccion
            )
        );
        `;

        const result = await pool.request()
        .input('IdEstudiante', sql.VarChar, IdEstudiante)
        .input('Dias', sql.VarChar, Dias)
        .input('HI', sql.VarChar, HI)
        .input('HF', sql.VarChar, HF)
        .input('Periodo', sql.VarChar, Periodo)
        .query(query);

        return result.recordset[0].Total;  // Devuelve el resultado de la consulta (0 si no hay conflictos, otro valor si hay conflictos)
    } catch (error) {
        throw error;
    }
}


// Función para verificar si hay conflictos de horarios
export async function verificarSiYaTieneLaClaseMatriculada(IdEstudiante, IdClase) {
    try {
        const pool = await getConnection();

        const query = `
        SELECT 
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM [dbo].[registro_estudiante_clases] rec
                INNER JOIN [dbo].[secciones] s ON rec.IdSeccion = s.IdSeccion
                WHERE rec.IdEstudiante = @IdEstudiante
                AND s.IdClase = @IdClase
            ) THEN 1
            ELSE 0
        END AS Total;    
        `;

        const result = await pool.request()
        .input('IdEstudiante', sql.VarChar, IdEstudiante)
        .input('IdClase', sql.VarChar, IdClase)
        .query(query);

        return result.recordset[0].Total;  // Devuelve el resultado de la consulta (0 si no hay conflictos, otro valor si hay conflictos)
    } catch (error) {
        throw error;
    }
}


export const asignturaClase = async (req, res) => {
    const { NumCuenta, Departamento, carrera } = req.body;
    console.log(req.body);
    const pool = await getConnection();
    const query = `
    SELECT c.*
    FROM clases c
    WHERE c.Departamento = @Departamento
    AND c.DeptosPrestados LIKE '%' + @CarreraParam + '%'
    AND c.IdClase NOT IN (
        SELECT DISTINCT c.IdClase
        FROM clases c
        JOIN clases requisitos ON c.IdClase IN (
            SELECT IdClase
            FROM registro_estudiante_clases rec_req
            JOIN secciones s_req ON rec_req.IdSeccion = s_req.IdSeccion
            WHERE rec_req.IdEstudiante = @NumCuenta
            AND s_req.IdClase = requisitos.IdClase
            AND rec_req.EstadoClase = 'APR'
        )
    )
    AND NOT EXISTS (
        SELECT 1
        FROM clases requisitos
        WHERE c.Requisitos LIKE '%' + requisitos.IdClase + '%' 
        AND NOT EXISTS (
            SELECT 1
            FROM registro_estudiante_clases rec_req
            JOIN secciones s_req ON rec_req.IdSeccion = s_req.IdSeccion
            WHERE rec_req.IdEstudiante = @NumCuenta
            AND s_req.IdClase = requisitos.IdClase
            AND rec_req.EstadoClase = 'APR' 
        )
    );
`;

const result = await pool.request()
    .input("NumCuenta", sql.VarChar, NumCuenta)
    .input("Departamento", sql.VarChar, Departamento)
    .input("CarreraParam", sql.VarChar, carrera) // No es necesario usar el comodín % aquí
    .query(query);

res.json(result.recordset);
};


export const mostrarSeccionesMatricula = async (req, res) => {
    const { asignatura , Periodo} = req.body;
    const pool = await getConnection();

    const query = `
    SELECT *
    from [dbo].[secciones] s
    Inner JOIN empleados e
    on e.NumEmpleado = s.IdDocente
    inner JOIN clases c
    on c.IdClase = s.IdClase
    where c.Nombre=@asignatura AND Periodo=@Periodo`;

    const result = await pool.request()
        .input("asignatura", sql.VarChar, asignatura)
        .input("Periodo", sql.VarChar, Periodo)
        .query(query);

    res.json(result.recordset);
};

export const matricularClase = async (req, res) => {
    const { NumCuenta, IdSeccion, fecha, estado } = req.body;
    try {
        const pool = await getConnection();

        const query = `
        INSERT INTO registro_estudiante_clases(IdEstudiante, IdSeccion, Nota, Fecha, EstadoClase, EstadoMatricula) 
        VALUES (@NumCuenta, @IdSeccion, null, @fecha, null, @estado)
        `;

        const result = await pool.request()
            .input("NumCuenta", sql.VarChar, NumCuenta)
            .input("IdSeccion", sql.Int, IdSeccion)
            .input("fecha", sql.Date, fecha)
            .input("estado", sql.VarChar, estado)
            .query(query);

        res.json({ message: "Operación completada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};


export const obtenerUVS = async (req, res) => {
    const { NumCuenta } = req.body;

        const pool = await getConnection();

        const query = `
            SELECT UVDisponibles FROM estudiantes where NumCuenta=@NumCuenta
        `;

        const result = await pool.request()
            .input("NumCuenta", sql.VarChar, NumCuenta)
            .query(query);

            res.json(result.recordset);

};

export const updateUVS = async (req, res) => {
    
    const { NumCuenta, UVactualizadas } = req.body;
    try {
        const pool = await getConnection();

        const query = `
        UPDATE estudiantes set UVDisponibles=@UVactualizadas where NumCuenta=@NumCuenta
        `;

        const result = await pool.request()
            .input("NumCuenta", sql.VarChar, NumCuenta)
            .input("UVactualizadas", sql.Int, UVactualizadas)
            .query(query);

            res.json({ message: "Operación completada exitosamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al procesar la solicitud" });
        } 
};


export async function obtenerFechasMatricula(req, res) {
    const { PeriodoAcademico, Sistema } = req.body;
    try {
        const pool = await getConnection();

        const query = `
        SELECT
        pm.*,
        p.PeriodoAcademico,
        p.Sistema,
        DATEADD(DAY, n.Number - 1, p.FechaInicio) AS IntermediateDate,
        DAY(DATEADD(DAY, n.Number - 1, p.FechaInicio)) AS IntermediateDay,
        MONTH(DATEADD(DAY, n.Number - 1, p.FechaInicio)) AS IntermediateMonth,
        YEAR(DATEADD(DAY, n.Number - 1, p.FechaInicio)) AS IntermediateYear
    FROM
        [dbo].[planificacion_matricula] pm
    JOIN
        Numbers n ON DATEADD(DAY, n.Number - 1, pm.FechaInicio) BETWEEN pm.FechaInicio AND pm.FechaFinal
    JOIN
        (
            SELECT DISTINCT PeriodoAcademico, Sistema, FechaInicio
            FROM [dbo].[planificacion_matricula]
            WHERE Sistema = @Sistema AND PeriodoAcademico = @PeriodoAcademico
        ) p ON pm.PeriodoAcademico = p.PeriodoAcademico AND pm.Sistema = p.Sistema
    WHERE
        DATEADD(DAY, n.Number - 1, pm.FechaInicio) <= pm.FechaFinal; 
        `;

        const result = await pool.request()
        .input('PeriodoAcademico', sql.VarChar, PeriodoAcademico)
        .input('Sistema', sql.VarChar, Sistema)
        .query(query);

        res.json(result.recordset);  
    } catch (error) {
        throw error;
    }
}

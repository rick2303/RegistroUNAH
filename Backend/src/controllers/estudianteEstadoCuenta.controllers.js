import { getConnection, queryEstudiante, sql, querysADMIN} from "../Database"


export const obtenerEstadoCuenta = async (req, res) => {
    try {
        const pool = await getConnection();
        const {numCuenta} = req.body;
        const result = await pool.request()
        .input('NumCuenta', sql.VarChar, numCuenta)
        .query(queryEstudiante.getState);
        res.json(result.recordset);
        } catch (error) {
        res.status(500);
        res.send(error.message);
        }  

}

export const crearSolicitudReposicion = async (req, res) => {
    const { NumCuenta, Justificacion, Sistema } = req.body;
    const pool = await getConnection();
    try {
        const PeriodoAcademico = await pool.request().input('Sistema', sql.VarChar, Sistema).query(`select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = '${Sistema}'`);
        const Periodo = PeriodoAcademico.recordset[0].PeriodoAcademico;
        const result = await pool.request()
            .input('NumCuenta', sql.VarChar, NumCuenta)
            .input('Justificacion', sql.VarChar, Justificacion)
            .input('Periodo', sql.VarChar, Periodo)
            .query(queryEstudiante.postSolicitudReposicion);

        res.status(200).json({ message: 'Solicitud creada exitosamente.' });
    } catch (error) {
     res.status(500).send(error.message);
}
}

export const existenciaSolicitudReposicion = async (req, res) => {
    const {NumCuenta, Sistema} = req.body;

    const TipoPago = 'REPOSICIÓN';
    const pool = await getConnection();
    try {
        const PeriodoAcademico = await pool.request().input('Sistema', sql.VarChar, Sistema).query(`select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = '${Sistema}'`);
        const Periodo = PeriodoAcademico.recordset[0].PeriodoAcademico;
        const result = await pool.request()
            .input('NumCuenta', sql.VarChar, NumCuenta)
            .input('Periodo', sql.VarChar, Periodo)
            .query(queryEstudiante.getExistenciaSolicitudReposicion);
        res.json(result.recordset[0])
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/*
export const existenciaSolicitudMatricula = async (req, res) => {
    const {NumCuenta, Sistema} = req.body;

    const TipoPago = 'MATRICULA';
    const pool = await getConnection();
    try {
        const PeriodoAcademico = await pool.request().input('Sistema', sql.VarChar, Sistema).query(`select PeriodoAcademico from planificacion_academica where GETDATE() BETWEEN FechaInicio and FechaFinal and Sistema = '${Sistema}'`);
        const Periodo = PeriodoAcademico.recordset[0].PeriodoAcademico;
        const result = await pool.request()
            .input('NumCuenta', sql.VarChar, NumCuenta)
            .input('Periodo', sql.VarChar, Periodo)
            .input('TipoPago', sql.VarChar, TipoPago)
            .query(queryEstudiante.getExistenciaSolicitud);
        res.json(result.recordset[0])
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message)
    }
} */
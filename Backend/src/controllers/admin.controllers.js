import { getConnection, querys, sql} from "../Database"
const bodyParser = require('body-parser');

export const crearNuevaPlanificacion = async (req, res) => {
    const {FechaInicio, FechaFinal, PeriodoAcademico } = req.body;
    // validating
    if (FechaInicio == null || FechaFinal == null || PeriodoAcademico == null ) {
        return res.status(400).json({ msg: "Peticion denegada. Por favor, llenar todos los espacios" });
    }
    
    try {
        const pool = await getConnection();

        await pool
        .request()
        .input("FechaInicio", sql.Date, FechaInicio)
        .input("FechaFinal", sql.Date, FechaFinal)
        .input("PeriodoAcademico", sql.VarChar, PeriodoAcademico)
        .query(querys.insertNuevaPlanificacion);

        res.json({FechaInicio, FechaFinal, PeriodoAcademico});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const renderizarPlanificacion = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getPlanificacionAcademica);
        res.json(result.recordset);
        } catch (error) {
        res.status(500);
        res.send(error.message);
        }  

}

export const crearNuevaMatricula = async (req, res) => {
    const {FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico } = req.body;

    // validating
    if (FechaInicio == null || FechaFinal == null || HoraInicio == null || HoraFinal == null || PeriodoAcademico == null ) {
        return res.status(400).json({ msg: "Peticion denegada. Por favor, llenar todos los espacios" });
    }
    
    try {
        const pool = await getConnection();

        await pool
        .request()
        .input("FechaInicio", sql.Date, FechaInicio)
        .input("FechaFinal", sql.Date, FechaFinal)
        .input("HoraInicio", sql.VarChar, HoraInicio)
        .input("HoraFinal", sql.VarChar, HoraFinal)
        .input("PeriodoAcademico", sql.VarChar, PeriodoAcademico)
        .query(querys.insertNuevaMatricula);

        res.json({FechaInicio, FechaFinal,HoraInicio, HoraFinal, PeriodoAcademico});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}

export const renderizarMatricula = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getMatricula);
        res.json(result.recordset);
        } catch (error) {
        res.status(500);
        res.send(error.message);
        }  

}

export const crearNuevoProcesoCancelacion = async (req, res) => {
    const {FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico } = req.body;

    // validating
    if (FechaInicio == null || FechaFinal == null || HoraInicio == null || HoraFinal == null || PeriodoAcademico == null ) {
        return res.status(400).json({ msg: "Peticion denegada. Por favor, llenar todos los espacios" });
    }
    
    try {
        const pool = await getConnection();

        await pool
        .request()
        .input("FechaInicio", sql.Date, FechaInicio)
        .input("FechaFinal", sql.Date, FechaFinal)
        .input("HoraInicio", sql.VarChar, HoraInicio)
        .input("HoraFinal", sql.VarChar, HoraFinal)
        .input("PeriodoAcademico", sql.VarChar, PeriodoAcademico)
        .query(querys.insertProcesoCancelacion);

        res.json({FechaInicio, FechaFinal,HoraInicio, HoraFinal, PeriodoAcademico});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const renderizarCancelaciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getCancelacion);
        res.json(result.recordset);
        } catch (error) {
        res.status(500);
        res.send(error.message);
        }  

}

export const enviarIPAC = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIPACPlanificacion);
        res.json(result.recordset);
        } catch (error) {
        res.status(500);
        res.send(error.message);
        }  

}

export const enviarIIPAC = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIIPACPlanificacion);
        res.json(result.recordset);
        } catch (error) {
        res.status(500);
        res.send(error.message);
        }  
}

export const enviarIIIPAC = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIIIPACPlanificacion);
        res.json(result.recordset);
        } catch (error) {
        res.status(500);
        res.send(error.message);
        }  
}

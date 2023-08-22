import { getConnection, querys, querysADMIN, sql } from "../Database"
const bodyParser = require('body-parser');

export const crearNuevaPlanificacion = async (req, res) => {
    const { FechaInicio, FechaFinal, PeriodoAcademico, Sistema } = req.body;
    // validating
    if (FechaInicio == null || FechaFinal == null || PeriodoAcademico == null) {
        return res.status(400).json({ msg: "Peticion denegada. Por favor, llenar todos los espacios" });
    }

    try {
        const pool = await getConnection();

        await pool
            .request()
            .input("FechaInicio", sql.Date, FechaInicio)
            .input("FechaFinal", sql.Date, FechaFinal)
            .input("PeriodoAcademico", sql.VarChar, PeriodoAcademico)
            .input("Sistema", sql.VarChar, Sistema)
            .query(querys.insertNuevaPlanificacion);

        res.json({ FechaInicio, FechaFinal, PeriodoAcademico });
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

export const renderizarPlanificacionSemestral = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getPlanificacionAcademicaSemestral);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}

export const crearNuevaMatricula = async (req, res) => {
    const { FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema } = req.body;

    // validating
    if (FechaInicio == null || FechaFinal == null || HoraInicio == null || HoraFinal == null || PeriodoAcademico == null) {
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
            .input("Sistema", sql.VarChar, Sistema)
            .query(querys.insertNuevaMatricula);

        res.json({ FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}
export const crearFechaNotas = async (req, res) => {
    const { FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema } = req.body;

    // validating
    if (FechaInicio == null || FechaFinal == null || HoraInicio == null || HoraFinal == null || PeriodoAcademico == null) {
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
            .input("Sistema", sql.VarChar, Sistema)
            .query(querys.insertFechaNotas);

        res.json({ FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico });
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

export const renderizarMatriculaSemestral = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getMatriculaSemestral);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}
export const crearNuevoProcesoCancelacion = async (req, res) => {
    const { FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico, Sistema } = req.body;

    // validating
    if (FechaInicio == null || FechaFinal == null || HoraInicio == null || HoraFinal == null || PeriodoAcademico == null) {
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
            .input("Sistema", sql.VarChar, Sistema)
            .query(querys.insertProcesoCancelacion);

        res.json({ FechaInicio, FechaFinal, HoraInicio, HoraFinal, PeriodoAcademico });
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

export const renderizarCancelacionesSemestral = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getCancelacionSemestral);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}
export const renderizarFechaNotas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getFechaNotas);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}

export const renderizarFechaNotasSemestral = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getFechaNotasSemestral);
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

export const enviarIPACSemestral = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIPACPlanificacionSemestral);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}

export const enviarIIPACSemestral = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIIPACPlanificacionSemestral);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
export const enviarMatriculaIPAC = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIPACMatricula);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}

export const enviarMatriculaIIPAC = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIIPACMatricula);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const enviarMatriculaIIIPAC = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getIIIPACMatricula);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const EliminarPlanificacion = async (req, res) => {
    const { idPlanificacion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("idPlanificacion", sql.Int, idPlanificacion)
        .query(querysADMIN.DeletePlanificacion)
    res.json(result.recordset);
}

export const EliminarMatricula = async (req, res) => {
    const { idPlanificacion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("idPlanificacion", sql.Int, idPlanificacion)
        .query(querysADMIN.DeleteMatricula)
    res.json(result.recordset);
}

export const EliminarFechaNotas = async (req, res) => {
    const { idPlanificacion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("idPlanificacion", sql.Int, idPlanificacion)
        .query(querysADMIN.DeleteFechaNotas)
    res.json(result.recordset);
}

export const EliminarCancelacionesExcepcionales = async (req, res) => {
    const { idPlanificacion } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("idPlanificacion", sql.Int, idPlanificacion)
        .query(querysADMIN.DeleteCancelacionesExcepcionales)
    res.json(result.recordset);
}

export const pagarTodo = async (req, res) => {
    const pool = await getConnection();
    try {
        const result = await pool.request().query(querysADMIN.pagoSimulado);
        res.status(200).json({ message: "Pagos realizados" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }finally{
        pool.close();
    }
}

export const validacionJefe = async (req, res) => {
    const pool = await getConnection();
    const { Carrera, CentroRegional } = req.body;

    try {
        const result = await pool.request()
        .input('Carrera', sql.VarChar, Carrera)
        .input('CentroRegional', sql.VarChar, CentroRegional)
        .query(querysADMIN.getJefeExistente);
        if(result.recordset[0].existe_empleado == 1){
            res.status(200).send(true)
        }else{
            res.status(200).send(false)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const validacionCoordi = async (req, res) => {
    const pool = await getConnection();
    const { Carrera, CentroRegional } = req.body;
    try {
        const result = await pool.request()
        .input('Carrera', sql.VarChar, Carrera)
        .input('CentroRegional', sql.VarChar, CentroRegional)
        .query(querysADMIN.getCoordiExistente);
        if(result.recordset[0].existencia == 1){
            res.status(200).send(true)
        }else{
            res.status(200).send(false)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

import { getConnection,sql, queryStudentHistory} from "../Database"

export const historialAcademico = async(req, res) =>{
    const {NumCuenta} = req.body
    const pool = await getConnection();
    const result = await pool.request().
    input('NumCuenta', sql.VarChar, NumCuenta)
    .query(queryStudentHistory.getStudentHistory)
    res.json(result.recordset);
}

/*
export const historialAcademicoPrueba = async(req, res) =>{
    const pool = await getConnection();
    const result = await pool.request()
    .query(queryStudentHistory.getHistorial)
    //console.log('Resultados', result)
    res.json(result.recordset);
}
*/
import { getConnection, queryEstudiante, sql} from "../Database"


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

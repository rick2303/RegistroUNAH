import { getConnection, querys, sql } from "../Database";
const bodyParser = require('body-parser');

export const enviarClasesCursando = async (req, res) => {
    const { NumCuenta, Periodo, año } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("NumCuenta", sql.VarChar, NumCuenta)
        .input("Periodo", sql.VarChar, Periodo)
        .input("año", sql.Int, año)
        .query(querys.getClasesCursando);
    res.json(result.recordset);
};

export const enviarClasesListaEspera = async (req, res) => {
    const { NumCuenta, Periodo, año } = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("NumCuenta", sql.VarChar, NumCuenta)
        .input("Periodo", sql.VarChar, Periodo)
        .input("año", sql.Int, año)
        .query(querys.getClasesEnListaDeEspera);
    res.json(result.recordset);
};

export const enviarInfoEstuForma03= async (req, res) => {
    const { NumCuenta} = req.body;
    const pool = await getConnection();
    const result = await pool.request()
        .input("NumCuenta", sql.VarChar, NumCuenta)
        .query(querys.getPerfilEstudianteFormaAdmin);
    res.json(result.recordset);
};


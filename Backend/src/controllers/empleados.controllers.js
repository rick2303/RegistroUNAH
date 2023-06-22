import { getConnection, queries} from "../Database"

export const getDocentes = async (req,res)=> {
    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.get_Docentes);
        console.log(result);
        res.json(result.recordset);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }

}
import { getConnection, queries} from "../Database"

export const getUsuarios = async (req,res)=> {
    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.getUsers);
        console.log(result);
        res.json(result.recordset);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }

}
import { getConnection,sql, queries} from "../Database"

export const getEstudianteXperfil = async (req,res)=> {
    const {Id}= req.body
    try{
        const pool = await getConnection();
        const result = await pool.request()
        .input("Id", sql.VarChar,Id)
        .query(queries.getEstudiantes);
        console.log(result);
        res.json(result.recordset[0]);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}